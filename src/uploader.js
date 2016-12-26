/*jshint node:true */

'use strict';

var React = require('react');
var Formsy = require('formsy-react');
var ComponentMixin = require('./mixins/component');
var Row = require('./row');

// Remove item error codes
var ERR_REMOVE_404 = 171;

// Working environments
var ENV_PRODUCTION = 'production';
var ENV_SANDBOX = 'sandbox';
// Supported mimetypes
var MIME_TYPES = [
    // All images
    "image/*",
    // Audio
    "audio/mpeg",       // mpga mp2 mp2a mp3 m2a m3a
    "audio/x-aac",      // aac
    "audio/x-flac",     // flac
    "video/x-flv",      // flv
    "audio/x-ms-wma",   // wma
    "audio/x-wav",      // wav

    // Video
    "video/3gpp",       // 3gp
    "video/3gpp2",      // 3g
    "video/mp4",        // mp4 mp4v mpg4
    "audio/mpeg",       // mpga mp2 mp2a mp3 m2a m3a
    "video/mpeg",       // mpeg mpg mpe m1v m2v
    "video/quicktime",  // qt mov
    "video/x-m4v",      // m4v
    "video/x-msvideo",  // avi
    "video/x-ms-wmv",   // wmv

    // Office
    "application/pdf",                  // pdf
    "application/msword",               // doc dot
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // *.docx
    "application/vnd.oasis.opendocument.text", // odt
    "application/epub+zip",             // epub
    "application/vnd.ms-excel",         // *.xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // *.xlsx
    "application/vnd.oasis.opendocument.spreadsheet", // ods
    "application/vnd.ms-powerpoint",    // *.ppt
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow", // ppsx
    "application/vnd.oasis.opendocument.presentation", // odp

    // Text files
    "text/plain",                       // txt text conf def list log in
    "text/html",                        // html htm
    "text/css",                         // css
    "text/csv",                         // csv

    // Compressed files
    "application/zip",                  // zip
    "application/x-gzip",               // gz gzip
    "application/x-mimearchive",        // mhtml mht webarchive
    "application/x-iwork-pages-sffpages", // pages
    "application/x-bzip",               // bz
    "application/x-rar-compressed",     // rar
    "application/x-rar",                // rar
    "application/x-7z-compressed"       // 7z
];
// Max upload size per item in MB
var UPLOAD_MAX_SIZE = 8;

// -------------------------------
// Helper functions
// -------------------------------

/**
 * Helper function that gets a valid blob and returns a class name
 * for previewing the application file
 *
 * @param blob
 * @returns {string} A class name
 */
var appIconClass = function(blob) {
    if (!blob.mimetype) {
        throw new Error('Invalid blob');
    }
    var mimetypeToExt = {
        'application/pdf': 'pdf',
        'application/msword': 'word',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'word',
        'application/vnd.oasis.opendocument.text': 'word',
        'application/vnd.ms-excel': 'excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'excel',
        'application/vnd.oasis.opendocument.spreadsheet': 'excel',
        'application/vnd.ms-powerpoint': 'powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'powerpoint',
        // Archives
        'application/zip': 'archive',
        'application/x-gzip': 'archive',
        'application/x-bzip': 'archive',
        'application/x-rar-compressed': 'archive',
        'application/x-rar': 'archive',
        'application/x-7z-compressed': 'archive'
    };

    // Check if it's one of the recognized applications
    var className,
        classNameTemplate = 'fa fa-file-{type}',
        fileType;
    if ((blob.mimetype.indexOf('application') >= 0 && mimetypeToExt[blob.mimetype])) {
        fileType = mimetypeToExt[blob.mimetype]+'-o';
    }
    // An audio
    else if (blob.mimetype.indexOf('audio')>=0) {
        fileType = 'audio'+'-o';
    }
    // A video
    else if (blob.mimetype.indexOf('video')>=0) {
        fileType = 'video'+'-o';
    }
    // Just use a default icon
    else {
        fileType = 'o';
    }

    return classNameTemplate.replace('{type}', fileType);
};

/**
 * Helper function that gets a valid blob and returns a class name
 * for previewing the image file in small icons.
 *
 * Note: At the moment all image files are using the icon but we can
 *       always use custom icon depending on the image type
 *
 * @param inkBlob
 * @returns {string} A class name
 */
var imgIconClass = function(blob) {
    if (!blob.mimetype) {
        throw "Invalid blob";
    }
    var mimetypeToExt = {
        "image/jpg" : 'image',
        "image/jpeg": 'image',
        "image/png" : 'image',
        "image/gif" : 'image'
    };
    return (blob.mimetype.indexOf('image') >= 0 && mimetypeToExt[blob.mimetype])
        ? 'fa fa-file-' + mimetypeToExt[blob.mimetype] + '-o'
        : 'fa fa-file-o';
};

/**
 * Helper function to check whether the uploaded file is an image
 * @param inkBlob A valid blob object
 * @returns {boolean}
 */
var isImage = function(blob)
{
    if (!blob || typeof blob.mimetype == 'undefined') {
        throw "Invalid blob";
    }
    return (blob.mimetype.indexOf('image')>=0);
};


/**
 * A component to represent each previewed item in the preview list
 *
 * @type {*|Function}
 */
var PreviewItemComponent = React.createClass({
    getInitialState: function() {
        return {
            // Indicates that thge user clicked on the remove button and removal is in progress
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
        // Indicate that removal is in progress
        this.setState({
            removingItem: true
        });

        // Remove the item from filepicker storage location
        filepicker.remove(this.props.blob, function() {
            this.props.onRemove(this.props.blob);
        }.bind(this), function(err) {
            // Probably the image has already been deleted, update form data
            if (err.code == ERR_REMOVE_404) {
                this.props.onRemove(this.props.blob);
            }
        }.bind(this));
    },
    render: function() {
        var blob = this.props.blob;
        // Prepare classes for the remove button and loading icons
        var rmBtnClass = 'fa fa-times-circle-o rm-btn',
            loadingIconClass = 'fa fa-spinner fa-pulse loading-icon';
        if (this.state.removingItem) {
            rmBtnClass += ' hide';
        }
        else {
            loadingIconClass += ' hide';
        }
        // The uploaded item is an image
        var previewedItem;
        if (isImage(this.props.blob)) {
            previewedItem = (<img className="previewed-item img-responsive" src={blob.url} title={blob.filename} />);
        }
        else {
            var cl = 'previewed-item ' + appIconClass(this.props.blob);
            previewedItem = (<i className={cl}></i>);
        }
        return (
            <li>
                <div className="img-container">
                    {previewedItem}
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
        // Traverse list of uploaded items and generate the DOM elements
        var items = [];
        if (this.props.items && typeof this.props.items == 'object' && this.props.items.length > 0) {
            items = this.props.items.map(function (item) {
                // Generate a unique key
                var urlParts = item.url.split('/'),
                    itemKey = [
                    'preview',
                    // The last part of the url is the hash generated by filepicker during upload
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
        // Display the list only if there are items to preview
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

/**
 * The uploader component is a React wrapper around filepicker that facilitates
 * uploading of resources
 */
var Uploader = React.createClass({

    // -------------------------------
    // Filepicker functions
    // -------------------------------

    /**
     * Initialize filepicker by registering the API key
     * @param apiKey
     */
    initFilepicker: function(apiKey) {
        filepicker.setKey(apiKey);
    },
    /**
     * Upload a file to filepicker.
     *
     * The component upload to a different account based on the working environment
     * (i.e sandbox, 'production')
     */
    uploadFile: function() {
        // Store options, common for the pickMultiple() and pickAndStore() functions
        var pickerOpts = {
            maxSize: UPLOAD_MAX_SIZE * 1024 * 1024,
            mimetypes: this.props.mimetypes
        };
        // Check if only specific services have been activated
        if (this.props.services && this.props.services == 'object' && this.props.services.length > 0) {
            pikerOpts.services = this.props.services;
        }
        // Check if there is an upload quota
        if (this.props.maxItems && this.props.maxItems > 0) {
            pickerOpts.multiple = true;
            pickerOpts.maxFiles = this.props.maxItems;
        }
        // Store options, applicable only in the case of pickAndStore() function
        var storeOpts = {
            location: 'S3',
            path: this.props.s3Dir + '/'
        };

        // Callback function invoked when one ore more times have successfully uploaded
        var uploadCb = function(blobs) {
            // Push the blob objects of all uploaded files
            blobs.forEach(function(blob) {
                this.items.push(blob);
            }.bind(this));
            // Indicate that there is a change on the uploader
            this.setState({
                isPristine: false,
                showFlashNotif: true
            });
            setTimeout(function() {
                this.setState({
                    showFlashNotif: false
                });
            }.bind(this), 5000);
            // Propagate the form value change to the form
            this.setValue(this.items)
            this.props.onChange(this.props.name, this.items);
        }.bind(this);

        // Sandbox environment, just upload to the dedicated assets storage area
        // in our sandbox application
        if (this.props.env == ENV_SANDBOX) {
            filepicker.pickMultiple(pickerOpts,
                function(blobs) {
                    uploadCb(blobs);
                }.bind(this),
                function(error) {
                    console.error("[UploadComponent Error] ", error);
                }.bind(this)
            );
        }
        // Production environment, uplaod to the S3 bucket defined by the production application
        else if (this.props.env == ENV_PRODUCTION) {
            filepicker.pickAndStore(pickerOpts, storeOpts,
                function(blobs) {
                    uploadCb(blobs);
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
            isPristine: true,
            showFlashNotif: false
        };
    },
    getDefaultProps: function() {
        return {
            env: ENV_SANDBOX,
            mimetypes: MIME_TYPES
        };
    },
    /**
     * Indicates if the uploader component is disabled
     */
    isDisabled: function() {
        return this.isFormDisabled() || this.props.disabled;
    },
    /**
     * Invoked once after the components mounts to DOM.
     * Apply sanity checks
     */
    componentDidMount: function() {
        // When th environment is set to production and S3 directory is required
        if (this.props.env == ENV_PRODUCTION && !this.props.s3Dir) {
            throw new Error("[FilePicker Error] Provide a S3 folder name");
        }
        // Initialize filepicker
        this.initFilepicker(this.props.apiKey);
    },
    /**
     * Invoked when the user clicks on the x icon
     * of the flash notification to hide it
     * @param e
     */
    handleHideFlash: function(e) {
        e.preventDefault();
        this.setState({
            showFlashNotif: false
        });
    },
    /**
     * Invoked when the user clicks on the x icon of an uploaded file
     * in order to delete it
     *
     * @param blob The object generated by filepicker during file upload. It contains all
     *             information about the file (e.g filename, url, mimetype, size)
     */
    handleRemoveItem: function(blob) {
        // Traverse list of items and find the one selected for removal
        this.items.forEach(function(item, index) {
            if (item.url == blob.url) {
                var items = this.items;
                items.splice(index, 1);

                // Refresh the list
                this.items = items;
                // Propagate the form value change to the form
                this.setValue(this.items)
                this.props.onChange(this.props.name, this.items);

                // Indicate that the
                this.setState({
                    isPristine: false,
                    showFlashNotif: true
                });
                setTimeout(function() {
                    this.setState({
                        showFlashNotif: false
                    });
                }.bind(this), 5000);
                return false;
            }
        }.bind(this));
    },
    /**
     * Invoked when the user clicks on the upload area to upload a file
     *
     * @param blob
     */
    handleUploadItem: function(evt) {
        evt.preventDefault();
        // Do nothing if the component is disabled
        if (!this.isDisabled()) {
            this.uploadFile();
        }
    },
    renderElement: function() {
        // Initialize the items with the default value as long as the field list of items is pristine
        if (this.state.isPristine) {
            this.items = this.getValue() || [];
        }

        // Initialize classes of the uploader component, upload button and set up upload text
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
        var flashNotifClass = 'sf';
        if (!this.state.showFlashNotif) {
            flashNotifClass += ' hide';
        }
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
                <div className={flashNotifClass}>
                    Submit to save your changes
                    <a className="fa fa-times hide-flash-btn" onClick={this.handleHideFlash}></a>
                </div>
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

        return (
            <Row
                label={this.props.label}
                required={this.isRequired()}
                hasErrors={this.showErrors()}
                layout={this.getLayout()}
                htmlFor={this.getId()}
                >
                {element}
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }
});

module.exports = Uploader;
