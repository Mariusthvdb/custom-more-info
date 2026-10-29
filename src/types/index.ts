export interface CustomMoreInfoClass {}

export interface ExtendedEntityRegistryEntry {
  entity_id: string;
  original_device_class: string;
}

export interface WebSocketCall {
  type: string;
  entity_id: string;
}

export interface HomeAssistant extends HTMLElement {
  hass: {
    localize: (path: string) => string;
    callWS: <T>(options: WebSocketCall) => Promise<T>;
    states: Record<string, StateObject>;
  };
}

export enum BY_TYPES {
  by_entity_id,
  by_domain,
  by_device_class,
  by_glob,
}

export type ByTypes = keyof typeof BY_TYPES;

export type AttributeFilters = Record<ByTypes, Record<string, string[]>>;

export type ConditionalFilter = Record<ByTypes, string[]>;

export interface CustomMoreInfoConfig {
  debug?: boolean;
  filter_all?: boolean;
  unfilter_all?: boolean;
  filter_attributes?: AttributeFilters;
  unfilter_attributes?: AttributeFilters;
  hide_history_logbook?: ConditionalFilter;
  unhide_history_logbook?: ConditionalFilter;
  hide_history?: ConditionalFilter;
  hide_logbook?: ConditionalFilter;
  unhide_history?: ConditionalFilter;
  unhide_logbook?: ConditionalFilter;
  hide_header_history_icon?: ConditionalFilter;
  unhide_header_history_icon?: ConditionalFilter;

  auto_hide_header_history_icon?: boolean;
  maximized_size?: ConditionalFilter;
  default_size?: ConditionalFilter;
  /**
   * Conditions for hiding 'state section' in additional details element.
   **/
  hide_state_section_details?: ConditionalFilter;
  /**
   * Conditions for unhiding 'state section' in additional details element. Takes precedence over `hide_state_section_details`.
   **/
  unhide_state_section_details?: ConditionalFilter;
  /**
   * Conditions for not injecting additional details element to initial info view. Defaults plugin add to all entities.
   **/
  hide_additional_details?: ConditionalFilter;
  /**
   * Conditions for unhiding 'additional details' in additional details element. Takes precedence over `hide_additional_details`.
   **/
  unhide_additional_details?: ConditionalFilter;
}

export interface InternalFilters {
  filter_attributes: string[];
  unfilter_attributes: string[];
}

export interface InternalConfig {
  hide_history: boolean;
  hide_logbook: boolean;
  maximized_size: boolean;
  hide_header_history_icon: boolean;
  hide_state_section_details: boolean;
  hide_additional_details: boolean;
}

export interface Lovelace extends HTMLElement {
  lovelace: {
    config: {
      custom_more_info?: CustomMoreInfoConfig;
    };
  };
}

export interface StateObject {
  entity_id: string;
  attributes: {
    device_class?: string;
    [attr: string]: unknown;
  };
}

export interface Attributes extends Element {
  extraFilters: string | undefined;
  stateObj: StateObject;
}

export interface MoreInfoDialog extends HTMLElement {
  hass: HomeAssistant['hass'];
  _entry?: {
    entity_id: string;
    original_device_class?: string;
  };
  _entityId: string;
  large: boolean;
}
export interface HaExpansionPanel extends HTMLElement {
  expanded?: boolean;
  outlined?: boolean;
  leftChevron?: boolean;
  noCollapse?: boolean;
  header?: string;
  secondary?: string;
  disabled?: boolean;
}

export interface HaMoreInfoDetails extends HTMLElement {
  hass: HomeAssistant['hass'];
  params?: {
    entityId: string;
  };
  entry?: {
    entity_id: string;
    original_device_class?: string;
  } | null;
  yamlMode?: boolean;
}

export interface HaAttributeValue extends HTMLElement {
  attribute: string;
}
declare global {
  interface Window {
    customMoreInfo: CustomMoreInfoClass;
  }
}
