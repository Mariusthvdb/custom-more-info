## Example configuration file

```yaml
##########################################################################################
# Available filter_attributes parameters
#
# by_entity_id:
#
# by_domain:
#
# by_device_class:
#
# by_glob:
#
# All used parameters are merged
##########################################################################################

filter_attributes:

  by_entity_id:

    sensor.cpu_speed:
      - brand

  by_domain:

    binary_sensor:
      - hysteresis

    light:
      - all

    siren:
      - available_tones

  by_device_class:

    enum:
      - options

# take care and always quote
  by_glob:

    '*.*':
      - icon_color

    'device_tracker.google*':
      - all
      # - is_guest

    'sensor.ha_*_version':
      - all

    'sensor.buienradar_*':
      - stationname

# we can also use Yaml anchors to easily c&p 
    'sensor.*_actueel': &meter_type
      - meter_type
      - meter_type_name

    'sensor.*_totaal': *meter_type

    'sensor.*_amperage': *meter_type

    'sensor.*_voltage': *meter_type
```

## Edit, safe (and refresh)

If you are using [yaml mode](https://www.home-assistant.io/dashboards/dashboards/#using-yaml-for-the-default-dashboard), you need to refesh the Dashboard via the top right menu item (3-dots) and next reload the view after editing and saving your `filter_attributes`. 
The reload is required for [each Dashboard](https://www.home-assistant.io/dashboards/dashboards) you might use.

<img width="215" alt="refresh" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/9d57c2db-10c1-44af-9e0b-f0704331cb3c">

When in storage mode (UI) home-assistant-query-selector takes care of that and your set on safe.
