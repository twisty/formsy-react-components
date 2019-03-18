import CheckboxComponent from './components/checkbox';
import CheckboxGroupComponent from './components/checkbox-group';
import InputComponent from './components/input';
import FileComponent from './components/input-file';
import RadioGroupComponent from './components/radio-group';
import SelectComponent from './components/select';
import TextareaComponent from './components/textarea';
import Form from './form';
import Row from './components/row';
import OptionsProvider from './hoc/options-provider';
import FormsyReactComponent from './hoc/component';

const Checkbox = FormsyReactComponent(CheckboxComponent);
const CheckboxGroup = FormsyReactComponent(CheckboxGroupComponent);
const Input = FormsyReactComponent(InputComponent);
const File = FormsyReactComponent(FileComponent);
const RadioGroup = FormsyReactComponent(RadioGroupComponent);
const Select = FormsyReactComponent(SelectComponent);
const Textarea = FormsyReactComponent(TextareaComponent);

export {
  Form,
  OptionsProvider,
  Row,
  Checkbox,
  CheckboxGroup,
  Input,
  File,
  RadioGroup,
  Select,
  Textarea,
};
