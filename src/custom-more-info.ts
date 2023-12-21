import {
    HAQuerySelector,
    HAQuerySelectorEvent,
    OnLovelacePanelLoadDetail,
    OnLovelaceMoreInfoDialogOpenDetail
} from 'home-assistant-query-selector';
import {
    Lovelace,
    CustomMoreInfoConfig,
    Attributes,
    Filters
} from '@types';
import {
    NAME,
    DESCRIPTION,
    SELECTOR,
    ESCAPE_REG_EXP,
    ALL_FILTER,
    IGNORED_ATTRIBUTES
} from '@constants';
import { version } from '../package.json';

console.info(
    `%c  ${NAME}  \n%c  Version ${version} ${DESCRIPTION}`,
    'color: gold; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: steelblue'
);

class CustomMoreInfo {

    constructor() {
        this._selector = new HAQuerySelector();
        this._selector.addEventListener(HAQuerySelectorEvent.ON_LOVELACE_PANEL_LOAD, (event) => {
            this._debug('lovelace panel has been rendered so loading the configuration');
            this.storeConfig(event.detail);
        });
        this._selector.addEventListener(HAQuerySelectorEvent.ON_LOVELACE_MORE_INFO_DIALOG_OPEN, (event) => {
            this._debug('a more info dialog has been opened so querying it for attributes');
            this.queryAttributes(event.detail);
		});
        this._selector.listen();
    }

    protected storeConfig(detail: OnLovelacePanelLoadDetail): void {
        detail.HA_PANEL_LOVELACE.element
            .then((lovelacePanel: Lovelace) => {
                const config = lovelacePanel?.lovelace?.config?.custom_more_info;
                if (config) {
                    this._config = config;
                    this._debug('the config has been loaded, printing the config...');
                } else if (
                    !this._config ||
                    !Object.keys(this._config).length
                ) {
                    this._debug('no config has been found so initiating an empty config...');
                    this._config = {};
                } else {
                    this._debug('this dashboard doesn‘t contain a config but there is a previous one in memory...');
                }
                this._filters = {};
                this._debug(this._config);
            });
    }

    protected queryAttributes(detail: OnLovelaceMoreInfoDialogOpenDetail): void {
        detail.HA_MORE_INFO_DIALOG_INFO
            .selector
            .$
            .query(SELECTOR.MORE_INFO_CONTENT)
            .deepQuery(SELECTOR.HA_ATTRIBUTES)
            .element
            .then((attributes: Attributes) => {
                this._debug('finished the task of querying attributes, the result is');
                if (attributes) {
                    this._debug('attributes have been found');
                    this._debug(attributes);
                    this.applyFilters(attributes);
                } else {
                    this._debug('attributes have not been found');
                }
            });
    }

    protected applyFilters(attributes: Attributes): void {

        const filters = this.getFilters(attributes);
        const finalFilters = filters.filter_attributes.filter((filter: string) => !filters.unfilter_attributes.includes(filter));

        const extraFilters = attributes.extraFilters || '';
        const separator = extraFilters.length
            ? ','
            : '';
        attributes.extraFilters = extraFilters + separator + finalFilters.join(',');

        if (filters.unfilter_attributes.length) {

            filters.unfilter_attributes.forEach((filter: string): void => {

                if (
                    IGNORED_ATTRIBUTES.includes(filter) &&
                    filter in attributes.__stateObj.attributes
                ) {
                    attributes.__stateObj.attributes[`${filter} `] = attributes.__stateObj.attributes[filter];
                }

            });

        }
        
    }

    protected getFilters(attributes: Attributes): Filters {

        const entityId = attributes.__stateObj.entity_id;
        const deviceClass = attributes.__stateObj.attributes.device_class;

        this._debug(`getting the filters for ${entityId}`);

        if (this._filters[entityId]) {
            this._debug('the filters for this entity have been found in memory, recovering filters...');
            this._debug(this._filters[entityId]);
            return this._filters[entityId];
        }

        const filters = new Set<string>();
        const unFilters = new Set<string>();

        const filterAttributes = this._config?.filter_attributes;
        const filterByGlob = filterAttributes?.by_glob;
        const filterByDeviceClass = filterAttributes?.by_device_class;
        const filterByDomain = filterAttributes?.by_domain;
        const filterByEntityId = filterAttributes?.by_entity_id;
       
        const unFilterAttributes = this._config?.unfilter_attributes;
        const unFilterByGlob = unFilterAttributes?.by_glob;
        const unFilterByDeviceClass = unFilterAttributes?.by_device_class;
        const unFilterByDomain = unFilterAttributes?.by_domain;
        const unFilterByEntityId = unFilterAttributes?.by_entity_id;        

        const domain = entityId.replace(/^(.+)\..+$/, '$1');

        // By Glob
        if (filterByGlob) {
            const globFilters = this._getFiltersByGlob(entityId, filterByGlob);
            globFilters.forEach((filter: string): void => {
                filters.add(filter);
            });
        }

        if (unFilterByGlob) {
            const globFilters = this._getFiltersByGlob(entityId, unFilterByGlob);
            globFilters.forEach((filter: string): void => {
                unFilters.add(filter);
            });
        }

        // By device class
        if (filterByDeviceClass?.[deviceClass]) {
            filterByDeviceClass[deviceClass].forEach((filter: string): void => {
                filters.add(filter);
            });
        }

        if (unFilterByDeviceClass?.[deviceClass]) {
            unFilterByDeviceClass[deviceClass].forEach((filter: string): void => {
                unFilters.add(filter);
            });
        }

        // By domain
        if (filterByDomain?.[domain]) {
            filterByDomain[domain].forEach((filter: string): void => {
                filters.add(filter);
            });
        }

        if (unFilterByDomain?.[domain]) {
            unFilterByDomain[domain].forEach((filter: string): void => {
                unFilters.add(filter);
            });
        }

        // By entity id
        if (filterByEntityId?.[entityId]) {
            filterByEntityId[entityId].forEach((filter: string): void => {
                filters.add(filter);
            });
        }

        if (unFilterByEntityId?.[entityId]) {
            unFilterByEntityId[entityId].forEach((filter: string): void => {
                unFilters.add(filter);
            });
        }

        // All
        if (this._config?.filter_all || filters.has(ALL_FILTER)) {
            Object.keys(attributes.__stateObj.attributes).forEach((filter: string) => {
                filters.add(filter);
            });
        }

        if (this._config?.unfilter_all || unFilters.has(ALL_FILTER)) {
            Object.keys(attributes.__stateObj.attributes).forEach((filter: string) => {
                unFilters.add(filter);
            });
        }

        this._filters[entityId] = {
            filter_attributes: Array.from(filters.values()),
            unfilter_attributes: Array.from(unFilters.values())
        };

        this._debug('finished the filters retrieval, printing the filters...');
        this._debug(this._filters[entityId]);

        return this._filters[entityId];
        
    }

    private _getEntityIdRegExp(glob: string): RegExp {
        const regExpString = glob
            .replace(ESCAPE_REG_EXP, '\\$&')
            .replace(/\*/g, '.*');
        return new RegExp(`^${regExpString}$`);
    }

    private _debug(message: unknown): void {
        if (this._config?.debug) {
            if (
                typeof message === 'object' &&
                !(message instanceof Node)
            ) {
                console.debug(
                    JSON.stringify(message, null, 4)
                );
            } else {
                console.debug(message);
            }            
        }
    }

    private _getFiltersByGlob(entityId: string, filter: Record<string, string[]>): string[] {
        const filters: string[] = [];
        Object.entries(filter).forEach((entry: [string, string[]]): void => {
            const [ glob, globFilters ] = entry;
            const regExp = this._getEntityIdRegExp(glob);
            if (regExp.test(entityId)) {
                filters.push(...globFilters);
            }
        });
        return filters;
    }
    
    private _selector: HAQuerySelector;
    private _config: CustomMoreInfoConfig;
    private _filters: Record<string, Filters>;

}

// Ensure the DOM is fully loaded before running the script
Promise.resolve(customElements.whenDefined(SELECTOR.HUI_VIEW))
	.then(() => {
		window.customMoreInfo = new CustomMoreInfo();
	});
