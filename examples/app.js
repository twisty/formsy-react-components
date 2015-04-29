'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var Row = require('../src/row');
var Textarea = require('../src/textarea');
var RadioGroup = require('../src/radio-group');

var Examples = React.createClass({

    getInitialState: function() {
        return {
            layout: 'horizontal'
        }
    },

    resetForm: function () {
        this.refs.form.reset();
    },

    changeLayout: function(layout) {
        this.setState({layout: layout});
    },

    render: function() {

        var radioOptions = [
            {value: 'a', label: 'Option A'},
            {value: 'b', label: 'Option B'},
            {value: 'c', label: 'Option C'}
        ];

        var formClassName = '';
        if (this.state.layout === 'horizontal') {
            formClassName = 'form-horizontal';
        }

        return (
            <div className="row">
                <div className="page-header">
                    <h1>Examples</h1>
                </div>
                <button className="btn btn-default btn-sm" onClick={this.changeLayout.bind(this, 'horizontal')}>Horizontal</button>
                {' '}
                <button className="btn btn-default btn-sm" onClick={this.changeLayout.bind(this, 'vertical')}>Vertical</button>
                <div className="page-header">
                    <h2>Form layout: <code>{this.state.layout}</code></h2>
                </div>
                <Formsy.Form className={formClassName} ref="form">
                    <Textarea
                        name="txtArea"
                        label="Textarea"
                        layout={this.state.layout}
                        placeholder="This field requires 10 characters."
                        help="This is some help text for the textarea."
                        validations="minLength:10"
                        validationErrors={{
                            minLength: 'Please provide at least 10 characters.'
                        }}
                    />
                    <RadioGroup
                        name="radioGrp1"
                        type="radio-inline"
                        label="Radio group (inline)"
                        layout={this.state.layout}
                        help="This is a required radio group."
                        options={radioOptions}
                        required
                    />
                    <RadioGroup
                        name="radioGrp2"
                        value="b"
                        type="radio"
                        label="Radio group (stacked)"
                        layout={this.state.layout}
                        help="Here, “Option B” is initially selected."
                        options={radioOptions}
                    />
                    <Row layout={this.state.layout}>
                        <input className="btn btn-default" onClick={this.resetForm} type="reset" defaultValue="Reset" />
                        {' '}
                        <input className="btn btn-primary" type="submit" defaultValue="Submit" />
                    </Row>
                </Formsy.Form>
            </div>
        );
    }
});

React.render(
    <Examples />,
    document.getElementById('examples')
);
