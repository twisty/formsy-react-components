#! /usr/bin/env node

const fs = require('fs');
const reactDocs = require('react-docgen');
const externalProptypesHandler = require('react-docgen-external-proptypes-handler')
const docsToMarkdown = require('react-docs-markdown');

const docList = [
  {
    name: 'Form',
    file: './src/form.js',
    out: './docs/api/form.md',
  },
  {
    name: 'CheckboxGroup',
    file: './src/components/checkbox-group.js',
    out: './docs/api/checkbox-group.md',
  },
  {
    name: 'Checkbox',
    file: './src/components/checkbox.js',
    out: './docs/api/checkbox.md',
  },
  {
    name: 'Common Component Props',
    file: './scripts/component-common-for-docs.js',
    out: './docs/api/component-common.md',
  },
  {
    name: 'Input',
    file: './src/components/input.js',
    out: './docs/api/input.md',
  },
  {
    name: 'File',
    file: './src/components/input-file.js',
    out: './docs/api/input-file.md',
  },
  {
    name: 'RadioGroup',
    file: './src/components/radio-group.js',
    out: './docs/api/radio-group.md',
  },
  {
    name: 'Select',
    file: './src/components/select.js',
    out: './docs/api/select.md',
  },
  {
    name: 'Textarea',
    file: './src/components/textarea.js',
    out: './docs/api/textarea.md',
  },
];

docList.forEach(item => {
  fs.readFile(item.file, 'utf8', (err, data) => {
    if (err) throw err;
    const handlers = reactDocs.defaultHandlers.concat(
      externalProptypesHandler(item.file),
    );
    const api = reactDocs.parse(data, null, handlers);
    const md = docsToMarkdown(api, item.name);
    fs.writeFile(item.out, md, writeError => {
      if (writeError) throw writeError;
    });
  });
});
