#! /usr/bin/env node

const fs = require('fs');
const docgen = require('react-docgen-typescript');
const docsToMarkdown = require('react-docs-markdown');

const docList = [
  {
    name: 'Form',
    file: './src/form.tsx',
    out: './docs/api/form.md',
  },
  {
    name: 'CheckboxGroup',
    file: './src/components/checkbox-group.tsx',
    out: './docs/api/checkbox-group.md',
  },
  {
    name: 'Checkbox',
    file: './src/components/checkbox.tsx',
    out: './docs/api/checkbox.md',
  },
  {
    name: 'Common Component Props',
    file: './scripts/component-common-for-docs.js',
    out: './docs/api/component-common.md',
  },
  {
    name: 'Input',
    file: './src/components/input.tsx',
    out: './docs/api/input.md',
  },
  {
    name: 'File',
    file: './src/components/input-file.tsx',
    out: './docs/api/input-file.md',
  },
  {
    name: 'RadioGroup',
    file: './src/components/radio-group.tsx',
    out: './docs/api/radio-group.md',
  },
  {
    name: 'Select',
    file: './src/components/select.tsx',
    out: './docs/api/select.md',
  },
  {
    name: 'Textarea',
    file: './src/components/textarea.tsx',
    out: './docs/api/textarea.md',
  },
];

const parser = docgen.withDefaultConfig();

docList.forEach(item => {
  const api = parser.parse(item.file);
  const content = api.map(apiItem => {
    return docsToMarkdown(apiItem, item.name);
  });
  fs.writeFile(item.out, content.join(), writeError => {
    if (writeError) throw writeError;
  });
});
