import {
    STYLES_PREFIX,
    MAX_ATTEMPTS,
    RETRY_DELAY
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
			if (element && check(element)) {
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