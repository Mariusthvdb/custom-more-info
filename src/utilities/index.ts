import { HomeAssistant } from '@types';
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

export const getPromisableElement = <T>(
	getElement: () => T,
	check: (element: T) => boolean
): Promise<T> => {
	return new Promise<T>((resolve) => {
		let attempts = 0;
		const select = () => {
			const element: T = getElement();
			if (check(element)) {
				resolve(element);
			} else {
				attempts++;
				if (attempts < MAX_ATTEMPTS) {
					setTimeout(select, RETRY_DELAY);
				} else {
					resolve(element);
				}
			}
		};
		select();
	});
};

const getHAResources = (ha: HomeAssistant): Promise<Record<string, Record<string, string>>> => {
	let attempts = 0;
	const referencePaths = Object.values(MENU_REFERENCES);
	return new Promise((resolve, reject) => {
		const getResources = () => {
			const resources = ha?.hass?.resources;
			let success = false;
			if (resources) {
				const language = ha.hass.language;
				// check if all the resources are available
				const anyEmptyResource = referencePaths.find((path: string) => {
					if (resources[language][path]) {
						return false;
					}
					return true;
				});
				if (!anyEmptyResource) {
					success = true;
				}
			}
			if (success) {
				resolve(resources);
			} else {
				attempts++;
				if (attempts < MAX_ATTEMPTS) {
					setTimeout(getResources, RETRY_DELAY);
				} else {
					reject();
				}
			}
		};
		getResources();
	});
};

export const getTranslations = async(
	ha: HomeAssistant
): Promise<Record<string, string>> => {
	const resources = await getHAResources(ha);
	const language = ha.hass.language;
	const resourcesTranslated = resources[language];
	const entries = Object.entries(MENU_REFERENCES);
	const menuTranslationsEntries = entries.map((entry: [string, string]) => {
		const [reference, prop] = entry;
		return [resourcesTranslated[prop], reference];
	});
	return Object.fromEntries(menuTranslationsEntries);
};

export const addDataSelectors = (
	items: NodeListOf<HTMLElement>,
	translations: Record<string, string>
): void => {
	items.forEach((item: HTMLElement): void => {
		if (
			item &&
			item.dataset &&
			!item.dataset.customSelector
		) {
			const icon = item.shadowRoot.querySelector<HTMLElement>(SELECTOR.MENU_ITEM_ICON);
			item.dataset.customSelector = translations[icon.title];
		}
	});
};