import CheckboxComponent from './components/checkbox';
import CheckboxGroupComponent from './components/checkbox-group';
import InputComponent from './components/input';
import FileComponent from './components/input-file';
import RadioGroupComponent from './components/radio-group';
import SelectComponent from './components/select';
import TextareaComponent from './components/textarea';
import Form from './form';
import FormsyReactComponent from './hoc/component';
import FrcContext from './context/frc';
import Row from './components/row';

const Checkbox = FormsyReactComponent(CheckboxComponent);
const CheckboxGroup = FormsyReactComponent(CheckboxGroupComponent);
const Input = FormsyReactComponent(InputComponent);
const File = FormsyReactComponent(FileComponent);
const RadioGroup = FormsyReactComponent(RadioGroupComponent);
const Select = FormsyReactComponent(SelectComponent);
const Textarea = FormsyReactComponent(TextareaComponent);

export {
  Form,
  FrcContext,
  Row,
  Checkbox,
  CheckboxGroup,
  Input,
  File,
  RadioGroup,
  Select,
  Textarea,
};
