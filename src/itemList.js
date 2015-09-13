/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;
var UP_KEY = 38;
var DOWN_KEY = 40;

/**
 * A component to represent each item in the selected item list
 *
 * @type {*|Function}
 */
var SelectedItemComponent = React.createClass({
    /**
     * Function invoked when the user clicks on the x button of the item
     *
     * @param evt
     */
    handleRemove: function(evt) {
        evt.preventDefault();
        this.props.onRemove(this.props.label);
    },
    render: function() {
        return (
            <li>
                <span>{this.props.label}</span>
                <a href="#" className="fa fa-times" onClick={this.handleRemove}></a>
            </li>
        );
    }
});

/**
 * A component to represent the list of selected items
 *
 * @type {*|Function}
 */
var SelectedListComponent = React.createClass({
    /**
     * Function invoked when the user clicks on the x button of the item
     *
     * @param item
     */
    handleItemRemove: function(item) {
        this.props.onRemoveItem(item);
    },
    render: function() {
        // Traverse list of selected items and generate the DOM elements
        var items = [];
        if (this.props.items && typeof this.props.items == 'object' && this.props.items.length > 0) {
            items = this.props.items.map(function (item) {
                var itemKey = 'item' + item;
                return (
                    <SelectedItemComponent
                        key={itemKey}
                        label={item}
                        onRemove={this.handleItemRemove}/>
                );
            }, this);
        }
        // Define the list style
        var listStyleClass = (['common', 'tag'].indexOf(this.props.listStyle) == -1)
            ? 'selected-list common-style clearfix'
            : this.props.listStyle + '-style selected-list clearfix';

        // Display the list only if there are selected items
        if (items.length == 0) {
            listStyleClass += ' hide';
        }

        return (
            <ul className={listStyleClass}>
                {items}
            </ul>
        );
    }
});

/**
 * A component to represent each suggested item in the item list
 *
 * @type {*|Function}
 */
var SuggestedItemComponent = React.createClass({
    /**
     * Function invoked when the user selects a suggested item
     *
     * @param evt
     */
    handleSelect: function(evt) {
        evt.preventDefault();
        this.props.onSelect(this.props.label);
    },
    render: function() {
        var itemClass = '';
        if (this.props.isFocused) {
            itemClass = 'focused';
        }
        return (
            <li className={itemClass} onClick={this.handleSelect}>
                <span>{this.props.label}</span>
            </li>
        );
    }
});

/**
 * A component to represent the list of suggested items
 *
 * @type {*|Function}
 */
var SuggestedListComponent = React.createClass({
    /**
     * Function invoked when the user selects a suggested item
     *
     * @param item
     */
    handleSelectSuggestion: function(item) {
        this.props.onSelectItem(item);
    },
    render: function() {
        var suggestedItems = [];
        if (typeof this.props.items == 'object') {
            suggestedItems = this.props.items.map(function(item) {
                var itemKey = 'suggestedItem'+item;
                return (
                    <SuggestedItemComponent
                        isFocused={this.props.focusedItem==item}
                        key={itemKey}
                        onSelect={this.handleSelectSuggestion}
                        label={item} />
                );

            }, this);
        }

        // Decide if the suggestion list should be displayed
        var suggestionListClass = 'suggested-list clearfix';
        if (suggestedItems.length == 0) {
            suggestionListClass += ' hide';
        }

        return (
            <ul className={suggestionListClass}>{suggestedItems}</ul>
        );
    }
});

/**
 * A helper component to render items in a list based on user input
 */
var ItemListComponent = React.createClass({
    mixins: [Formsy.Mixin, ComponentMixin],

    /**
     * Helper function to determine if a variable is null or undefined
     * @param aVar
     * @returns {boolean}
     */
    isDefined: function(aVar) {
        return aVar !== null && typeof aVar !== 'undefined';
    },
    /**
     * Helper function that reset the error message displayed
     */
    resetError: function() {
        // There was an error, hide it since the user started typing again
        if (this.state.errorMsg && this.state.errorMsg != '') {
            this.setState({
                errorMsg: false
            })
        }
    },
    getDefaultProps: function() {
        return {
            emptyItemError: "You can't add an empty item",
            itemExistsError: "This item already exists",
            maxNumberOfitemsError: "You can't add more items in the list",
            listStyle: 'common',
            suggestedItems: null
        };
    },
    getInitialState: function() {
        return {
            // The selected items
            items: null,
            errorMsg: false,
            // Variables used when the auto-suggest mode is enabled. Every time the user
            // clicks on the up or down arrow to select a suggested options the following
            // variables are updated
            focusedSuggestedItemLabel: '',
            focusedSuggestedItemIndex: null,
            // The keyword used in the input box
            keyword: '',
            selectedListIsPristine: true
        };
    },
    /**
     * Adds a new item to the list of selected items
     *
     * @param inputField
     */
    addItem: function(inputField) {
        if (!inputField) {
            inputField = React.findDOMNode(this.refs.txtInput);
        }

        var newItem = inputField.value.trim(),
            newState = {
                errorMsg: false
            };

        // Suggestion mode is enabled and the user selected an item from the suggested list
        if (this.autoSuggestEnabled && this.state.focusedSuggestedItemIndex !== null && this.state.focusedSuggestedItemIndex >= 0) {
            newItem = this.filteredSuggestedItems[this.state.focusedSuggestedItemIndex];

            this.filteredSuggestedItems = [];
            newState = {
                focusedSuggestedItemLabel: '',
                focusedSuggestedItemIndex: null,
                keyword: ''
            }
        }
        // Suggestion mode is enabled but the user hasn't selected anything from the list
        else if (this.autoSuggestEnabled) {
            newState.errorMsg = this.props.selectSuggestionError;
        }

        // Empty item?
        if (newItem === '') {
            newState.errorMsg = this.props.emptyItemError;
        }
        // This item already exists, display an error message
        else if (this.items.indexOf(newItem) >= 0) {
            newState.errorMsg = this.props.itemExistsError;
        }
        // There is a quota in the maximum number of items allowed in the list
        else if (this.props.maxNumberOfItems && this.items.length >= this.props.maxNumberOfItems) {
            newState.errorMsg = this.props.maxNumberOfitemsError;
        }
        // Valid item, push it at the top of the list
        else if (!newState.errorMsg) {
            // Copy the existing items in a var and push the new item at the top
            this.items.unshift(newItem);
        }

        // Indicate that the selected list has been altered
        newState.selectedListIsPristine = false;

        // Set the new state
        this.setState(newState, function() {
            this.setValue(this.items)
            this.props.onChange(this.props.name, this.items);
        }.bind(this));

        // Empty the value on the input field
        inputField.value = '';
    },
    /**
     * Function invoked when the user writes on the input field, gets a list of suggested
     * items and then clicks the down arrow to focus on the next suggestion
     *
     * NOTE: This function is invoked only when the suggestion mode is enabled
     * @see onKeyUp()
     */
    focusOnNextItem: function() {
        var newIndex, newLabel;
        // No suggested item is focused
        if (this.state.focusedSuggestedItemIndex === null) {
            newIndex = 0;
        }
        // The last suggested item is focused
        else if (this.state.focusedSuggestedItemIndex == (this.filteredSuggestedItems.length - 1)) {
            return;
        }
        else {
            newIndex = this.state.focusedSuggestedItemIndex + 1;
        }
        newLabel = this.filteredSuggestedItems[newIndex];

        this.setState({
            focusedSuggestedItemLabel: newLabel,
            focusedSuggestedItemIndex: newIndex
        });
    },
    /**
     * Function invoked when the user writes on the input field, gets a list of suggested
     * items and then clicks the up arrow to focus on the previous suggestion
     *
     * NOTE: This function is invoked only when the suggestion mode is enabled
     * @see onKeyUp()
     */
    focusOnPrevItem: function() {
        var newIndex, newLabel;
        // No suggested item is focused
        if (!this.state.focusedSuggestedItemIndex) {
            return;
        }
        // The first suggested item is focused
        else if (this.state.focusedSuggestedItemIndex == 0) {
            newIndex = null;
        }
        else {
            newIndex = this.state.focusedSuggestedItemIndex - 1;
        }
        newLabel = newIndex >= 0 ? this.filteredSuggestedItems[newIndex] : '';
        this.setState({
            focusedSuggestedItemLabel: newLabel,
            focusedSuggestedItemIndex: newIndex
        });
    },
    /**
     * Function invoked when the user clicks on the plus icon to add a new
     * item in the list
     *
     * @param evt
     */
    handleAddItem: function(evt) {
        evt.preventDefault();
        // Add a new item in the list
        if (!this.isElementDisabled()) {
            this.addItem();
        }
    },
    handleBlur: function(evt) {
        if (this.autoSuggestEnabled && !this.isDefined(this.state.focusedSuggestedItemIndex)) {
            console.log('on blur without suggestion....');
            this.setState({
                hideSuggestionList: true
            });
        }
        else {
            console.log('on blur with suggestion:', this.state.focusedSuggestedItemIndex, this.state.focusedSuggestedItemLabel);
        }
    },
    handleFocus: function(evt) {
        if (this.autoSuggestEnabled && !this.isDefined(this.state.focusedSuggestedItemIndex)) {
            console.log('on focus...');
            this.setState({
                hideSuggestionList: false
            })
        }
        else {
            console.log('on focus:', this.state.focusedSuggestedItemIndex, this.state.focusedSuggestedItemLabel);
        }
    },
    /**
     * Monitor key down events. The handler mainly added to provent form submission
     * when the user clicks enter while focusing on any form field
     *
     * @param evt
     */
    handleKeyDown: function(evt) {
        if (evt.which == ENTER_KEY) {
            evt.preventDefault();
        }
    },
    /**
     * Monitor key up events. If an enter is clicked add a new item
     * in the list, but apply basic sanity checks including addition of:
     * - empty items (e.g only whitespaces)
     * - existing items
     *
     * @param evt
     */
    handleKeyUp: function(evt) {
        evt.preventDefault();

        // Reset error messages, if any
        this.resetError();

        var value = evt.target.value.trim();
        // Add the new item to the list
        if (evt.which === ENTER_KEY) {
            this.addItem(evt.target);
        }
        // Navigate to the next item
        else if (evt.which === DOWN_KEY && this.autoSuggestEnabled) {
            this.focusOnNextItem();
        }
        // Navigate to the previous item
        else if (evt.which === UP_KEY && this.autoSuggestEnabled) {
            this.focusOnPrevItem();
        }
        // Set the new keyword
        else {
            var newState = {
                keyword: value
            };
            if (this.autoSuggestEnabled) {
                newState.focusedSuggestedItemIndex = null;
                newState.focusedSuggestedItemLabel = '';
            }
            this.setState(newState);
        }
    },
    /**
     * Function invoked when the user removes an item from the list
     *
     * @param item
     */
    handleRemoveItem: function(item) {
        // Reset any error messages
        this.resetError();

        // Find the item in the list
        var itemPos = this.items.indexOf(item);
        if (itemPos >= 0) {
            var items = this.items;
            items.splice(itemPos, 1);

            // Refresh the list
            this.items = items;

            // Indicate that the selected list has been altered
            this.setState({
                selectedListIsPristine: false
            });
            this.setValue(this.items);
            this.props.onChange(this.props.name, this.items);
        }
    },
    /**
     * Function invoked when the user selects an item from the list of suggestions
     *
     * @param item
     */
    handleSelectSuggestion: function(item) {
        var newIndex = this.filteredSuggestedItems.indexOf(item),
            newLabel = item;
        this.setState({
            focusedSuggestedItemLabel: newLabel,
            focusedSuggestedItemIndex: newIndex
        }, this.addItem);
    },
    /**
     * Check if the element is disabled
     * @returns {*}
     */
    isElementDisabled: function() {
        return this.isFormDisabled() || this.props.disabled;
    },
    renderElement: function() {

        //var itemError = this.state.errorMsg;
        var itemError = this.state.errorMsg,
            focusedSuggestedItemLabel = this.state.focusedSuggestedItemLabel,
            focusedSuggestedItemIndex = this.state.focusedSuggestedItemIndex,
            keyword = this.state.keyword;

        // Initialize the items with the default value as long as the field list of items is pristine
        if (this.state.selectedListIsPristine) {
            this.items = this.getValue() || [];
        }

        // Check if auto-suggest mode is enabled
        this.autoSuggestEnabled = this.props.suggestedItems && this.props.suggestedItems.length >= 0;

        // Traverse list of suggested items and filter if a keyword is available
        var maxNumberOfSuggestions = 8,
            curNumberOfSuggestions = 0;
        this.filteredSuggestedItems = [];
        // note: you need the first condition because null is actually an object
        if (this.props.suggestedItems && typeof this.props.suggestedItems == 'object' && !this.state.hideSuggestionList) {
            this.props.suggestedItems.map(function(item) {
                var patt = new RegExp(keyword, "i");
                if (keyword !== '' && patt.test(item) && curNumberOfSuggestions < maxNumberOfSuggestions) {
                    curNumberOfSuggestions++;
                    this.filteredSuggestedItems.push(item);
                    return item;
                }
            }, this);
        }

        // Decide if an error should be displayed
        var errorClassName = 'error';
        if (itemError == '') {
            errorClassName += ' hide';
        }

        // If auto-suggest mode is enabled, display an ellipsis icon instead of the plus icon
        var inputAddon;
        if (this.autoSuggestEnabled) {
            inputAddon = (<i className="fa fa-ellipsis-h"></i>);
        }
        else {
            inputAddon = (<a href="#" className="fa fa-plus add-item-btn" onClick={this.handleAddItem}></a>);
        }

        return (
            <div className="itemlist-component">
                <div className="input-group">
                    <input type="text" className="form-control" ref="txtInput" autoComplete="off"
                           disabled={this.isElementDisabled()}
                           onKeyDown={this.handleKeyDown}
                           onKeyUp={this.handleKeyUp} />

                    <SuggestedListComponent
                        focusedItem={focusedSuggestedItemLabel}
                        items={this.filteredSuggestedItems}
                        onSelectItem={this.handleSelectSuggestion}/>

                    <span className="input-group-addon">
                        {inputAddon}
                    </span>
                </div>
                <div className={errorClassName}>{itemError}</div>

                <SelectedListComponent
                    items={this.items}
                    listStyle={this.props.listStyle}
                    onRemoveItem={this.handleRemoveItem} />


            </div>
        )
    },
    render: function() {

        if (this.getLayout() === 'elementOnly' || this.props.type === 'hidden') {
            return (
                <div>{this.renderElement()}</div>
            );
        }

        return (
            <Row
                label={this.props.label}
                required={this.isRequired()}
                hasErrors={this.showErrors()}
                layout={this.getLayout()}
                >
                {this.renderElement()}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }
});

module.exports = ItemListComponent;