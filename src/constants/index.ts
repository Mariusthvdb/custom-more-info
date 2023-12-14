export const NAME = 'Custom-attributes';
export const DESCRIPTION = 'Custom attributes for Home Assistant';
export const URL = 'https://github.com/Mariusthvdb/custom-attributes';

export enum SELECTOR {
    HUI_VIEW = 'hui-view',
    MORE_INFO_CONTENT = 'more-info-content',
    MORE_INFO_DEFAULT = 'more-info-default',
    MORE_INFO_VACUUM = 'more-info-vacuum',
    MORE_INFO_LIGHT = 'more-info-light',
    MORE_INFO_SIREN = 'more-info-siren',
    HA_ATTRIBUTES = 'ha-attributes'
}

export const ESCAPE_REG_EXP = /[.?+^$[\]\\(){}|-]/g;