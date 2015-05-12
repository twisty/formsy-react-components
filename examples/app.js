'use strict';

var React = require('react');

var Example = require('./example');

var Docs = React.createClass({

    render: function() {

        return (
            <div className="row">
                <div className="page-header">
                    <h1>Examples</h1>
                </div>
                <Example
                    title="Text input"
                    code={`
<Formsy.Form>
    <Input
        name="example"
        label="Text input"
    />
</Formsy.Form>
`}
                />
                <Example
                    title="Textarea"
                    code={`
<Formsy.Form>
    <Textarea name="example" />
</Formsy.Form>
`}
                />
            </div>
        );
    }
});

React.render(
    <Docs />,
    document.getElementById('docs')
);
