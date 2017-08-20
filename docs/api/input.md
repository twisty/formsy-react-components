# Input

## Props
| Name                          | Type   | Default                                   | Required | Description |
| ----------------------------- | ------ | ----------------------------------------- | -------- | ----------- |
| debounce                      | Object | {<br>    blur: 0,<br>    change: 500<br>} | false    |             |
| [type](#markdown-header-type) | Enum   | 'text'                                    | false    |             |
| updateOn                      | String | 'blur change'                             | false    |             |
| value                         | String | ''                                        | false    |             |
| onBlur                        | Func   | () => {}                                  | false    |             |

## Complex Props

### type
Type: _Enum_

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
