# Input

## Props
| Name                          | Type   | Default  | Required | Description |
| ----------------------------- | ------ | -------- | -------- | ----------- |
| blurDebounceInterval          | number | 0        | false    |             |
| changeDebounceInterval        | number | 500      | false    |             |
| [type](#markdown-header-type) | enum   | 'text'   | false    |             |
| updateOnBlur                  | bool   | true     | false    |             |
| updateOnChange                | bool   | true     | false    |             |
| value                         | string | ''       | false    |             |
| onBlur                        | func   | () => {} | false    |             |
| onKeyDown                     | func   | () => {} | false    |             |

## Complex Props

### type
Type: _enum_

**type** should be one of the following values:

| Value          | Type   |
| -------------- | ------ |
| color          | String |
| date           | String |
| datetime       | String |
| datetime-local | String |
| email          | String |
| hidden         | String |
| month          | String |
| number         | String |
| password       | String |
| range          | String |
| search         | String |
| tel            | String |
| text           | String |
| time           | String |
| url            | String |
| week           | String |
