import { HAQuerySelector, HAQuerySelectorEvent } from 'home-assistant-query-selector';
import { Attributes } from '@types';
import {
    NAME,
    DESCRIPTION,
    SELECTOR
} from '@constants';

const VERSION = '20231211';

console.info(
    `%c  ${NAME}  \n%c  Version ${VERSION} ${DESCRIPTION}`,
    'color: gold; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: steelblue'
);

class CustomAttributes {

    constructor() {
        this.#filters = [
            'options',
            'icon_color'
        ];
        this.#selector = new HAQuerySelector();
        this.#selector.addEventListener(HAQuerySelectorEvent.ON_LOVELACE_MORE_INFO_DIALOG_OPEN, (event) => {
            event.detail.HA_MORE_INFO_DIALOG_INFO
                .selector
                .$
                .query(SELECTOR.MORE_INFO_CONTENT)
                .$
                .query(
                    [
                        SELECTOR.MORE_INFO_DEFAULT,
                        SELECTOR.MORE_INFO_VACUUM,
                        SELECTOR.MORE_INFO_LIGHT
                    ].join(',')
                )
                .$
                .query(SELECTOR.HA_ATTRIBUTES)
                .element
                .then((attributes: Attributes) => {
                    if (attributes) {
                        const extraFilters = attributes.extraFilters || '';
                        const separator = extraFilters.length
                            ? ','
                            : '';
                        attributes.extraFilters = extraFilters + separator + this.#filters.join(',');
                    }
                });
		});
        this.#selector.listen();
    }
    
    #filters: string[];
    #selector: HAQuerySelector;

}

// Ensure the DOM is fully loaded before running the script
Promise.resolve(customElements.whenDefined('hui-view'))
	.then(() => {
		window.customAttributes = new CustomAttributes();
	});