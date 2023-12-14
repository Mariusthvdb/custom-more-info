# Custom attributes for Home Assistant

[![GH-release](https://img.shields.io/github/v/release/Mariusthvdb/custom-attributes.svg?style=flat-square)](https://github.com/Mariusthvdb/custom-attributes/releases)
[![GH-downloads](https://img.shields.io/github/downloads/Mariusthvdb/custom-attributes/total?style=flat-square)](https://github.com/Mariusthvdb/custom-attributes/releases)
[![GH-last-commit](https://img.shields.io/github/last-commit/Mariusthvdb/custom-attributes.svg?style=flat-square)](https://github.com/Mariusthvdb/custom-attributes/commits/master)
[![GH-code-size](https://img.shields.io/github/languages/code-size/Mariusthvdb/custom-attributes.svg?color=red&style=flat-square)](https://github.com/Mariusthvdb/custom-attributes)

### What is Custom attributes
This is a custom resource for Home Assistant to customize *which entity attributes are displayed* in the Dashboard on `more-info` cards.
Moreover, if configured so that no more attributes are left to display (all attributes are filtered), the *attributes dropdown box is not rendered at all*.
Custom attributes gives the user ultimate control over the More-info panel.

If you want to hide the more-info panel completely, use [Kiosk-mode](https://github.com/NemesisRE/kiosk-mode), which is the ultimate tool for that and much more.

Note: This replaces the existing custom-ui-more-info.js standalone script, or the more-info functionality in the original [Custom-ui](https://github.com/Mariusthvdb/custom-ui).

_______
## Configuration and enable

Download and install the plugin like any other custom resource in Home Assistant.

To enable the plugin one needs to add the `custom_attributes` parameter to the root of the lovelace yaml file of each Dashboard:

```yaml
custom_attributes:
   # Configuration
```

## Configuration options

### filter_attributes

This parameter controls what should be filtered out from the more-info dialogs attributes:

```yaml
custom_attributes:
  filter_attributes:
    # filter_attributes parameters   
```

#### > by_entity_id

This parameter filters attributes from entities matching their `entity_id`, it must contain an array of attributes names:

```yaml
custom_attributes:
  filter_attributes:
    by_entity_id:
      binay_sensor.name_of_binary_sensor:
        - some_attribute_name
        - some_attribute_name
```

#### > by_domain

This parameter filters attributes from entities matching their domain, it must contain an array of attributes names:

```yaml
custom_attributes:
  filter_attributes:
    by_domain:
      sensor:
        - some_attribute_name
        - some_attribute_name
```

#### > by_device_class

This parameter filters attributes from entities matching their device class, it must contain an array of attributes names:

```yaml
custom_attributes:
  filter_attributes:
    by_device_class:
      motion:
        - some_attribute_name
        - some_attribute_name
```

#### > by_glob

This parameter filters attributes from entities matching a glob pattern of their `entity_id`, it must contain an array of attributes names and globs need to be quoted:

```yaml
custom_attributes:
  filter_attributes:
    by_glob:
      'sensor.garden_*':
        - some_attribute_name
        - some_attribute_name
```

____

### Result of Custom Attributes in the More-info panel

**Before filtering:**

<img width="350" alt="after" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/9cca52a4-2179-45f6-add3-be08b063381f">

<img width="350" alt="before_2" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/158d7019-e3c4-40f8-9d31-c5a931a29c6d">

Siren:

<img width="350" alt="Siren before" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/cb66242c-908e-46dc-aa72-2512759871a5">

**After filtering**

attribute `options` *('Mogelijke statussen' in Dutch)*

<img width="350" alt="after" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/586ae28e-7799-49f3-8be7-2e41096e8f80">

Siren after:

<img width="350" alt="Siren after" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/d2cc0773-28e9-4dba-9328-1292f117db33">
