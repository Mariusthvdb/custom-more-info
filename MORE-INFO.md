MORE-INFO

HomeAssistant filters many attributes that are deemed to be not of importance/relevance for the display in the Frontend More-info cards. 
Below the files are listed which the current Home Assistant Frontend employs to control or Filter those attributes:

- https://github.com/home-assistant/frontend/blob/dev/src/data/entity_attributes.ts
- https://github.com/home-assistant/frontend/blob/dev/src/components/ha-attributes.ts
and more specifically
- https://github.com/home-assistant/frontend/blob/dev/src/components/ha-attributes.ts#L24

With this custom resource we aim at allowing some flexibilty and customization of that selection of filtered attributes.
