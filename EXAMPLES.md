## Example configuration file

```yaml
filter_attributes:

  by_glob:

    '*.*':
      - icon_color
    device_tracker.google*:
      - is_guest

  by_domain:

    binary_sensor:
      - hysteresis

    siren:
      - available_tones

  by_device_class:

    enum:
      - options

  by_entity_id:

    sensor.cpu_speed:
      - brand
```

## Edit and refresh

After editing and saving your `filter_attributes`, you refesh the Dashboard via the top right menu item and next reload the view.

<img width="215" alt="refresh" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/9d57c2db-10c1-44af-9e0b-f0704331cb3c">
