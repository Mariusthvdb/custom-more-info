import {
    HAQuerySelector,
    HAQuerySelectorEvent,
    OnLovelacePanelLoadDetail,
    OnLovelaceMoreInfoDialogOpenDetail
} from 'home-assistant-query-selector';
import {
    Lovelace,
    CustomAttributesConfig,
    Attributes
} from '@types';
import {
    NAME,
    DESCRIPTION,
    SELECTOR,
    ESCAPE_REG_EXP
} from '@constants';

const VERSION = '20231211';

console.info(
    `%c  ${NAME}  \n%c  Version ${VERSION} ${DESCRIPTION}`,
    'color: gold; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: steelblue'
);

class CustomAttributes {

    constructor() {
        this.#selector = new HAQuerySelector();
        this.#selector.addEventListener(HAQuerySelectorEvent.ON_LOVELACE_PANEL_LOAD, (event) => {
            this.storeConfig(event.detail);
        });
        this.#selector.addEventListener(HAQuerySelectorEvent.ON_LOVELACE_MORE_INFO_DIALOG_OPEN, (event) => {
            this.queryAttributes(event.detail);
		});
        this.#selector.listen();
    }

    protected storeConfig(detail: OnLovelacePanelLoadDetail): void {
        detail.HA_PANEL_LOVELACE.element
            .then((lovelacePanel: Lovelace) => {
                this.#config = lovelacePanel?.lovelace?.config?.custom_attributes || {};
                this.#filters = {};
            });
    }

    protected queryAttributes(detail: OnLovelaceMoreInfoDialogOpenDetail): void {
        detail.HA_MORE_INFO_DIALOG_INFO
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
                    this.applyFilters(attributes);
                }
            });
    }

    protected applyFilters(attributes: Attributes): void {
        const entityId = attributes.__stateObj.entity_id;
        const deviceClass = attributes.__stateObj.attributes.device_class;
        const filters = this.getFilters(entityId, deviceClass);
        const extraFilters = attributes.extraFilters || '';
        const separator = extraFilters.length
            ? ','
            : '';
        attributes.extraFilters = extraFilters + separator + filters.join(',');
    }

    protected getFilters(entityId: string, deviceClass: string): string[] {

        if (this.#filters[entityId]) {
            return this.#filters[entityId];
        }

        const filters = new Set<string>();
        const config = this.#config?.filter_attributes;
        const filterByEntityId = config?.by_entity_id;
        const filterByGlob = config?.by_glob;
        const filterByDomain = config?.by_domain;
        const filterByDeviceClass = config?.by_device_class;

        if (filterByGlob) {
            Object.entries(filterByGlob).forEach((entry: [string, string[]]): void => {
                const [ glob, globFilters ] = entry;
                const regExp = this.getEntityIdRegExp(glob);
                if (regExp.test(entityId)) {
                    globFilters.forEach((filter: string): void => {
                        filters.add(filter);
                    });
                }
            });
        }

        if (filterByDeviceClass?.[deviceClass]) {
            filters.clear();
            filterByDeviceClass[deviceClass].forEach((filter: string): void => {
                filters.add(filter);
            });
        }

        if (filterByDomain) {
            Object.entries(filterByDomain).forEach((entry: [string, string[]]): void => {
                const [ domain, domainFilters ] = entry;
                if (entityId.startsWith(`${domain}.`)) {
                    filters.clear();
                    domainFilters.forEach((filter: string): void => {
                        filters.add(filter);
                    });
                }
            });
        }

        if (filterByEntityId?.[entityId]) {
            filters.clear();
            filterByEntityId[entityId].forEach((filter: string): void => {
                filters.add(filter);
            });
        }

        this.#filters[entityId] = Array.from(
            filters.values()
        );

        return this.#filters[entityId];
        
    }

    private getEntityIdRegExp(glob: string): RegExp {
        const regExpString = glob
            .replace(ESCAPE_REG_EXP, '\\$&')
            .replace(/\*/g, '.*');
        return new RegExp(`^${regExpString}$`);
    }
    
    #selector: HAQuerySelector;
    #config: CustomAttributesConfig;
    #filters: Record<string, string[]>;

}

// Ensure the DOM is fully loaded before running the script
Promise.resolve(customElements.whenDefined(SELECTOR.HUI_VIEW))
	.then(() => {
		window.customAttributes = new CustomAttributes();
	});