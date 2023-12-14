export interface CustomAttributesClass {
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
    hide: string[];
    unhide: string[];
}

export interface CustomAttributesConfig {
    debug?: boolean;
    filter_attributes?: AttributeFilters;   
    unfilter_attributes?: AttributeFilters;
}

export interface Lovelace extends HTMLElement {
	lovelace: {
        config: {
            custom_attributes?: CustomAttributesConfig;
        };
    };
}

declare global {
    interface Window {
        customAttributes: CustomAttributesClass;
    }
}