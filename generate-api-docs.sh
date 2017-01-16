#! /usr/bin/env node

var fs = require('fs');
var reactDocs = require('react-docgen');
var docsToMarkdown = require('react-docs-markdown');

var docList = [
    { file: './src/components/checkbox-group.js',   name: 'CheckboxGroup', out: './docs/api/checkbox-group.md' },
    { file: './src/components/checkbox.js',         name: 'Checkbox',      out: './docs/api/checkbox.md' },
    { file: './src/components/component-common.js', name: 'Common Component Props', out: './docs/api/component-common.md' },
    { file: './src/components/input.js',            name: 'Input',         out: './docs/api/input.md' },
    { file: './src/components/input-file.js',       name: 'File',          out: './docs/api/input-file.md' },
    { file: './src/components/radio-group.js',      name: 'RadioGroup',    out: './docs/api/radio-group.md' },
    { file: './src/components/select.js',           name: 'Select',        out: './docs/api/select.md' },
    { file: './src/components/textarea.js',         name: 'Textarea',      out: './docs/api/textarea.md' },
];

docList.map((item) => {
    var src = fs.readFile(item.file, 'utf8', (err, data) => {
        if (err) throw err;
        var api = reactDocs.parse(data);
        var md = docsToMarkdown(api, item.name);
        fs.writeFile(item.out, md, (err) => {
            if (err) throw err;
        });
    });
});
