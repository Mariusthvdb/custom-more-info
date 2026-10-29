import { getPromisableResult } from 'get-promisable-result';
import { HomeAssistant, Lovelace } from '@types';
import {
    STYLES_PREFIX,
    MAX_ATTEMPTS,
    RETRY_DELAY,
	SELECTOR,
	MENU_REFERENCES
} from '@constants';

const getElementName = (element: Element | ShadowRoot): string => {
	if (element instanceof ShadowRoot) {
		return element.host.localName;
	}
	return element.localName;
};

export const styleExists = (element: Element | ShadowRoot): HTMLStyleElement => {
	const name = getElementName(element);
	return element.querySelector<HTMLStyleElement>(`#${STYLES_PREFIX}_${name}`);
};

export const addStyle = (element: Element | ShadowRoot, css: string): void => {
	const name = getElementName(element);
	let style = styleExists(element);
	if (!style) {
		style = document.createElement('style');
		style.setAttribute('id', `${STYLES_PREFIX}_${name}`);
		element.appendChild(style);
	}
	style.innerHTML = css;
};

export const removeStyle = (element: Element | ShadowRoot): void => {
	const name = getElementName(element);
    if (styleExists(element)) {
        element.querySelector(`#${STYLES_PREFIX}_${name}`).remove();
    }
};

export const getHiddenStyle = (elementName: string): string => {
    return `${elementName} {
        display: none !important;
    }`;
};

export const getLovelaceConfig = async(
	lovelacePanel: Lovelace
): Promise<Lovelace['lovelace']['config']> => {
	return await getPromisableResult(
		() => lovelacePanel?.lovelace?.config,
		(lovelaceConfig: Lovelace['lovelace']['config']) => !!lovelaceConfig
	);
};

export const getTranslations = async(
	ha: HomeAssistant
): Promise<Record<string, string>> => {
	const referencePaths = Object.entries(MENU_REFERENCES);
	const translations = await getPromisableResult(
		() => referencePaths.map((entry): [string, string] => {
			const [key, translationPath] = entry;
			return [ha.hass.localize(translationPath), key];
		}),
		(translationEntries: [string, string][]): boolean => {
			return !translationEntries.find((entry) => !entry[0]);
		},
		{
			shouldReject: false,
			retries: MAX_ATTEMPTS,
			delay: RETRY_DELAY
		}
	);

	return Object.fromEntries(translations);
};

export const addDataSelectors = (
	menuItems: NodeListOf<HTMLElement>,
	translations: Record<string, string>
): void => {
	menuItems.forEach((item: HTMLElement): void => {
		if (
			item &&
			item.dataset &&
			!item.dataset.customSelector
		) {
			const button = item.shadowRoot.querySelector<HTMLElement>(SELECTOR.HA_BUTTON);
			item.dataset.customSelector = translations[button.title];
		}
	});
};