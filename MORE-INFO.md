MORE-INFO

HomeAssistant filters many attributes that are deemed to be not of importance/relevance for the display in the Frontend More-info cards. 
Below the files are listed which the current Home Assistant Frontend employs to compute, control or Filter those attributes:

Historic:
- https://github.com/home-assistant/frontend/blob/7bc27082595f943d15ca35ae948c766184a93eed/src/util/hass-attributes-util.ts#L87

Current:
- https://github.com/home-assistant/frontend/blob/dev/src/data/entity_attributes.ts
- https://github.com/home-assistant/frontend/blob/dev/src/components/ha-attributes.ts
and more specifically
- https://github.com/home-assistant/frontend/blob/dev/src/components/ha-attributes.ts#L24
- https://github.com/home-assistant/frontend/blob/dev/src/common/entity/compute_attribute_display.ts

With this custom resource we aim at allowing some flexibilty and customization of that selection of filtered attributes.
