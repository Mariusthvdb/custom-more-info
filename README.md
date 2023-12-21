# Custom attributes for Home Assistant

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=flat-square)](https://github.com/hacs/integration)
[![GH-release](https://img.shields.io/github/v/release/Mariusthvdb/custom-attributes.svg?style=flat-square)](https://github.com/Mariusthvdb/custom-attributes/releases)
[![GH-downloads](https://img.shields.io/github/downloads/Mariusthvdb/custom-attributes/total?style=flat-square)](https://github.com/Mariusthvdb/custom-attributes/releases)
[![GH-last-commit](https://img.shields.io/github/last-commit/Mariusthvdb/custom-attributes.svg?style=flat-square)](https://github.com/Mariusthvdb/custom-attributes/commits/master)
[![GH-code-size](https://img.shields.io/github/languages/code-size/Mariusthvdb/custom-attributes.svg?color=red&style=flat-square)](https://github.com/Mariusthvdb/custom-attributes)

### What is Custom attributes

This is a custom Plugin for Home Assistant to customize *which entity attributes are displayed* in the Dashboard on `more-info` cards.
Moreover, if configured so that no more attributes are left to display (all attributes are filtered), the *attributes dropdown box is not rendered at all*.

From now on *you* are in control of the More-info attributes. 
Filter all, unfilter all, or select which to see/hide by glob, domain, device_class, or entity_id. 
Any combination is possible!

Custom attributes gives the user ultimate control over the attributes in the More-info panel.

If you want to hide the more-info panel completely, use [Kiosk-mode](https://github.com/NemesisRE/kiosk-mode), which is the ultimate tool for that and much more.

Note: This replaces the existing custom-ui-more-info.js standalone script, or the more-info functionality in the original [Custom-ui](https://github.com/Mariusthvdb/custom-ui).

_______

## Installation

Download and install the plugin like any other custom resource in Home Assistant.


<a href="https://my.home-assistant.io/redirect/hacs_repository/?owner=Mariusthvdb&repository=custom-attributes&category=plugin" target="_blank" rel="noreferrer noopener"><img src="https://my.home-assistant.io/badges/hacs_repository.svg" alt="Open your Home Assistant instance and open a repository inside the Home Assistant Community Store." /></a>

## Enable

To enable the plugin one needs to add the `custom_attributes` parameter to the root of the lovelace yaml file of each Dashboard:

```yaml
custom_attributes:
   # Configuration
```

## Configuration options

5 configuration options available:

* `debug`
* `filter_all`
* `unfilter_all`
* `filter_attributes`
* `unfilter_attributes`

```yaml
custom_attributes:
  debug: true
  filter_all: true
  unfilter_all: true
  filter_attributes:
    # parameters
  unfilter_attributes:
    # parameters   
```

The parameters control which attributes should be (un)filtered in the more-info dialogs.

### Available parameters:

4 'by' parameters alowing detailed customization on various levels, requiring an array of attributes
* `by_entity_id`
* `by_domain`
* `by_device_class`
* `by_glob`

### All possible options:

```yaml
custom_attributes:

  debug: true/false
  filter_all: true ##
  filter_attributes:
    by_entity_id:
      sensor.some_sensor:
        - <attribute>
        - <attribute>
    by_domain:
      binary_sensor:
        - <attribute>
        - <attribute>
    by_device_class:
      motion:
        - <attribute>
        - <attribute>
    by_glob:
      'sensor.*_sensor':
        - <attribute>
        - <attribute>
      '*.*':
        - <attribute>

# identical structure for 'unfilter' on all parameters

  unfilter_all: true ##
  unfilter_attributes:
    by_entity_id:

    by_domain:

    by_device_class:

    by_glob:

```

### Special filter 'all'

The `all` filter is available for all parameters:

```yaml
filter_attributes:
  by_domain:
    light:
      - all
```
and here, will filter all attributes on all Domain Light more-info panels.

### Filter merge

Finally, all configured filters are merged.
To check the complete filter that gets applied, enable `debug: true` and open an Inspector window, where the full JSON object is printed.


## Examples

Please find some real life examples [here](https://github.com/Mariusthvdb/custom-attributes/blob/main/EXAMPLES.md) which explains all available options in detail.


### Result of Custom Attributes in the More-info panel

**Before filtering:**

Device_class attribute `options`

<img width="350" alt="Device class options before" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/158d7019-e3c4-40f8-9d31-c5a931a29c6d">


Siren:

<img width="350" alt="Siren before" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/cb66242c-908e-46dc-aa72-2512759871a5">


Light group:

<img width="350" alt="Light group before" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/5109ac33-60f0-46e7-8fd8-ba4a15f066fb">


**After filtering**

Device_class attribute `options` after *('Mogelijke statussen' in Dutch)*

<img width="350" alt="Device class options after" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/586ae28e-7799-49f3-8be7-2e41096e8f80">


Siren after:

<img width="350" alt="Siren after" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/d2cc0773-28e9-4dba-9328-1292f117db33">


Light group after:

<img width="350" alt="Light group after" src="https://github.com/Mariusthvdb/custom-attributes/assets/33354141/d692020b-c2b3-4708-9344-6d2014d7d0bc">

