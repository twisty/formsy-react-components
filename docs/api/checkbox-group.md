# CheckboxGroup

## Props
| Name                    | Type                                                                | Default | Required | Description |
| ----------------------- | ------------------------------------------------------------------- | ------- | -------- | ----------- |
| options                 | { disabled: boolean; value: string; label: string; key: string; }[] |         | true     |             |
| required                | boolean                                                             | false   | true     |             |
| value                   | string[]                                                            |         | true     |             |
| type                    | "inline" | "stacked"                                                |         | true     |             |
| id                      | string                                                              |         | true     |             |
| rowClassName            | ClassValue                                                          |         | true     |             |
| labelClassName          | ClassValue                                                          |         | true     |             |
| elementWrapperClassName | ClassValue                                                          |         | true     |             |
| name                    | string                                                              |         | true     |             |
| changeCallback          | (name: string, value: any) => void                                  |         | true     |             |
| onSetValue              | (value: any) => void                                                |         | true     |             |
| isPristine              | () => boolean                                                       |         | true     |             |
| errorMessages           | ReactNode[]                                                         |         | true     |             |
| help                    | string                                                              |         | true     |             |
| label                   | ReactNode                                                           |         | true     |             |
| layout                  | LayoutType                                                          |         | true     |             |
| showErrors              | boolean                                                             | false   | true     |             |
| disabled                | boolean                                                             | false   | false    |             |
