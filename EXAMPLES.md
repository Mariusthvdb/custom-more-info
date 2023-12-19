## Example configuration file

```yaml
##########################################################################################
# Custom attributes configuration settings                                               #
# use a config per Dashboard, and add it to the root of the yaml file like               #
#                                                                                        #
#      ############################################################################      #
#      # title: Your Dashboard title                                              #      #
#      #                                                                          #      #
#      # button_card_templates: !include_dir_merge_named ../button_card_templates #      #
#      # decluttering_templates: !include_dir_named ../decluttering_templates     #      #
#      # kiosk_mode: !include ../kiosk-mode/kiosk-mode.yaml                       #      #
#      # custom_attributes: !include ../custom_attributes/custom_attributes.yaml  #      #
#      #                                                                          #      #
#      # views:                                                                   #      #
#      #   - !include view_home.yaml                                              #      #
#      #   - !include view_number_two                                             #      #
#      #   - etc                                                                  #      #
#      ############################################################################      #
#                                                                                        #
##########################################################################################

# use the available 'debug' paramater if a filter does not work and you need to report
# malfunctioning to the issue tracker.

debug: true

##########################################################################################
# Unfilter                                                                               #
##########################################################################################

# special boolean setting for 'all'
unfilter_all: true

unfilter_attributes:

  by_domain:
# filtered by Home Assistant by default
    binary_sensor:
      - device_class

    sensor:
      - device_class

# filtered by User in the filter_attributes
  by_glob:

    'device_tracker.google*':
      - ip
      - mac
      - ap_mac

##########################################################################################
# Filter                                                                                 #
##########################################################################################

# special boolean setting for 'all'
filter_all: true

filter_attributes:

  by_glob:

    '*.*':
      - icon_color
      - id

# first filter 'all' in glob, then unfilter only what user needs in the unfilter section
    'device_tracker.google*':
      - all

    'sensor.ha_*_version':
      - all

    'sensor.buienradar_*':
      - Stationname

    'sensor.*_actueel': &meter # use a yaml anchor to easily c&p repetitive attributes
      - meter_type
      - meter_type_name

    'sensor.*_totaal': *meter

    'sensor.*_amperage': *meter

    'sensor.*_voltage': *meter

    'sensor.*_battery_state':
      - templates

  by_device_class:

    enum:
      - options

  by_domain:

    binary_sensor:
      - hysteresis

    light:
      - all

    siren:
      - available_tones

  by_entity_id:

    sensor.cpu_speed:
      - brand

    group.media_players_device_trackers:
      - all

    group.hub_device_trackers:
      - all


```

## Edit, safe (and refresh)

If you are using [yaml mode](https://www.home-assistant.io/dashboards/dashboards/#using-yaml-for-the-default-dashboard), you need to refesh the Dashboard via the top right menu item (3-dots) and next reload the view after editing and saving your `filter_attributes`. 
The reload is required for [each Dashboard](https://www.home-assistant.io/dashboards/dashboards) you might use.
On subviews, a second reload of the subview could be needed, just be sure the cache is cleared.

<img width="215" alt="refresh" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/9d57c2db-10c1-44af-9e0b-f0704331cb3c">

When in storage mode (UI) `home-assistant-query-selector` takes care of that and you're set on safe. No need to refresh manually.
