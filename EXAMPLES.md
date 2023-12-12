custom_attributes:
  filter_attributes:
    ## Filter attributes from specific entities
    sensor.my_sensor:
      - some_attribute
      - some_attribute
    ## Filter attributes from entities that match a glob
    "light.kitchen_*":
      - some_attribute
      - some_attribute
    ## Filter attributes from domains
    "person.*":
      - some_attribute
      - some_attribute
