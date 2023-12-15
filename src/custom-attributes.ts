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
    ESCAPE_REG_EXP,
    ALL_FILTER
} from '@constants';
import { version } from '../package.json';

console.info(
    `%c  ${NAME}  \n%c  Version ${version} ${DESCRIPTION}`,
    'color: gold; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: steelblue'
);

class CustomAttributes {

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
                const config = lovelacePanel?.lovelace?.config?.custom_attributes;
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
            .$
            .query(
                [
                    SELECTOR.MORE_INFO_DEFAULT,
                    SELECTOR.MORE_INFO_VACUUM,
                    SELECTOR.MORE_INFO_LIGHT,
                    SELECTOR.MORE_INFO_SIREN
                ].join(',')
            )
            .$
            .query(SELECTOR.HA_ATTRIBUTES)
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

        const extraFilters = attributes.extraFilters || '';
        const separator = extraFilters.length
            ? ','
            : '';
        attributes.extraFilters = extraFilters + separator + filters.join(',');
        
    }

    protected getFilters(attributes: Attributes): string[] {

        const entityId = attributes.__stateObj.entity_id;
        const deviceClass = attributes.__stateObj.attributes.device_class;

        this._debug(`getting the filters for ${entityId}`);

        if (this._filters[entityId]) {
            this._debug('the filters for this entity have been found in memory, recovering filters...');
            this._debug(this._filters[entityId]);
            return this._filters[entityId];
        }

        const filters = new Set<string>();
        const config = this._config?.filter_attributes;
        const filterByEntityId = config?.by_entity_id;
        const filterByGlob = config?.by_glob;
        const filterByDomain = config?.by_domain;
        const filterByDeviceClass = config?.by_device_class;
        const domain = entityId.replace(/^(.+)\..+$/, '$1');

        if (filterByGlob) {
            Object.entries(filterByGlob).forEach((entry: [string, string[]]): void => {
                const [ glob, globFilters ] = entry;
                const regExp = this._getEntityIdRegExp(glob);
                if (regExp.test(entityId)) {
                    globFilters.forEach((filter: string): void => {
                        filters.add(filter);
                    });
                }
            });
        }

        if (filterByDeviceClass?.[deviceClass]) {
            filterByDeviceClass[deviceClass].forEach((filter: string): void => {
                filters.add(filter);
            });
        }

        if (filterByDomain?.[domain]) {
            filterByDomain[domain].forEach((filter: string): void => {
                filters.add(filter);
            });
        }

        if (filterByEntityId?.[entityId]) {
            filterByEntityId[entityId].forEach((filter: string): void => {
                filters.add(filter);
            });
        }

        if (filters.has(ALL_FILTER)) {
            Object.keys(attributes.__stateObj.attributes).forEach((filter: string) => {
                filters.add(filter);
            });
        }

        this._filters[entityId] = Array.from(
            filters.values()
        );

        this._debug('finished the filters retrival, printing the filters...');
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
    
    private _selector: HAQuerySelector;
    private _config: CustomAttributesConfig;
    private _filters: Record<string, string[]>;

}

// Ensure the DOM is fully loaded before running the script
Promise.resolve(customElements.whenDefined(SELECTOR.HUI_VIEW))
	.then(() => {
		window.customAttributes = new CustomAttributes();
	});