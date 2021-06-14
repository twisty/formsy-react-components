# RadioGroup

## Props
| Name                    | Type                                          | Default                      | Required | Description |
| ----------------------- | --------------------------------------------- | ---------------------------- | -------- | ----------- |
| disabled                | boolean                                       | false                        | false    |             |
| options                 | Option[]                                      | [] as Option[]               | false    |             |
| required                | boolean                                       | [object Object]              | false    |             |
| type                    | RadioLayoutType                               | 'stacked' as RadioLayoutType | false    |             |
| value                   | string                                        | [object Object]              | false    |             |
| changeCallback          | (name: string, value: ComponentValue) => void |                              | true     |             |
| elementWrapperClassName | Argument                                      |                              | true     |             |
| errorMessages           | ReactNode[]                                   |                              | true     |             |
| help                    | string                                        |                              | true     |             |
| id                      | string                                        |                              | true     |             |
| isPristine              | boolean                                       | false                        | true     |             |
| label                   | ReactNode                                     |                              | true     |             |
| labelClassName          | Argument                                      |                              | true     |             |
| layout                  | LayoutType                                    |                              | true     |             |
| onSetValue              | (value: ComponentValue) => void               |                              | true     |             |
| rowClassName            | Argument                                      |                              | true     |             |
| showErrors              | boolean                                       | false                        | true     |             |
| name                    | string                                        |                              | true     |             |
