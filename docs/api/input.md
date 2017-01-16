# Input

## Props
| Name                          | Type   | Default                          | Required | Description |
| ----------------------------- | ------ | -------------------------------- | -------- | ----------- |
| debounce                      | Object | {
    blur: 0,
    change: 500
} | false    |             |
| [type](#markdown-header-type) | Enum   | 'text'                           | false    |             |
| updateOn                      | String | 'blur change'                    | false    |             |
| value                         | String | ''                               | false    |             |
| onBlur                        | Func   | () => {}                         | false    |             |

## Complex Props

### type
Type: _Enum_

**type** should be one of the following values:

* 'color'
* 'date'
* 'datetime'
* 'datetime-local'
* 'email'
* 'hidden'
* 'month'
* 'number'
* 'password'
* 'range'
* 'search'
* 'tel'
* 'text'
* 'time'
* 'url'
* 'week'
