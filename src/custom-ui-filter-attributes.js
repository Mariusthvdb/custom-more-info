import { HAQuerySelector, HAQuerySelectorEvent } from 'home-assistant-query-selector';

const Name = 'Custom-ui-filter-attributes';
const Version = '20231211';
const Description = 'Filter attributes from more-info dialogs attributes dropdown';
const Url = 'https://github.com/Mariusthvdb/custom-ui-filter-attributes';

console.info(
    `%c  ${Name}  \n%c  Version ${Version} ${Description}`,
    'color: gold; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: steelblue'
  );

window.customUI = {

    installCustomFilters() {

        const CustomFilters = [
            'options',
            'icon_color'
        ];
        
        this.selector = new HAQuerySelector();
        this.selector.addEventListener(HAQuerySelectorEvent.ON_LOVELACE_MORE_INFO_DIALOG_OPEN, (event) => {
            event.detail.HA_MORE_INFO_DIALOG_INFO
                .selector
                .$
                .query('more-info-content')
                .$
                .query(
                    [
                        'more-info-default',
                        'more-info-vacuum',
                        'more-info-light'
                    ].join(',')
                )
                .$
                .query('ha-attributes')
                .element
                .then((attributes) => {
                    if (attributes) {
                        const extraFilters = attributes.extraFilters || '';
                        const separator = extraFilters.length
                            ? ','
                            : '';
                        attributes.extraFilters = extraFilters + separator + CustomFilters.join(',');
                    }
                });
		});
        this.selector.listen();

    },

    init() {

        if (this.selector) {
            return;
        }

        this.installCustomFilters();

    }

};

// Ensure the DOM is fully loaded before running the script
Promise.resolve(customElements.whenDefined('hui-view'))
	.then(() => {
		window.customUI.init();
	});