# Common Component Props

## Props
| Name                                             | Type           | Default | Required | Description |
| ------------------------------------------------ | -------------- | ------- | -------- | ----------- |
| rowClassName                                     | styleClassName |         | false    |             |
| labelClassName                                   | styleClassName |         | false    |             |
| elementWrapperClassName                          | styleClassName |         | false    |             |
| onChange                                         | func           |         | false    |             |
| onSetValue                                       | func           |         | false    |             |
| isPristine                                       | func           |         | true     |             |
| [errorMessages](#markdown-header-error-messages) | arrayOf        |         | false    |             |
| help                                             | string         |         | false    |             |
| label                                            | node           |         | false    |             |
| [layout](#markdown-header-layout)                | enum           |         | false    |             |
| showErrors                                       | bool           | false   | false    |             |

## Complex Props

### errorMessages
Type: _arrayOf_

**errorMessages** is an array of the following type:
node
--------------------------------------------------------------------------------

### layout
Type: _enum_

**layout** should be one of the following values:

| Value       | Type   |
| ----------- | ------ |
| horizontal  | String |
| vertical    | String |
| elementOnly | String |
