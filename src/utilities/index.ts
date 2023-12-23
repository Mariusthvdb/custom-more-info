import {
    STYLES_PREFIX,
    MAX_ATTEMPTS,
    RETRY_DELAY
} from '@constants';

const getElementName = (element: Element): string => {
	return element.localName;
};

export const styleExists = (element: Element): HTMLStyleElement => {
	const name = getElementName(element);
	return element.querySelector<HTMLStyleElement>(`#${STYLES_PREFIX}_${name}`);
};

export const addStyle = (element: Element, css: string): void => {
	const name = getElementName(element);
	let style = styleExists(element);
	if (!style) {
		style = document.createElement('style');
		style.setAttribute('id', `${STYLES_PREFIX}_${name}`);
		element.appendChild(style);
	}
	style.innerHTML = css;
};

export const removeStyle = (element: Element): void => {
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