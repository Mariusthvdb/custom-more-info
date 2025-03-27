export const NAME = 'Custom-more-info';
export const DESCRIPTION = 'Custom more-info for Home Assistant';
export const URL = 'https://github.com/Mariusthvdb/custom-more-info';

export const STYLES_PREFIX = 'custom_more_info';
export const MAX_ATTEMPTS = 100;
export const RETRY_DELAY = 10;

export enum SELECTOR {
    HUI_VIEW = 'hui-view',
    MORE_INFO_CONTENT = 'more-info-content',
    MORE_INFO_HISTORY = 'ha-more-info-history',
    MORE_INFO_LOGBOOK = 'ha-more-info-logbook',
    HA_ATTRIBUTES = 'ha-attributes',
    MENU_ITEM = 'ha-icon-button',
    MENU_ITEM_ICON = 'mwc-icon-button',
    MORE_INFO_HEADER = 'ha-dialog-header',
    MORE_INFO_HEADER_HISTORY_ICON = 'ha-icon-button[data-custom-selector="DIALOG_HISTORY"]'
}

export enum MENU {
    SEARCH = 'SEARCH',
    ASSIST = 'ASSIST',
    REFRESH = 'REFRESH',
    UNUSED_ENTITIES = 'UNUSED_ENTITIES',
    RELOAD_RESOURCES = 'RELOAD_RESOURCES',
    EDIT_DASHBOARD = 'EDIT_DASHBOARD',
    DIALOG_DISMISS = 'DIALOG_DISMISS',
    DIALOG_HISTORY = 'DIALOG_HISTORY',
    DIALOG_SETTINGS = 'DIALOG_SETTINGS'
}

const UI_PREFIX = 'ui';
const DIALOGS_PREFIX = `${UI_PREFIX}.dialogs.more_info_control`;

export const MENU_REFERENCES = Object.freeze({
	[MENU.DIALOG_HISTORY]: `${DIALOGS_PREFIX}.history`,
	[MENU.DIALOG_SETTINGS]: `${DIALOGS_PREFIX}.settings`,
	[MENU.DIALOG_DISMISS]: `${DIALOGS_PREFIX}.dismiss`
});

export const ESCAPE_REG_EXP = /[.?+^$[\]\\(){}|-]/g;
export const DOMAIN_REG_EXP = /^(.+)\..+$/;

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