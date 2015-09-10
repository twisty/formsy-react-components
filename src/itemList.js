var React = require('react/addons'),
    FormsyComponent = require('formsy-react-components');

var ESC_KEY = 27;
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
        var items = this.props.items.map(function(item) {
            var itemKey = 'item'+item;
            return (
                <SelectedItemComponent
                    key={itemKey}
                    label={item}
                    onRemove={this.handleItemRemove} />
            );
        }, this);

        // Define the list style
        var listStyleClass = (['common', 'tag'].indexOf(this.props.listStyle) == -1)
            ? 'selected-list common-style'
            : this.props.listStyle + '-style selected-list';

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
        console.log('on sug item select: ', this.props.label);
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
        console.log('on select', item);
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
        var suggestionListClass = 'suggested-list';
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
    getInitialState: function() {
        return {
            // The selected items
            items: [],
            errorMsg: false,
            // Variables used when the auto-suggest mode is enabled. Every time the user
            // clicks on the up or down arrow to select a suggested options the following
            // variables are updated
            focusedSuggestedItemLabel: '',
            focusedSuggestedItemIndex: null,
            hideSuggestionList: false,
            // The keyword used in the input box
            keyword: ''
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

        // The user selected an item from the suggested list
        if (this.autoSuggestEnabled && this.state.focusedSuggestedItemIndex !== null && this.state.focusedSuggestedItemIndex >= 0) {
            newItem = this.filteredSuggestedItems[this.state.focusedSuggestedItemIndex];

            this.filteredSuggestedItems = [];
            newState = {
                focusedSuggestedItemLabel: '',
                focusedSuggestedItemIndex: null,
                keyword: ''
            }
        }
        else if (this.autoSuggestEnabled) {
            newState.errorMsg = this.props.selectSuggestionError || "Choose one of the suggested items or change your keyword";
        }

        // Empty item?
        if (newItem === '') {
            newState.errorMsg = this.props.emptyItemError || "You can't add an empty item";
        }
        // This item already exists, display an error message
        else if (this.state.items.indexOf(newItem) >= 0) {
            newState.errorMsg = this.props.itemExistsError || "This item already exists";
        }
        // Valid item, push it at the top of the list
        else if (!newState.errorMsg) {
            // Copy the existing items in a var and push the new item at the top
            var newItems = this.state.items;
            newItems.unshift(newItem);
            newState.items = newItems;
            this.setState({
                items: newItems
            });
        }

        // Set the new state
        this.setState(newState);

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
        if (!this.isElementDisabled) {
            this.addItem();
        }
    },
    handleBlur: function(evt) {
        if (this.autoSuggestEnabled && this.focusedSuggestedItemIndex !== null) {
            this.setState({
                hideSuggestionList: true
            })
        }
    },
    handleFocus: function(evt) {
        if (this.autoSuggestEnabled && this.focusedSuggestedItemIndex !== null) {
            this.setState({
                hideSuggestionList: false
            })
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
        // There was an error, hide it since the user started typing again
        if (this.state.errorMsg != '') {
            this.setState({
                errorMsg: false
            })
        }

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
        // Find the item in the list
        var itemPos = this.state.items.indexOf(item);
        if (itemPos >= 0) {
            var items = this.state.items;
            items.splice(itemPos, 1);

            // Refresh the list
            this.setState({
                items: items
            });
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
        return /*this.isFormDisabled() ||*/ this.props.disabled;
    },
    render: function() {

        var itemError = this.state.errorMsg;

        // Check if auto-suggest mode is enabled
        this.autoSuggestEnabled = this.props.suggestedItems && this.props.suggestedItems.length >= 0;

        // Traverse list of suggested items and filter if a keyword is available
        var maxNumberOfSuggestions = 8,
            curNumberOfSuggestions = 0;
        this.filteredSuggestedItems = [];
        // note: you need the first condition because null is actually an object
        if (this.props.suggestedItems && typeof this.props.suggestedItems == 'object' && !this.state.hideSuggestionList) {
            this.props.suggestedItems.map(function(item) {
                var patt = new RegExp(this.state.keyword, "i");
                if (this.state.keyword !== '' && patt.test(item) && curNumberOfSuggestions < maxNumberOfSuggestions) {
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
                    <input type="text" className="form-control" ref="txtInput"
                           disabled={this.isElementDisabled()}
                           onKeyUp={this.handleKeyUp} />

                    <SuggestedListComponent
                        focusedItem={this.state.focusedSuggestedItemLabel}
                        items={this.filteredSuggestedItems}
                        onSelectItem={this.handleSelectSuggestion}/>

                    <span className="input-group-addon">
                        {inputAddon}
                    </span>
                </div>
                <div className={errorClassName}>{itemError}</div>

                <SelectedListComponent
                    items={this.state.items}
                    listStyle={this.props.listStyle}
                    onRemoveItem={this.handleRemoveItem} />

                {this.props.storageInput}
            </div>
        )
    }
});

module.exports = ItemListComponent;