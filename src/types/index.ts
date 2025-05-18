export interface CustomMoreInfoClass {
}

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
    };
}

export enum BY_TYPES {
    by_entity_id,
    by_domain,
    by_device_class,
    by_glob
}

export type ByTypes = keyof typeof BY_TYPES;

export type AttributeFilters = Record<
    ByTypes,
    Record<string, string[]>
>;

export type ConditionalFilter = Record<
    ByTypes,
    string[]
>;

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
}

export interface InternalFilters {
    filter_attributes: string[];
    unfilter_attributes: string[];
}

export interface InternalConfig {
    hide_history: boolean;
    hide_logbook: boolean;
    hide_header_history_icon: boolean;
    maximized_size: boolean;
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

declare global {
    interface Window {
        customMoreInfo: CustomMoreInfoClass;
    }
}