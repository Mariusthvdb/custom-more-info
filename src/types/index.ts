export interface CustomAttributesClass {
}

export interface Attributes extends Element {
    extraFilters?: string;
}

declare global {
    interface Window {
        customAttributes: CustomAttributesClass;
    }
}