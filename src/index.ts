import {withFormsy} from 'formsy-react';
import CheckboxComponent from './components/checkbox';
import CheckboxGroupComponent from './components/checkbox-group';
import InputComponent from './components/input';
import FileComponent from './components/input-file';
import RadioGroupComponent from './components/radio-group';
import SelectComponent from './components/select';
import TextareaComponent from './components/textarea';
import Form from './form';
import FrcContext from './context/frc';
import Row from './components/row';
import withFRC from './hoc/component';

const Checkbox = withFormsy(withFRC(CheckboxComponent));
const CheckboxGroup = withFormsy(withFRC(CheckboxGroupComponent));
const Input = withFormsy(withFRC(InputComponent));
const File = withFormsy(withFRC(FileComponent));
const RadioGroup = withFormsy(withFRC(RadioGroupComponent));
const Select = withFormsy(withFRC(SelectComponent));
const Textarea = withFormsy(withFRC(TextareaComponent));

export {
  Form,
  FrcContext,
  Row,
  Checkbox,
  CheckboxGroup,
  File,
  Input,
  RadioGroup,
  Select,
  Textarea,
};
