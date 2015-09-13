//A6XQD6gtRl2UPSs4abjb3z

/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');
var Icon = require('./icon');

/**
 * A component to represent each previewed item in the preview list
 *
 * @type {*|Function}
 */
var PreviewItemComponent = React.createClass({
    getInitialState: function() {
        return {
            removingItem: false
        };
    },
    /**
     * Function invoked when the user clicks on the x button of the item
     *
     * @param evt
     */
    handleRemove: function(evt) {
        evt.preventDefault();
        this.setState({
            removingItem: true
        });

        filepicker.remove(this.props.blob, function() {
            this.props.onRemove(this.props.blob);
        }.bind(this));
    },
    render: function() {
        var blob = this.props.blob;
        var rmBtnClass = 'fa fa-times-circle-o rm-btn',
            loadingIconClass = 'fa fa-spinner fa-pulse loading-icon';
        if (this.state.removingItem) {
            rmBtnClass += ' hide';
        }
        else {
            loadingIconClass += ' hide';
        }
        return (
            <li>
                <div className="img-container">
                    <img className="img-responsive" src={blob.url} title={blob.filename} />
                    <div className="tint"></div>
                </div>
                <a href="#" className={rmBtnClass} onClick={this.handleRemove}></a>
                <i href="#" className={loadingIconClass}></i>
                <a href={blob.url} target="_blank" className="crop" title={blob.filename}>{blob.filename}</a>
            </li>
        );
    }
});

/**
 * A component to list the resources uploaded via filepicker.
 *
 * @type {*|Function}
 */
var PreviewListComponent = React.createClass({
    /**
     * Function invoked when the user clicks on the x button of the item
     *
     * @param item
     */
    handleItemRemove: function(blob) {
        this.props.onRemoveItem(blob);
    },
    render: function() {
        // Traverse list of selected items and generate the DOM elements
        var items = [];
        if (this.props.items && typeof this.props.items == 'object' && this.props.items.length > 0) {
            items = this.props.items.map(function (item) {
                var urlParts = item.url.split('/'),
                    itemKey = [
                    'preview',
                    urlParts[urlParts.length - 1].replace('-', '').replace('_', '').replace('.', '')
                ].join('-');
                return (
                    <PreviewItemComponent
                        key={itemKey}
                        blob={item}
                        onRemove={this.handleItemRemove}/>
                );
            }, this);
        }
        // Define the list style
        var listClass = "preview-list clearfix";
        // Display the list only if there are selected items
        if (items.length == 0) {
            listClass += ' hide';
        }

        return (
            <ul className={listClass}>
                {items}
            </ul>
        );
    }
});

var Uploader = React.createClass({

    // -------------------------------
    // Filepicker functions
    // -------------------------------

    initFilepicker: function(apiKey) {
        filepicker.setKey(apiKey);
    },
    uploadFile: function() {
        var pickerOpts = {
            maxSize: 8 * 1024 * 1024,
            mimetype: 'image/*'
        };
        if (this.props.maxItems && this.props.maxItems > 1) {
            pickerOpts.multiple = true;
            pickerOpts.maxFiles = this.props.maxItems;
        }
        var storeOpts = {
            location: 'S3',
            path: this.props.s3Dir + '/'
        };

        if (this.props.env == 'sandbox') {
            filepicker.pickMultiple(pickerOpts,
                function(blobs) {
                    blobs.forEach(function(blob) {
                        this.items.push(blob);
                    }.bind(this));
                    this.setState({
                        isPristine: false
                    });
                }.bind(this),
                function(error) {
                    console.error("[UploadComponent Error] ", error);
                }.bind(this)
            );
        }
        else if (this.props.env == 'production') {
            filepicker.pickAndStore(pickerOpts, storeOpts,
                function(blobs) {
                    blobs.forEach(function(blob) {
                        this.items.push(blob);
                    }.bind(this));
                    this.setState({
                        isPristine: false
                    });
                }.bind(this),
                function(error) {
                    console.error("[UploadComponent Error] ", error);
                }.bind(this)
            );
        }
    },

    // -------------------------------
    // Component functions
    // -------------------------------

    mixins: [Formsy.Mixin, ComponentMixin],

    getInitialState: function() {
        return {
            isPristine: true
        };
    },
    getDefaultProps: function() {
        return {
            env: 'sandbox'
        };
    },
    isDisabled: function() {
        return this.isFormDisabled() || this.props.disabled;
    },
    changeValue: function(event) {
        var value = event.currentTarget.value;
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },
    componentDidMount: function() {
        if (this.props.env == 'production' && !this.props.s3Dir) {
            throw new Error("[FilePicker Error] Provide a S3 folder name");
        }
        // Initialize filepicker
        this.initFilepicker(this.props.apiKey);
    },
    handleRemoveItem: function(blob) {
        this.items.forEach(function(item, index) {
            if (item.url == blob.url) {
                var items = this.items;
                items.splice(index, 1);

                // Refresh the list
                this.items = items;

                this.setState({
                    isPristine: false
                });
                return false;
            }
        }.bind(this));
    },
    handleUploadItem: function(evt) {
        evt.preventDefault();
        if (!this.isDisabled()) {
            this.uploadFile();
        }
    },
    renderElement: function() {

        // Initialize the items with the default value as long as the field list of items is pristine
        if (this.state.isPristine) {
            this.items = this.getValue() || [];
        }

        var uploaderComponentClass = 'uploader-component clearfix',
            uploadBtnClass = 'upload-btn';
        if (this.props.uploadBtnType == 'compact') {
            uploaderComponentClass += ' with-small-uploader-btn';
        }
        if (this.isDisabled()) {
            uploaderComponentClass += ' disabled';
        }
        if (this.items && this.props.maxItems && this.items.length >= this.props.maxItems) {
            uploadBtnClass += ' hide';
        }
        var uploadText = this.isDisabled()
            ? 'File upload is disabled'
            : 'Click and browse to attach your files here';
        return (
            <div className={uploaderComponentClass}>
                <a
                    className={uploadBtnClass}
                    id={this.getId()}
                    label={null}
                    onClick={this.handleUploadItem}>
                    <i className="fa fa-cloud-upload"></i>
                    <p>{uploadText}</p>
                </a>
                <PreviewListComponent
                    items={this.items}
                    onRemoveItem={this.handleRemoveItem} />
            </div>
        );
    },
    render: function() {
        var element = this.renderElement();

        if (this.getLayout() === 'elementOnly' || this.props.type === 'hidden') {
            return element;
        }

        var warningIcon = '';
        if (this.showErrors()) {
            warningIcon = (
                <Icon symbol="remove" className="form-control-feedback" />
            );
        }

        return (
            <Row
                label={this.props.label}
                required={this.isRequired()}
                hasErrors={this.showErrors()}
                layout={this.getLayout()}
                htmlFor={this.getId()}
                >
                {element}
                {warningIcon}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }
});

module.exports = Uploader;
