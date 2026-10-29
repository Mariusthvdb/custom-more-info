import {
  HAQuerySelector,
  HAQuerySelectorEvent,
  OnLovelacePanelLoadDetail,
  OnMoreInfoDialogOpenDetail,
  OnHistoryAndLogBookDialogOpenDetail,
} from 'home-assistant-query-selector';
import {
  Lovelace,
  CustomMoreInfoConfig,
  ExtendedEntityRegistryEntry,
  Attributes,
  InternalFilters,
  InternalConfig,
  MoreInfoDialog,
  HomeAssistant,
  ConditionalFilter,
  HaExpansionPanel,
  HaMoreInfoDetails,
  HaAttributeValue,
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
  RETRY_DELAY,
  DETAILS,
  DETAILS_REFERENCES,
} from '@constants';
import {
  addStyle,
  removeStyle,
  getHiddenStyle,
  getLovelaceConfig,
  getTranslations,
  addDataSelectors,
} from '@utilities';
import { version } from '../package.json';

class CustomMoreInfo {
  constructor() {
    this._selector = new HAQuerySelector({
      retries: MAX_ATTEMPTS,
      delay: RETRY_DELAY,
    });
    this._selector.addEventListener(HAQuerySelectorEvent.ON_LOVELACE_PANEL_LOAD, (event) => {
      this.storeConfig(event.detail);
    });
    this._selector.addEventListener(HAQuerySelectorEvent.ON_MORE_INFO_DIALOG_OPEN, (event) => {
      this._debug('a more info dialog has been opened so applying customizations');
      this.dialogOpened(event.detail);
      // this.queryAttributes(event.detail);
      this.queryDialogElements(event.detail);
    });

    this._selector.addEventListener(HAQuerySelectorEvent.ON_HISTORY_AND_LOGBOOK_DIALOG_OPEN, (event) => {
      this._debug('a history and logbook dialog has been opened so applying customizations');
      this.queryDialogElements(event.detail);
    });
    this._extendedEntityRegistryEntry = new Map<string, ExtendedEntityRegistryEntry>();
    this._selector.listen();
  }

  private _selector: HAQuerySelector;
  private _config: CustomMoreInfoConfig;
  private _filters: Record<string, InternalFilters>;
  private _conditionalConfig: Record<string, InternalConfig>;
  private _translations: Record<string, string>;
  private _extendedEntityRegistryEntry: Map<string, ExtendedEntityRegistryEntry>;
  private _hass!: HomeAssistant['hass'];
  private _moreInfoDialogDetails?: HaMoreInfoDetails;
  private _expansionPanelDetails?: HaExpansionPanel;

  private _insertAttributesGlobs(
    entityId: string,
    hide: Record<string, string[]> | undefined,
    show: Record<string, string[]> | undefined,
    hideSet: Set<string>,
    showSet: Set<string>,
  ): void {
    this._addSetValues(hideSet, this._getFiltersByGlob(entityId, hide));
    this._addSetValues(showSet, this._getFiltersByGlob(entityId, show));
  }

  private _insertParameters(
    hide: string[] | undefined,
    show: string[] | undefined,
    hideSet: Set<string>,
    showSet: Set<string>,
  ): void {
    this._addSetValues(hideSet, hide);
    this._addSetValues(showSet, show);
  }

  private async _getExtendedEntityRegistryEntry(dialog: MoreInfoDialog): Promise<ExtendedEntityRegistryEntry | null> {
    const entity_id = dialog._entityId;
    if (entity_id) {
      return (
        this._extendedEntityRegistryEntry.get(entity_id) ??
        dialog.hass
          .callWS<ExtendedEntityRegistryEntry>({
            type: 'config/entity_registry/get',
            entity_id,
          })
          .then((registry: ExtendedEntityRegistryEntry) => {
            this._extendedEntityRegistryEntry.set(entity_id, registry);
            return registry;
          })
          .catch((): null => null)
      );
    }
    return null;
  }

  private async _getDialogDeviceClass(dialog: MoreInfoDialog): Promise<string | null> {
    const registry = await this._getExtendedEntityRegistryEntry(dialog);
    return registry?.original_device_class ?? null;
  }

  private _getDomain(entityId: string): string {
    return entityId.replace(DOMAIN_REG_EXP, '$1');
  }

  private _getEntityIdRegExp(glob: string): RegExp {
    const regExpString = glob.replace(ESCAPE_REG_EXP, '\\$&').replace(/\*/g, '.*');
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
    domain: string,
  ): boolean {
    return (this._anyGlobMatch(entityId, parameter?.by_glob) ||
      parameter?.by_device_class?.includes(deviceClass) ||
      parameter?.by_domain?.includes(domain) ||
      parameter?.by_entity_id?.includes(entityId)) as boolean;
  }

  private _debug(message: unknown): void {
    if (this._config?.debug) {
      if (typeof message === 'object' && !(message instanceof Node)) {
        console.debug(JSON.stringify(message, null, 4));
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
      const [glob, globFilters] = entry;
      if (this._globMatch(entityId, glob)) {
        filters.push(...globFilters);
      }
    });
    return filters;
  }

  protected storeConfig(detail: OnLovelacePanelLoadDetail): void {
    detail.HA_PANEL_LOVELACE.element
      .then(async (lovelacePanel: Lovelace): Promise<void> => {
        const lovelaceConfig = await getLovelaceConfig(lovelacePanel);
        const config = lovelaceConfig?.custom_more_info;
        if (config) {
          this._config = config;
          this._debug('the config has been loaded, printing the config...');
        } else if (!this._config || !Object.keys(this._config).length) {
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
        detail.HOME_ASSISTANT.element.then((ha: HomeAssistant) => {
          this._hass = ha.hass;
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

    HA_MORE_INFO_DIALOG_INFO.selector.$.query(SELECTOR.MORE_INFO_CONTENT)
      .$.query(SELECTOR.HOST_DIRECT_CHILDREN)
      .all.then((children: NodeListOf<HTMLElement>): void => {
        this._debug('finished the task of querying attributes, the result is');

        let found = false;

        // Filter children with `more-info-` prefix
        const moreInfoChildren = Array.from(children).filter((child: HTMLElement): boolean => {
          return child.nodeName.startsWith('MORE-INFO-');
        });

        // Query for attributes in each more-info children
        for (const child of moreInfoChildren) {
          const rootAttributes = child.querySelector<Attributes>(SELECTOR.HA_ATTRIBUTES);
          const shadowRootAttributes = child.shadowRoot
            ? child.shadowRoot.querySelector<Attributes>(SELECTOR.HA_ATTRIBUTES)
            : null;
          const attributes = rootAttributes || shadowRootAttributes;
          if (attributes) {
            this._debug('attributes have been found');
            this._debug(attributes);
            this.filterAttributes(attributes);

            found = true;
            break;
          }
        }

        if (!found) {
          this._debug('this dialog doesn‘t have attributes or the attributes have not been found');
        }
      });
  }

  protected async dialogOpened(detail: OnMoreInfoDialogOpenDetail): Promise<void> {
    const { HA_MORE_INFO_DIALOG, HA_MORE_INFO_DIALOG_INFO } = detail;

    const dialog = (await HA_MORE_INFO_DIALOG.element) as MoreInfoDialog;
    const entityId = dialog._entityId;
    const deviceClass = await this._getDialogDeviceClass(dialog);
    const domain = this._getDomain(entityId);
    const internalConfig = this.getInternalConfig(entityId, domain, deviceClass || '');
    const stateObj = this._hass.states?.[entityId];

    if (internalConfig.hide_additional_details || !stateObj) {
      this._debug(
        `skipping the additional details element injection because the config hide_additional_details is true or the state object of the ${entityId} is not available`,
      );
      return;
    }

    const filter = this.getFilters({ stateObj } as Attributes);

    const moreInfoDialogInfo = await HA_MORE_INFO_DIALOG_INFO.element;
    const contentDiv = moreInfoDialogInfo?.shadowRoot?.querySelector('.content') as HTMLDivElement;
    const content = moreInfoDialogInfo?.shadowRoot?.querySelector(SELECTOR.MORE_INFO_CONTENT) as Attributes;

    if (!moreInfoDialogInfo.hasAttribute('details-processed') && content && contentDiv) {
      this._debug(
        'a more info dialog content has been found, adding data selectors to the content and a details element to the content div',
      );
      this.filterAttributes(content as Attributes);
      this._expansionPanelDetails = this._createDetailsElement(entityId, dialog._entry);
      contentDiv.appendChild(this._expansionPanelDetails);
      moreInfoDialogInfo.setAttribute('details-processed', '');
      setTimeout(() => {
        this._handleDetailsContent(filter.filter_attributes, internalConfig.hide_state_section_details);
      }, 100);
    }
  }

  private _handleDetailsContent(filter: string[], hideStateSectionDetails: boolean): void {
    if (!this._moreInfoDialogDetails) {
      console.debug(
        'the details element has not been created or no filters are applied, skipping the details content handling',
      );
      return;
    }

    const detailsShadowRoot = this._moreInfoDialogDetails.shadowRoot;
    if (!detailsShadowRoot) {
      return;
    }
    addStyle(
      detailsShadowRoot,
      ':host .content { padding: 0 !important; }  :host .content .section { margin-top: var(--ha-scpace-4, 16px) !important; } :host .content ha-card { border: none !important; border-radius: 0 !important; box-shadow: none !important; } :host .content ha-card .card-content { padding-inline: var(--ha-space-2, 8px) !important; }',
    );
    const sections = detailsShadowRoot.querySelectorAll('section');
    let empty = false;

    if (sections) {
      const findSection = (sec: keyof typeof DETAILS_REFERENCES) =>
        Array.from(sections).find((section: Element) => {
          const header = section.querySelector('h2');
          return header?.textContent.trim() === this._hass.localize(DETAILS_REFERENCES[sec]);
        });

      const stateSection = findSection(DETAILS.STATE_TITLE);
      const attributeSection = findSection(DETAILS.ATTRIBUTES_TITLE);

      if (hideStateSectionDetails && stateSection) {
        this._debug('the state section has been found in the details element, hiding the state section');
        stateSection.parentElement?.removeChild(stateSection);
      }
      if (attributeSection) {
        this._debug(
          'the attributes section has been found in the details element, handling data entries with the filters',
        );
        const haCard = attributeSection.querySelector(SELECTOR.HA_CARD);
        if (haCard && haCard.shadowRoot) {
          const dataGroup =
            haCard.querySelector(SELECTOR.DATA_GROUP) || haCard.shadowRoot.querySelector(SELECTOR.DATA_GROUP);
          if (dataGroup) {
            const dataEntries = dataGroup.querySelectorAll(':scope > *');
            Array.from(dataEntries).forEach((entry: Element): void => {
              const haAttributeValue = entry.querySelector(SELECTOR.HA_ATTRIBUTE_VALUE) as HaAttributeValue;
              if (haAttributeValue) {
                const attribute = haAttributeValue.attribute as HaAttributeValue['attribute'];
                if (filter.includes(attribute)) {
                  dataGroup.removeChild(entry);
                }
              }
            });
            empty = dataGroup.querySelectorAll(':scope > *').length === 0;
          }
        }
      }
      if (empty) {
        // remove the section if there is no content to avoid showing an empty section
        attributeSection.parentElement?.removeChild(attributeSection);
      }
      this._checkEmptyContent(detailsShadowRoot);
    }
  }

  private _checkEmptyContent(root: ShadowRoot): void {
    const content = root.querySelector('.content');
    if (content && content.children.length === 0) {
      this._debug(
        'the details content is empty after applying the filters, removing the expansion panel to avoid showing an empty content',
      );
      this._expansionPanelDetails?.remove();
    }
  }

  protected async queryDialogElements(
    detail: OnMoreInfoDialogOpenDetail | OnHistoryAndLogBookDialogOpenDetail,
  ): Promise<void> {
    const { HA_DIALOG, HA_MORE_INFO_DIALOG, HA_DIALOG_CONTENT } = detail;

    const dialog = (await HA_MORE_INFO_DIALOG.element) as MoreInfoDialog;
    const entityId = dialog._entityId;
    const deviceClass = await this._getDialogDeviceClass(dialog);
    const domain = this._getDomain(entityId);

    const internalConfig = this.getInternalConfig(entityId, domain, deviceClass || '');

    if (internalConfig.maximized_size) {
      dialog.large = true;
    }

    HA_DIALOG.selector.query(SELECTOR.MORE_INFO_HEADER).element.then((header: Element): void => {
      if (header) {
        this._debug('finished the task of querying the header, the result is');
        this._debug(header);
        this.addDataSelectors(header);
        this.processHeaderElements(header, internalConfig);
      } else {
        this._debug('this dialog doesn‘t have a header or it has not been found');
      }
    });

    HA_DIALOG_CONTENT.selector
      .query([SELECTOR.MORE_INFO_HISTORY_AND_LOGBOOK, SELECTOR.MORE_INFO_INFO].join(','))
      .$.element.then((container: ShadowRoot) => {
        let found = false;

        this._debug('finished the task of querying the history or logbook of the dialog, the result is');

        if (container) {
          const element = container.querySelector<HTMLElement>(
            [SELECTOR.MORE_INFO_HISTORY, SELECTOR.MORE_INFO_LOGBOOK].join(','),
          );

          if (element) {
            const container = (element.parentElement || element.getRootNode()) as ShadowRoot;
            this._debug('history or logbook have been found');
            this._debug(element);
            this.processContentElements(container, internalConfig);

            found = true;
          }
        }

        if (!found) {
          this._debug('this dialog doesn‘t have history or logbook or they have not been found.');
        }
      });
  }

  protected filterAttributes(attributes: Attributes): void {
    const filters = this.getFilters(attributes);
    const finalFilters = filters.filter_attributes.filter(
      (filter: string) => !filters.unfilter_attributes.includes(filter),
    );
    console.debug('the filters to apply to the attributes are', finalFilters);
    const extraFilters = attributes.extraFilters || '';
    const separator = extraFilters.length ? ',' : '';
    attributes.extraFilters = extraFilters + separator + finalFilters.join(',');

    if (filters.unfilter_attributes.length) {
      filters.unfilter_attributes.forEach((filter: string): void => {
        if (IGNORED_ATTRIBUTES.includes(filter) && filter in attributes.stateObj.attributes) {
          attributes.stateObj.attributes[`${filter} `] = attributes.stateObj.attributes[filter];
        }
      });
    }
  }

  protected _createDetailsElement(entityId: string, entry?: MoreInfoDialog['_entry']): HaExpansionPanel {
    const panel = document.createElement('ha-expansion-panel') as HaExpansionPanel;
    panel.outlined = true;
    panel.header = this._hass.localize('ui.dialogs.more_info_control.details');
    const detailsElement = document.createElement('ha-more-info-details') as HaMoreInfoDetails;

    detailsElement.params = { entityId: entityId };
    detailsElement.hass = this._hass;
    detailsElement.entry = entry;
    this._moreInfoDialogDetails = detailsElement;
    panel.appendChild(detailsElement);
    panel.style.marginTop = 'var(--ha-space-2, 8px)';
    return panel;
  }

  protected addDataSelectors(header: Element): void {
    addDataSelectors(header.querySelectorAll(SELECTOR.MENU_ITEM), this._translations);
  }

  protected processContentElements(container: Element | ShadowRoot, internalConfig: InternalConfig): void {
    const styles = [
      internalConfig.hide_history ? getHiddenStyle(SELECTOR.MORE_INFO_HISTORY) : '',
      internalConfig.hide_logbook ? getHiddenStyle(SELECTOR.MORE_INFO_LOGBOOK) : '',
    ];

    if (internalConfig.hide_history || internalConfig.hide_logbook) {
      addStyle(container, styles.join(''));
    } else {
      removeStyle(container);
    }
  }

  protected processHeaderElements(content: Element, internalConfig: InternalConfig): void {
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
    const entityId = attributes.stateObj.entity_id;
    const deviceClass = attributes.stateObj.attributes.device_class;
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
      unFilters,
    );

    // By device class
    this._insertParameters(
      this._config?.filter_attributes?.by_device_class?.[deviceClass],
      this._config?.unfilter_attributes?.by_device_class?.[deviceClass],
      filters,
      unFilters,
    );

    // By domain
    this._insertParameters(
      this._config?.filter_attributes?.by_domain?.[domain],
      this._config?.unfilter_attributes?.by_domain?.[domain],
      filters,
      unFilters,
    );

    // By entity id
    this._insertParameters(
      this._config?.filter_attributes?.by_entity_id?.[entityId],
      this._config?.unfilter_attributes?.by_entity_id?.[entityId],
      filters,
      unFilters,
    );

    // All
    if (this._config?.filter_all || filters.has(ALL_FILTER)) {
      this._addSetValues(filters, Object.keys(attributes.stateObj.attributes));
    }

    if (this._config?.unfilter_all || unFilters.has(ALL_FILTER)) {
      this._addSetValues(unFilters, Object.keys(attributes.stateObj.attributes));
    }

    this._filters[entityId] = {
      filter_attributes: Array.from(filters.values()),
      unfilter_attributes: Array.from(unFilters.values()),
    };

    this._debug('finished the filters retrieval, printing the filters...');
    this._debug(this._filters[entityId]);

    return this._filters[entityId];
  }

  protected getInternalConfig(entityId: string, domain: string, deviceClass: string | undefined): InternalConfig {
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
      maximized_size: false,
      state_section_details: false,
      additional_details: false,
    };

    if (this._anyConfigMatch(this._config?.hide_history, entityId, deviceClass, domain)) {
      internalConfig.history = true;
    }

    if (this._anyConfigMatch(this._config?.unhide_history, entityId, deviceClass, domain)) {
      internalConfig.history = false;
    }

    if (this._anyConfigMatch(this._config?.hide_logbook, entityId, deviceClass, domain)) {
      internalConfig.logbook = true;
    }

    if (this._anyConfigMatch(this._config?.unhide_logbook, entityId, deviceClass, domain)) {
      internalConfig.logbook = false;
    }

    if (this._anyConfigMatch(this._config?.hide_header_history_icon, entityId, deviceClass, domain)) {
      internalConfig.header_history_icon = true;
    }

    if (this._anyConfigMatch(this._config?.unhide_header_history_icon, entityId, deviceClass, domain)) {
      internalConfig.header_history_icon = false;
    }

    if (this._anyConfigMatch(this._config?.hide_history_logbook, entityId, deviceClass, domain)) {
      internalConfig.history = true;
      internalConfig.logbook = true;
    }

    if (this._anyConfigMatch(this._config?.unhide_history_logbook, entityId, deviceClass, domain)) {
      internalConfig.history = false;
      internalConfig.logbook = false;
    }

    if (this._anyConfigMatch(this._config?.maximized_size, entityId, deviceClass, domain)) {
      internalConfig.maximized_size = true;
    }

    if (this._anyConfigMatch(this._config?.default_size, entityId, deviceClass, domain)) {
      internalConfig.maximized_size = false;
    }

    if (this._anyConfigMatch(this._config?.hide_state_section_details, entityId, deviceClass, domain)) {
      internalConfig.state_section_details = true;
    }

    if (this._anyConfigMatch(this._config?.unhide_state_section_details, entityId, deviceClass, domain)) {
      internalConfig.state_section_details = false;
    }

    if (this._anyConfigMatch(this._config?.hide_additional_details, entityId, deviceClass, domain)) {
      internalConfig.additional_details = true;
    }

    if (this._anyConfigMatch(this._config?.unhide_additional_details, entityId, deviceClass, domain)) {
      internalConfig.additional_details = false;
    }

    this._conditionalConfig[entityId] = {
      hide_history: internalConfig.history,
      hide_logbook: internalConfig.logbook,
      hide_header_history_icon:
        internalConfig.header_history_icon ||
        (!!this._config?.auto_hide_header_history_icon && internalConfig.history && internalConfig.logbook),
      maximized_size: internalConfig.maximized_size,
      hide_state_section_details: internalConfig.state_section_details,
      hide_additional_details: internalConfig.additional_details,
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
    'color: white; font-weight: bold; background: steelblue',
  );
  window.customMoreInfo = new CustomMoreInfo();
}
