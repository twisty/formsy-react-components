import Checkbox from './components/checkbox';
import CheckboxGroup from './components/checkbox-group';
import Icon from './components/icon';
import Input from './components/input';
import File from './components/input-file';
import Form from './form';
import RadioGroup from './components/radio-group';
import Row from './components/row';
import Select from './components/select';
import Textarea from './components/textarea';
import OptionsProvider from './hoc/options-provider';
import FormsyReactComponent from './hoc/component';

const FRC = {
    Checkbox:           FormsyReactComponent(Checkbox),
    CheckboxGroup:      FormsyReactComponent(CheckboxGroup),
    Input:              FormsyReactComponent(Input),
    File:               FormsyReactComponent(File),
    RadioGroup:         FormsyReactComponent(RadioGroup),
    Select:             FormsyReactComponent(Select),
    Textarea:           FormsyReactComponent(Textarea),
    Form:               Form,
    Icon:               Icon,
    OptionsProvider:    OptionsProvider,
    Row:                Row
};

export default FRC;
