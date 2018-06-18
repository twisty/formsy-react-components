# Common Component Props

## Props
| Name                                             | Type    | Default      | Required | Description |
| ------------------------------------------------ | ------- | ------------ | -------- | ----------- |
| onChange                                         | func    | () => {}     | false    |             |
| onSetValue                                       | func    | () => {}     | false    |             |
| isPristine                                       | func    |              | true     |             |
| [errorMessages](#markdown-header-error-messages) | arrayOf | []           | false    |             |
| help                                             | string  | null         | false    |             |
| label                                            | node    | null         | false    |             |
| [layout](#markdown-header-layout)                | enum    | 'horizontal' | false    |             |
| showErrors                                       | bool    | true         | false    |             |

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
