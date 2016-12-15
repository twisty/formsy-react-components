import React from 'react';
import Formsy from 'formsy-react';
import ParentContextMixin from './mixins/parent-context';

const Form = React.createClass({

    mixins: [ParentContextMixin],

    propTypes: {
        children: React.PropTypes.node
    },

    render() {
        let formsyProps = Object.assign({}, this.props);
        delete formsyProps.layout;
        delete formsyProps.validatePristine;
        return (
            <Formsy.Form
                className={this.getLayoutClassName()}
                {...formsyProps}
                ref="formsy"
            >
                {this.props.children}
            </Formsy.Form>
        );
    }

});

export default Form;
