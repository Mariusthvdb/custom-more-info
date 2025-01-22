import {
    HAQuerySelector,
    HAQuerySelectorEvent,
    OnLovelacePanelLoadDetail,
    OnMoreInfoDialogOpenDetail,
    OnHistoryAndLogBookDialogOpenDetail
} from 'home-assistant-query-selector';
import {
    Lovelace,
    CustomMoreInfoConfig,
    Attributes,
    InternalFilters,
    InternalConfig,
    MoreInfoDialog,
    HomeAssistant,
    ConditionalFilter
} from '@types';
import {
    NAME,
    DESCRIPTION,
    SELECTOR,
    ESCAPE_REG_EXP,
    DOMAIN_REG_EXP,
    ALL_FILTER,
    IGNORED_ATTRIBUTES,
    MAX_ATTEMPTS,
    RETRY_DELAY
} from '@constants';
import {
    addStyle,
    removeStyle,
    getHiddenStyle,
    getPromisableElement,
    getTranslations,
    addDataSelectors
} from '@utilities';
import { version } from '../package.json';

class CustomMoreInfo {

    constructor() {
        this._selector = new HAQuerySelector({
            retries: MAX_ATTEMPTS,
            delay: RETRY_DELAY
        });
        this._selector.addEventListener(HAQuerySelectorEvent.ON_LOVELACE_PANEL_LOAD, (event) => {
            this.storeConfig(event.detail);
        });
        this._selector.addEventListener(HAQuerySelectorEvent.ON_MORE_INFO_DIALOG_OPEN, (event) => {
            this._debug('a more info dialog has been opened so applying customizations');
            this.queryAttributes(event.detail);
            this.queryDialogElements(event.detail);
		});
        this._selector.addEventListener(HAQuerySelectorEvent.ON_HISTORY_AND_LOGBOOK_DIALOG_OPEN, (event) => {
            this._debug('a history and logbook dialog has been opened so applying customizations');
            this.queryDialogElements(event.detail);
		});
        this._selector.listen();
    }

    private _selector: HAQuerySelector;
    private _config: CustomMoreInfoConfig;
    private _filters: Record<string, InternalFilters>;
    private _conditionalConfig: Record<string, InternalConfig>;
    private _translations: Record<string, string>;

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

    private _getDialogEntityId(dialog: MoreInfoDialog): Promise<string> {
        return getPromisableElement(
            () => dialog.___entry?.entity_id || dialog.___entityId,
            (entityId: string): boolean => !!entityId
        );
    }

    private _getDialogDeviceClass(dialog: MoreInfoDialog): Promise<string> {
        return getPromisableElement(
            () => dialog.___entry?.original_device_class,
            (deviceClass: string | null): boolean => deviceClass === null || typeof deviceClass === 'string'
        );
    }

    private _getDomain(entityId: string): string {
        return entityId.replace(DOMAIN_REG_EXP, '$1');
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

    private _anyConfigMatch(
        parameter: ConditionalFilter | undefined,
        entityId: string,
        deviceClass: string,
        domain: string
    ): boolean {
        return (
            this._anyGlobMatch(entityId, parameter?.by_glob) ||
            parameter?.by_device_class?.includes(deviceClass) ||
            parameter?.by_domain?.includes(domain) ||
            parameter?.by_entity_id?.includes(entityId)
        );
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
            .then((lovelacePanel: Lovelace): void => {
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
                this._conditionalConfig = {};
                this._debug(this._config);
            })
            .finally(() => {
                detail.HOME_ASSISTANT.element
                    .then((ha: HomeAssistant): void => {
                        getTranslations(ha)
                            .then((translations: Record<string, string>) => {
                                this._translations = translations;
                                this._debug('translations have been retrieved. printing the translations');
                                this._debug(this._translations);
                            })
                            .catch(() => {
                                this._debug('error getting the translations');
                            });
                    });
            });
    }

    protected async queryAttributes(detail: OnMoreInfoDialogOpenDetail): Promise<void> {

        const { HA_MORE_INFO_DIALOG_INFO } = detail;

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
                    this.filterAttributes(attributes);
                } else {
                    this._debug('this dialog doesn‘t have attributes or the attributes have not been found');
                }
            });

    }

    protected async queryDialogElements(detail: OnMoreInfoDialogOpenDetail | OnHistoryAndLogBookDialogOpenDetail): Promise<void> {

        const {
            HA_DIALOG,
            HA_MORE_INFO_DIALOG,
            HA_DIALOG_CONTENT
        } = detail;

        const dialog = await HA_MORE_INFO_DIALOG.element as MoreInfoDialog;
        const entityId = await this._getDialogEntityId(dialog);
        const deviceClass = await this._getDialogDeviceClass(dialog);
        const domain = this._getDomain(entityId);

        const internalConfig = this.getInternalConfig(
            entityId,
            domain,
            deviceClass || ''
        );

        if (internalConfig.maximized_size) {
            dialog.large = true;
        }

        HA_DIALOG
            .selector
            .query(SELECTOR.MORE_INFO_HEADER)
            .element
            .then((header: Element): void => {
                if (header) {
                    this._debug('finished the task of querying the header, the result is');
                    this._debug(header);
                    this.addDataSelectors(header);
                    this.processHeaderElements(header, internalConfig);
                } else {
                    this._debug('this dialog doesn‘t have a header or it has not been found');
                }
            });
            
        HA_DIALOG_CONTENT
            .selector
            .deepQuery(
                [
                    SELECTOR.MORE_INFO_HISTORY,
                    SELECTOR.MORE_INFO_LOGBOOK
                ].join(',')
            )
            .element
            .then((element: Element): void => {
                this._debug('finished the task of querying the history or logbook of the dialog, the result is');
                if (element) {
                    const container = element.parentElement || element.getRootNode() as ShadowRoot;
                    this._debug('history or logbook have been found');
                    this._debug(element);
                    this.processContentElements(container, internalConfig);
                } else {
                    this._debug('this dialog doesn‘t have history or logbook or they have not been found.');
                }
            });
            
    }

    protected filterAttributes(attributes: Attributes): void {

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

    protected addDataSelectors(header: Element): void {
        addDataSelectors(
            header.querySelectorAll(SELECTOR.MENU_ITEM),
            this._translations
        );
    }

    protected processContentElements(
        container: Element | ShadowRoot,
        internalConfig: InternalConfig
    ): void {

        const styles = [
            internalConfig.hide_history
                ? getHiddenStyle(SELECTOR.MORE_INFO_HISTORY)
                : '',
            internalConfig.hide_logbook
                ? getHiddenStyle(SELECTOR.MORE_INFO_LOGBOOK)
                : ''
        ];

        if (
            internalConfig.hide_history ||
            internalConfig.hide_logbook
        ) {
            addStyle(container, styles.join(''));
        } else {
            removeStyle(container);
        }

    }

    protected processHeaderElements(
        content: Element,
        internalConfig: InternalConfig
    ): void {

        if (!this._translations) {
            this._debug('skiping the header history task, because translations don‘t exist');
            return;
        }

        if (internalConfig.hide_header_history_icon) {
            addStyle(content, getHiddenStyle(SELECTOR.MORE_INFO_HEADER_HISTORY_ICON));
        } else {
            removeStyle(content);
        }
    }

    protected getFilters(attributes: Attributes): InternalFilters {

        const entityId = attributes.__stateObj.entity_id;
        const deviceClass = attributes.__stateObj.attributes.device_class;
        const domain = this._getDomain(entityId);

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
                Object.keys(attributes.__stateObj.attributes)
            );
        }

        if (this._config?.unfilter_all || unFilters.has(ALL_FILTER)) {
            this._addSetValues(
                unFilters,
                Object.keys(attributes.__stateObj.attributes)
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

    protected getInternalConfig(
        entityId: string,
        domain: string,
        deviceClass: string | undefined
    ): InternalConfig {

        this._debug(`getting the conditional config for ${entityId}`);

        if (this._conditionalConfig[entityId]) {
            this._debug('the conditional config for this entity have been found in memory, recovering conditional config...');
            this._debug(this._conditionalConfig[entityId]);
            return this._conditionalConfig[entityId];
        }

        const internalConfig = {
            history: false,
            logbook: false,
            header_history_icon: false,
            maximized_size: false
        };

        if (
            this._anyConfigMatch(
                this._config?.hide_history,
                entityId,
                deviceClass,
                domain
            )
        ) {
            internalConfig.history = true;
        }

        if (
            this._anyConfigMatch(
                this._config?.unhide_history,
                entityId,
                deviceClass,
                domain
            )
        ) {
            internalConfig.history = false;
        }

        if (
            this._anyConfigMatch(
                this._config?.hide_logbook,
                entityId,
                deviceClass,
                domain
            )
        ) {
            internalConfig.logbook = true;
        }

        if (
            this._anyConfigMatch(
                this._config?.unhide_logbook,
                entityId,
                deviceClass,
                domain
            )
        ) {
            internalConfig.logbook = false;
        }

        if (
            this._anyConfigMatch(
                this._config?.hide_header_history_icon,
                entityId,
                deviceClass,
                domain
            )
        ) {
            internalConfig.header_history_icon = true;
        }

        if (
            this._anyConfigMatch(
                this._config?.unhide_header_history_icon,
                entityId,
                deviceClass,
                domain
            )
        ) {
            internalConfig.header_history_icon = false;
        }

        if (
            this._anyConfigMatch(
                this._config?.hide_history_logbook,
                entityId,
                deviceClass,
                domain
            )
        ) {
            internalConfig.history = true;
            internalConfig.logbook = true;
        }

        if (
            this._anyConfigMatch(
                this._config?.unhide_history_logbook,
                entityId,
                deviceClass,
                domain
            )
        ) {
            internalConfig.history = false;
            internalConfig.logbook = false;
        }

        if (
            this._anyConfigMatch(
                this._config?.maximized_size,
                entityId,
                deviceClass,
                domain
            )
        ) {
            internalConfig.maximized_size = true;
        }

        if (
            this._anyConfigMatch(
                this._config?.default_size,
                entityId,
                deviceClass,
                domain
            )
        ) {
            internalConfig.maximized_size = false;
        }

        this._conditionalConfig[entityId] = {
            hide_history: internalConfig.history,
            hide_logbook: internalConfig.logbook,
            hide_header_history_icon: internalConfig.header_history_icon ||
            (
                !!this._config?.auto_hide_header_history_icon &&
                internalConfig.history &&
                internalConfig.logbook
            ),
            maximized_size: internalConfig.maximized_size
        };

        this._debug('finished the conditonal config retrieval, printing the conditional config...');
        this._debug(this._conditionalConfig[entityId]);

        return this._conditionalConfig[entityId];

    }

}

if (!window.customMoreInfo) {
    console.info(
        `%c  ${NAME}  \n%c  Version ${version} ${DESCRIPTION}`,
        'color: gold; font-weight: bold; background: black',
        'color: white; font-weight: bold; background: steelblue'
    );
    window.customMoreInfo = new CustomMoreInfo();
}
