import CheckboxComponent from './components/checkbox';
import CheckboxGroupComponent from './components/checkbox-group';
import InputComponent from './components/input';
import FileComponent from './components/input-file';
import RadioGroupComponent from './components/radio-group';
import SelectComponent from './components/select';
import TextareaComponent from './components/textarea';
import Icon from './components/icon';
import Form from './form';
import Row from './components/row';
import OptionsProvider from './hoc/options-provider';
import FormsyReactComponent from './hoc/component';

export const Checkbox = FormsyReactComponent(CheckboxComponent);
export const CheckboxGroup = FormsyReactComponent(CheckboxGroupComponent);
export const Input = FormsyReactComponent(InputComponent);
export const File = FormsyReactComponent(FileComponent);
export const RadioGroup = FormsyReactComponent(RadioGroupComponent);
export const Select = FormsyReactComponent(SelectComponent);
export const Textarea = FormsyReactComponent(TextareaComponent);
export {
    Icon,
    Form,
    OptionsProvider,
    Row
};
