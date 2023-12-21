export interface CustomMoreInfoClass {
}

export interface StateObject {
    attributes: {
        device_class?: string;
        [attr: string]: unknown;
    },
    entity_id: string;
}

export interface Attributes extends Element {
    extraFilters: string | undefined;
    __stateObj: StateObject;
}

export interface AttributeFilters {
    by_entity_id?: Record<string, string[]>;
    by_domain: Record<string, string[]>;
    by_device_class?: Record<string, string[]>;
    by_glob: Record<string, string[]>;
}

export interface Filters {
    filter_attributes: string[];
    unfilter_attributes: string[];
}

export interface CustomMoreInfoConfig {
    debug?: boolean;
    filter_all?: boolean;
    unfilter_all?: boolean;
    filter_attributes?: AttributeFilters;   
    unfilter_attributes?: AttributeFilters;
}

export interface Lovelace extends HTMLElement {
	lovelace: {
        config: {
            custom_more_info?: CustomMoreInfoConfig;
        };
    };
}

declare global {
    interface Window {
        customMoreInfo: CustomMoreInfoClass;
    }
}