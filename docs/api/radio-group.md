# RadioGroup

## Props
| Name                                | Type    | Default   | Required | Description |
| ----------------------------------- | ------- | --------- | -------- | ----------- |
| [options](#markdown-header-options) | arrayOf | []        | false    |             |
| [type](#markdown-header-type)       | enum    | 'stacked' | false    |             |

## Complex Props

### options
Type: _arrayOf_

**options** is an array of the following type:

| Name     | Type   | Required |
| -------- | ------ | -------- |
| disabled | bool   | false    |
| value    | string | false    |
| label    | node   | false    |

--------------------------------------------------------------------------------

### type
Type: _enum_

**type** should be one of the following values:

| Value   | Type   |
| ------- | ------ |
| inline  | String |
| stacked | String |
