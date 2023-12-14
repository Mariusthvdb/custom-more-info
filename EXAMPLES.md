## Example configuration file

```yaml
##########################################################################################
# Hierarchy of filter_attributes parameters
#
# by_entity_id: overrides any other parameter
#
# by_domain: overrides by_device_class and by_glob
#
# by_device_class: overrides by_glob
#
# by_glob: overriden by any other parameter
##########################################################################################

filter_attributes:

# by_entity_id overrides any other parameter
  by_entity_id:

    sensor.cpu_speed:
      - brand

# by_domain overrides by_device_class and by_glob
  by_domain:

    binary_sensor:
      - hysteresis
      - icon_color # needs to be set here, because by_glob is overridden

    light:
      - all

    siren:
      - available_tones

# by_device_class overrides by_glob
  by_device_class:

    enum:
      - options

# by_glob overriden by any other parameter
  by_glob:

    '*.*':
      - icon_color # check by_domain binary_sensor overriding this for that domain.

    device_tracker.google*:
      - all #is_guest
```

## Edit and refresh

After editing and saving your `filter_attributes`, you refesh the Dashboard via the top right menu item and next reload the view.

<img width="215" alt="refresh" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/9d57c2db-10c1-44af-9e0b-f0704331cb3c">
