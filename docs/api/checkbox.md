# Checkbox

## Props
| Name                    | Type                               | Default         | Required | Description |
| ----------------------- | ---------------------------------- | --------------- | -------- | ----------- |
| value                   | boolean                            | false           | true     |             |
| valueLabel              | string                             | [object Object] | true     |             |
| id                      | string                             |                 | true     |             |
| rowClassName            | ClassValue                         |                 | true     |             |
| labelClassName          | ClassValue                         |                 | true     |             |
| elementWrapperClassName | ClassValue                         |                 | true     |             |
| name                    | string                             |                 | true     |             |
| changeCallback          | (name: string, value: any) => void |                 | true     |             |
| onSetValue              | (value: any) => void               |                 | true     |             |
| isPristine              | () => boolean                      |                 | true     |             |
| errorMessages           | ReactNode[]                        |                 | true     |             |
| help                    | string                             |                 | true     |             |
| label                   | ReactNode                          |                 | true     |             |
| layout                  | LayoutType                         |                 | true     |             |
| showErrors              | boolean                            | false           | true     |             |
| disabled                | boolean                            | false           | false    |             |
