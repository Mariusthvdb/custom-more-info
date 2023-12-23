export const NAME = 'Custom-more-info';
export const DESCRIPTION = 'Custom more-info for Home Assistant';
export const URL = 'https://github.com/Mariusthvdb/custom-more-info';

export const STYLES_PREFIX = 'custom_more_info';
export const MAX_ATTEMPTS = 500;
export const RETRY_DELAY = 50;

export enum SELECTOR {
    HUI_VIEW = 'hui-view',
    MORE_INFO_CONTENT = 'more-info-content',
    MORE_INFO_HSTORY = 'ha-more-info-history',
    MORE_INFO_LOGBOOK = 'ha-more-info-logbook',
    HA_ATTRIBUTES = 'ha-attributes'
}

export const ESCAPE_REG_EXP = /[.?+^$[\]\\(){}|-]/g;

export const ALL_FILTER = 'all';

export const IGNORED_ATTRIBUTES = [
    'assumed_state',
    'attribution',
    'custom_ui_more_info',
    'custom_ui_state_card',
    'device_class',
    'editable',
    'emulated_hue_name',
    'emulated_hue',
    'entity_id',
    'entity_picture',
    'event_types',
    'friendly_name',
    'haaska_hidden',
    'haaska_name',
    'icon',
    'initial_state',
    'last_reset',
    'restored',
    'state_class',
    'supported_features',
    'unit_of_measurement'
];