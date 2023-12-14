export const NAME = 'Custom-attributes';
export const DESCRIPTION = 'Custom attributes for Home Assistant';
export const URL = 'https://github.com/Mariusthvdb/custom-attributes';

export enum SELECTOR {
    HUI_VIEW = 'hui-view',
    MORE_INFO_CONTENT = 'more-info-content',
    HA_ATTRIBUTES = 'ha-attributes'
}

export const ESCAPE_REG_EXP = /[.?+^$[\]\\(){}|-]/g;

export const ALL_FILTER = 'all';

export const IGNORED_ATTRIBUTES = [
    'device_class'
];