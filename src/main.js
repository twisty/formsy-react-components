import Checkbox from './components/checkbox';
import CheckboxGroup from './components/checkbox-group';
import Icon from './components/icon';
import Input from './components/input';
import File from './components/input-file';
import Form from './components/form';
import RadioGroup from './components/radio-group';
import Row from './components/row';
import Select from './components/select';
import Textarea from './components/textarea';
import ComponentMixin from './mixins/component';
import ParentContextMixin from './mixins/parent-context';
import { FormsyReactComponent } from './hoc/component';

const FRC = {
    Checkbox:           FormsyReactComponent(Checkbox),
    CheckboxGroup:      FormsyReactComponent(CheckboxGroup),
    Input:              FormsyReactComponent(Input),
    File:               FormsyReactComponent(File),
    RadioGroup:         FormsyReactComponent(RadioGroup),
    Select:             FormsyReactComponent(Select),
    Textarea:           FormsyReactComponent(Textarea),
    Icon:               Icon,
    Form:               Form,
    Row:                Row,
    ComponentMixin:     ComponentMixin,
    ParentContextMixin: ParentContextMixin
};

export default FRC;
