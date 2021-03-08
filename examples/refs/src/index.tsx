/* eslint-env node, browser */

import * as React from 'react';
import {render} from 'react-dom';

import {
  Form,
  Input,
  File,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Select,
  Textarea,
} from 'formsy-react-components';

const logRef = <T extends unknown>(ref: React.RefObject<T>): void => {
  const {current} = ref;
  if (current !== null) {
    // eslint-disable-next-line no-console
    console.info('logRef', current);
  }
};

class App extends React.Component {
  public frcFormRef = React.createRef<Form>();
  public inputRef = React.createRef<HTMLInputElement>();
  public fileRef = React.createRef<HTMLInputElement>();
  //public radiosRef = React.createRef<RadioGroup>();
  public checkboxRef = React.createRef<HTMLInputElement>();
  //public checkboxesRef = React.createRef<CheckboxGroup>();
  public selectRef = React.createRef<HTMLSelectElement>();
  public textareaRef = React.createRef<HTMLTextAreaElement>();

  public componentDidMount(): void {
    if (this.frcFormRef.current !== null) {
      // eslint-disable-next-line no-console
      console.info(this.frcFormRef.current.formsyForm);
    }
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
    logRef(this.inputRef);
    logRef(this.fileRef);
    //logRef(this.radiosRef);
    logRef(this.checkboxRef);
    //logRef(this.checkboxesRef);
    logRef(this.selectRef);
    logRef(this.textareaRef);
  }

  public render(): JSX.Element {
    const multiOptions = [
      {label: 'Option 1', value: 'one'},
      {label: 'Option 2', value: 'two'},
      {label: 'Option 3', value: 'three'},
    ];

    return (
      <div>
        <h1>
          <code>refs</code> Example
        </h1>
        <p>
          The first input is initially focussed by accessing the form control
          via <code>refs</code>.
        </p>
        <p>
          Check the browser console for the form control elements that are
          exposed as refs.
        </p>
        <Form ref={this.frcFormRef}>
          <Input label="Text" name="input" elementRef={this.inputRef} />
          <File label="File picker" name="file" elementRef={this.fileRef} />
          <RadioGroup
            label="Radio buttons"
            name="radios"
            options={multiOptions}
          />
          <Checkbox
            label="Single checkbox"
            valueLabel="One option"
            name="checkbox"
            elementRef={this.checkboxRef}
          />
          <CheckboxGroup
            label="Checkbox group"
            name="checkboxes"
            options={multiOptions}
          />
          <Select
            label="Select"
            name="select"
            options={multiOptions}
            elementRef={this.selectRef}
          />
          <Textarea
            label="Textarea"
            name="textarea"
            elementRef={this.textareaRef}
          />
        </Form>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
