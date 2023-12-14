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
