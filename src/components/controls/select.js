import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ControlCommon from './control-common';

class SelectControl extends Component {

    renderOption = (item, key) => {
        let optionProps = Object.assign({}, item);
        delete optionProps.label;
        delete optionProps.group;
        return (
            <option key={key} {...optionProps}>{item.label}</option>
        )
    }

    initElementRef = (element) => {
        this.element = element;
    }

    render() {

        let options = this.props.options;

        let groups = options.filter((item) => {
            return item.group;
        }).map(function (item) {
            return item.group;
        });
        // Get the unique items in group.
        groups = [...new Set(groups)];

        let optionNodes = [];

        if (groups.length == 0) {
            optionNodes = options.map((item, index) => {
                return this.renderOption(item, index);
            });
        } else {
            // For items without groups.
            let itemsWithoutGroup = options.filter((item) => {
                return !item.group;
            })

            itemsWithoutGroup.forEach((item, index) => {
                optionNodes.push(this.renderOption(item, 'no-group-' + index));
            });

            groups.forEach((group, groupIndex) => {

                let groupItems = options.filter((item) => {
                    return item.group === group;
                });

                let groupOptionNodes = groupItems.map((item, index) => {
                    return this.renderOption(item, groupIndex + '-' + index);
                });

                optionNodes.push(<optgroup label={group} key={groupIndex}>{groupOptionNodes}</optgroup>);
            });
        }

        let selectProps = Object.assign({}, this.props);
        delete selectProps.options;

        return (
            <select
                className="form-control"
                {...selectProps}
                ref={this.initElementRef}
            >
                {optionNodes}
            </select>
        );
    }
}

SelectControl.propTypes = {
    ...ControlCommon.propTypes,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
            group: PropTypes.string
        })
    ).isRequired,
    multiple: PropTypes.bool
}

export default SelectControl;
