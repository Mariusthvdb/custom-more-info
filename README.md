# custom-attributes
Custom attributes for Home Assistant

[![GH-release](https://img.shields.io/github/v/release/Mariusthvdb/custom-attributes.svg?style=flat-square)](https://github.com/Mariusthvdb/custom-attributes/releases)
[![GH-downloads](https://img.shields.io/github/downloads/Mariusthvdb/custom-attributes/total?style=flat-square)](https://github.com/Mariusthvdb/custom-attributes/releases)
[![GH-last-commit](https://img.shields.io/github/last-commit/Mariusthvdb/custom-attributes.svg?style=flat-square)](https://github.com/Mariusthvdb/custom-attributes/commits/master)
[![GH-code-size](https://img.shields.io/github/languages/code-size/Mariusthvdb/custom-attributes.svg?color=red&style=flat-square)](https://github.com/Mariusthvdb/custom-attributes)


W.I.P
Placeholder for a custom resource for Home Assistant to customize the displayed Attributes of entities in the Dashboard on `more-info` cards.

Replacing the existing custom-ui-more-info.js standalone script, or the functionality of that same section in the original custom-ui.js.

**Before:**

<img width="350" alt="after" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/9cca52a4-2179-45f6-add3-be08b063381f">

<img width="350" alt="before_2" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/158d7019-e3c4-40f8-9d31-c5a931a29c6d">

**After filtering**

attribute `options` *('Mogelijke statussen' in Dutch)*

<img width="350" alt="after" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/586ae28e-7799-49f3-8be7-2e41096e8f80">

Note that because of the fact no more attributes are left to display, the initial dropdown box is also no longer showing.


## Configuration and enable

To enable the plugin one needs to add the `custom_attributes` parameter to the root of the lovelace yaml file of each Dashboard:

```yaml
custom_attributes:
   # Configuration
```

## Configuration options

#### filter_attributes

This parameter controls what should be filtered out from the more-info dialogs attributes:

```yaml
custom_attributes:
  filter_attributes:
    # filter_attributes parameters   
```

#### filter_attributes > by_entity_id

This parameter filters attributes from entities matching their `entity_id`, it must contain an array of attributes' names. This parameter will override any other parameter that you add to `filter_attributes`:

```yaml
custom_attributes:
  filter_attributes:
    by_entity_id:
      binay_sensor.name_of_binary_sensor:
        - some_attribute_name
        - some_attribute_name
```

#### filter_attributes > by_domain

This parameter filters attributes from entities matching their domain, it must contain an array of attributes' names. This parameter will override the parameters `by_device_class` and `by_glob`:

```yaml
custom_attributes:
  filter_attributes:
    by_domain:
      sensor:
        - some_attribute_name
        - some_attribute_name
```

#### filter_attributes > by_device_class

This parameter filters attributes from entities matching their device class, it must contain an array of attributes' names. This parameter will override the `by_glob` parameter:

```yaml
custom_attributes:
  filter_attributes:
    by_device_class:
      motion:
        - some_attribute_name
        - some_attribute_name
```

#### filter_attributes > by_glob

This parameter filters attributes from entities matching a glob pattern of their `entity_id`, it must contain an array of attributes' names. This parameter can be overriden by any other parameter in `filter_attributes`:

```yaml
custom_attributes:
  filter_attributes:
    by_glob:
      sensor.garden_*:
        - some_attribute_name
        - some_attribute_name
```
