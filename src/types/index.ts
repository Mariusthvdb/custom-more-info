export interface CustomMoreInfoClass {
}

export interface HomeAssistant extends HTMLElement {
	hass: {
        language: string;
        resources: Record<string, Record<string, string>>;
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

export type ElementsVisibility = Record<
    ByTypes,
    string[]
>;

export interface CustomMoreInfoConfig {
    debug?: boolean;
    filter_all?: boolean;
    unfilter_all?: boolean;
    filter_attributes?: AttributeFilters;   
    unfilter_attributes?: AttributeFilters;
    hide_history_logbook?: ElementsVisibility;
    unhide_history_logbook?: ElementsVisibility;
    hide_history?: ElementsVisibility;
    hide_logbook?: ElementsVisibility;
    unhide_history?: ElementsVisibility;
    unhide_logbook?: ElementsVisibility;
    hide_header_history_icon?: ElementsVisibility;
    unhide_header_history_icon?: ElementsVisibility;
    auto_hide_header_history_icon?: boolean;
}

export interface InternalFilters {
    filter_attributes: string[];
    unfilter_attributes: string[];
}

export interface InternalVisibility {
    hide_history: boolean;
    hide_logbook: boolean;
    hide_header_history_icon: boolean;
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
    __stateObj: StateObject;
}

export interface MoreInfoDialog extends HTMLElement {
    ___entry?: {
        entity_id: string;
        original_device_class?: string;
    };
    ___entityId: string;
}

declare global {
    interface Window {
        customMoreInfo: CustomMoreInfoClass;
    }
}