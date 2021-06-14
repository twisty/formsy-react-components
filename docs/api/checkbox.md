# Checkbox

## Props
| Name                    | Type                                          | Default                             | Required | Description |
| ----------------------- | --------------------------------------------- | ----------------------------------- | -------- | ----------- |
| disabled                | boolean                                       | false                               | false    |             |
| value                   | boolean                                       | [object Object]                     | false    |             |
| valueLabel              | string                                        | [object Object]                     | false    |             |
| elementRef              | RefObject<HTMLInputElement>                   | React.createRef<HTMLInputElement>() | false    |             |
| changeCallback          | (name: string, value: ComponentValue) => void |                                     | true     |             |
| elementWrapperClassName | Argument                                      |                                     | true     |             |
| errorMessages           | ReactNode[]                                   |                                     | true     |             |
| help                    | string                                        |                                     | true     |             |
| id                      | string                                        |                                     | true     |             |
| isPristine              | boolean                                       | false                               | true     |             |
| label                   | ReactNode                                     |                                     | true     |             |
| labelClassName          | Argument                                      |                                     | true     |             |
| layout                  | LayoutType                                    |                                     | true     |             |
| onSetValue              | (value: ComponentValue) => void               |                                     | true     |             |
| rowClassName            | Argument                                      |                                     | true     |             |
| showErrors              | boolean                                       | false                               | true     |             |
| name                    | string                                        |                                     | true     |             |
