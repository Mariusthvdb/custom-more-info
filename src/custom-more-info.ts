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
    InternalFilters,
    InternalVisibility,
    MoreInfoDialog
} from '@types';
import {
    NAME,
    DESCRIPTION,
    SELECTOR,
    ESCAPE_REG_EXP,
    ALL_FILTER,
    IGNORED_ATTRIBUTES
} from '@constants';
import {
    addStyle,
    removeStyle,
    getHiddenStyle,
    getPromisableElement
} from '@utilities';
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
            this._debug('a more info dialog has been opened so applying customizations');
            this.applyCustomizations(event.detail);
		});
        this._selector.listen();
    }

    private _selector: HAQuerySelector;
    private _config: CustomMoreInfoConfig;
    private _filters: Record<string, InternalFilters>;
    private _visibility: Record<string, InternalVisibility>;

    private _insertAttributesGlobs(
        entityId: string,
        hide: Record<string, string[]> | undefined,
        show: Record<string, string[]> | undefined,
        hideSet: Set<string>,
        showSet: Set<string>
    ): void {
        this._addSetValues(
            hideSet,
            this._getFiltersByGlob(entityId, hide)
        );
        this._addSetValues(
            showSet,
            this._getFiltersByGlob(entityId, show)
        );
    }

    private _insertParameters(
        hide: string[] | undefined,
        show: string[] | undefined,
        hideSet: Set<string>,
        showSet: Set<string>
    ): void {
        this._addSetValues(
            hideSet,
            hide
        );
        this._addSetValues(
            showSet,
            show
        );
    }

    private _getEntityIdRegExp(glob: string): RegExp {
        const regExpString = glob
            .replace(ESCAPE_REG_EXP, '\\$&')
            .replace(/\*/g, '.*');
        return new RegExp(`^${regExpString}$`);
    }

    private _addSetValues(set: Set<string>, values: string[] = []): void {
        values.forEach((value: string): void => {
            set.add(value);
        });
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

    private _globMatch(entityId: string, glob: string): boolean {
        const regExp = this._getEntityIdRegExp(glob);
        return regExp.test(entityId);
    }

    private _anyGlobMatch(entityId: string, globs: string[] = []): boolean {
        const find = globs.find((glob: string) => this._globMatch(entityId, glob));
        return !!find;
    }

    private _getFiltersByGlob(entityId: string, filter: Record<string, string[]> = {}): string[] {
        const filters: string[] = [];
        Object.entries(filter).forEach((entry: [string, string[]]): void => {
            const [ glob, globFilters ] = entry;
            if (this._globMatch(entityId, glob)) {
                filters.push(...globFilters);
            }
        });
        return filters;
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
                this._visibility = {};
                this._debug(this._config);
            });
    }

    protected async applyCustomizations(detail: OnLovelaceMoreInfoDialogOpenDetail): Promise<void> {

        const {
            HA_MORE_INFO_DIALOG,
            HA_MORE_INFO_DIALOG_INFO,
            HA_DIALOG_CONTENT
        } = detail;

        const dialog = await HA_MORE_INFO_DIALOG.element as MoreInfoDialog;
        const entityId = await getPromisableElement(
            () => dialog.___entry?.entity_id,
            (entityId: string): boolean => !!entityId
        );
        const domain = entityId.replace(/^(.+)\..+$/, '$1');
        const deviceClass = dialog.___entry.original_device_class;

        HA_MORE_INFO_DIALOG_INFO
            .selector
            .$
            .query(SELECTOR.MORE_INFO_CONTENT)
            .deepQuery(SELECTOR.HA_ATTRIBUTES)
            .element
            .then((attributes: Attributes): void => {
                this._debug('finished the task of querying attributes, the result is');
                if (attributes) {
                    this._debug('attributes have been found');
                    this._debug(attributes);
                    this.applyAttributesFilters(
                        attributes,
                        entityId,
                        domain,
                        deviceClass
                    );
                } else {
                    this._debug('attributes have not been found');
                }
            });
            
        HA_MORE_INFO_DIALOG_INFO
            .selector
            .$
            .deepQuery(
                [
                    SELECTOR.MORE_INFO_HSTORY,
                    SELECTOR.MORE_INFO_LOGBOOK
                ].join(',')
            )
            .element
            .then((element: Element): void => {
                this._debug('finished the task of querying the history or logbook of the dialog, the result is');
                if (element) {
                    this._debug('history or logbook have been found');
                    this._debug(element);
                    this.applyVisibility(
                        element.parentElement,
                        entityId,
                        domain,
                        deviceClass
                    );
                } else {
                    this._debug('dialog content has not been found');
                }
            });
            
    }

    protected applyAttributesFilters(
        attributes: Attributes,
        entityId: string,
        domain: string,
        deviceClass: string | undefined
    ): void {

        const filters = this.getFilters(
            attributes.__stateObj.attributes,
            entityId,
            domain,
            deviceClass
        );
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

    protected applyVisibility(
        container: Element,
        entityId: string,
        domain: string,
        deviceClass: string | undefined
    ): void {

        const visibility = this.getVisibility(
            entityId,
            domain,
            deviceClass
        );

        const styles = [
            visibility.hide_history
                ? getHiddenStyle(SELECTOR.MORE_INFO_HSTORY)
                : '',
            visibility.hide_logbook
                ? getHiddenStyle(SELECTOR.MORE_INFO_LOGBOOK)
                : ''
        ];

        if (visibility.hide_history || visibility.hide_logbook) {
            addStyle(container, styles.join(''));
        } else {
            removeStyle(container);
        }

    }

    protected getFilters(
        attributes: Record<string, unknown>,
        entityId: string,
        domain: string,
        deviceClass: string | undefined
    ): InternalFilters {

        this._debug(`getting the filters for ${entityId}`);

        if (this._filters[entityId]) {
            this._debug('the filters for this entity have been found in memory, recovering filters...');
            this._debug(this._filters[entityId]);
            return this._filters[entityId];
        }

        const filters = new Set<string>();
        const unFilters = new Set<string>();

        // By Glob
        this._insertAttributesGlobs(
            entityId,
            this._config?.filter_attributes?.by_glob,
            this._config?.unfilter_attributes?.by_glob,
            filters,
            unFilters
        );

        // By device class
        this._insertParameters(
            this._config?.filter_attributes?.by_device_class?.[deviceClass],
            this._config?.unfilter_attributes?.by_device_class?.[deviceClass],
            filters,
            unFilters
        );

        // By domain
        this._insertParameters(
            this._config?.filter_attributes?.by_domain?.[domain],
            this._config?.unfilter_attributes?.by_domain?.[domain],
            filters,
            unFilters
        );

        // By entity id
        this._insertParameters(
            this._config?.filter_attributes?.by_entity_id?.[entityId],
            this._config?.unfilter_attributes?.by_entity_id?.[entityId],
            filters,
            unFilters
        );

        // All
        if (this._config?.filter_all || filters.has(ALL_FILTER)) {
            this._addSetValues(
                filters,
                Object.keys(attributes)
            );
        }

        if (this._config?.unfilter_all || unFilters.has(ALL_FILTER)) {
            this._addSetValues(
                unFilters,
                Object.keys(attributes)
            );
        }

        this._filters[entityId] = {
            filter_attributes: Array.from(filters.values()),
            unfilter_attributes: Array.from(unFilters.values()),
        };

        this._debug('finished the filters retrieval, printing the filters...');
        this._debug(this._filters[entityId]);

        return this._filters[entityId];
        
    }

    protected getVisibility(
        entityId: string,
        domain: string,
        deviceClass: string | undefined
    ): InternalVisibility {

        this._debug(`getting the visibility for ${entityId}`);

        if (this._visibility[entityId]) {
            this._debug('the visibility for this entity have been found in memory, recovering visibility...');
            this._debug(this._visibility[entityId]);
            return this._visibility[entityId];
        }

        const hide = {
            history: false,
            logbook: false
        };

        if (
            this._anyGlobMatch(entityId, this._config?.hide_history?.by_glob) ||
            this._config?.hide_history?.by_device_class?.includes(deviceClass) ||
            this._config?.hide_history?.by_domain?.includes(domain) ||
            this._config?.hide_history?.by_entity_id?.includes(entityId)
        ) {
            hide.history = true;
        }

        if (
            this._anyGlobMatch(entityId, this._config?.unhide_history?.by_glob) ||
            this._config?.unhide_history?.by_device_class?.includes(deviceClass) ||
            this._config?.unhide_history?.by_domain?.includes(domain) ||
            this._config?.unhide_history?.by_entity_id?.includes(entityId)
        ) {
            hide.history = false;
        }

        if (
            this._anyGlobMatch(entityId, this._config?.hide_logbook?.by_glob) ||
            this._config?.hide_logbook?.by_device_class?.includes(deviceClass) ||
            this._config?.hide_logbook?.by_domain?.includes(domain) ||
            this._config?.hide_logbook?.by_entity_id?.includes(entityId)
        ) {
            hide.logbook = true;
        }

        if (
            this._anyGlobMatch(entityId, this._config?.unhide_logbook?.by_glob) ||
            this._config?.unhide_logbook?.by_device_class?.includes(deviceClass) ||
            this._config?.unhide_logbook?.by_domain?.includes(domain) ||
            this._config?.unhide_logbook?.by_entity_id?.includes(entityId)
        ) {
            hide.logbook = false;
        }

        this._visibility[entityId] = {
            hide_history: hide.history,
            hide_logbook: hide.logbook
        };

        this._debug('finished the visibility retrieval, printing the visibility...');
        this._debug(this._visibility[entityId]);

        return this._visibility[entityId];

    }

}

// Ensure the DOM is fully loaded before running the script
Promise.resolve(customElements.whenDefined(SELECTOR.HUI_VIEW))
	.then(() => {
		window.customMoreInfo = new CustomMoreInfo();
	});
