# Common Component Props

## Props
| Name                              | Type   | Default  | Required | Description |
| --------------------------------- | ------ | -------- | -------- | ----------- |
| errorMessages                     | Array  |          | false    |             |
| help                              | String |          | false    |             |
| label                             | String |          | false    |             |
| [layout](#markdown-header-layout) | Enum   |          | false    |             |
| showErrors                        | Bool   | false    | false    |             |
| onChange                          | Func   | () => {} | false    |             |
| onSetValue                        | Func   | () => {} | false    |             |

## Complex Props

### layout
Type: _Enum_

**layout** should be one of the following values:

* 'horizontal'
* 'vertical'
* 'elementOnly'
