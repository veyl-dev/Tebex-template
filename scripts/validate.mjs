import { readFileSync, existsSync } from 'node:fs';

const required = [
  'Webstore/layout.html',
  'Webstore/index.html',
  'Webstore/category.html',
  'Webstore/package.html',
  'Webstore/checkout.html',
  'Webstore/username.html',
  'Assets/eclipse.css',
  'Assets/eclipse.js',
  'schema.json',
  'preview/index.html'
];

const missing = required.filter((file) => !existsSync(file));
if (missing.length) {
  console.error('Missing required theme files:', missing.join(', '));
  process.exit(1);
}

const schema = JSON.parse(readFileSync('schema.json', 'utf8'));
if (!schema.author || !Array.isArray(schema.config)) {
  throw new Error('schema.json must include author and config sections.');
}

const css = readFileSync('Assets/eclipse.css', 'utf8');
const opens = (css.match(/{/g) || []).length;
const closes = (css.match(/}/g) || []).length;
if (opens !== closes) {
  throw new Error(`CSS brace mismatch: ${opens} opening vs ${closes} closing braces.`);
}

for (const file of required.filter((item) => item.endsWith('.html') && item.startsWith('Webstore/'))) {
  const source = readFileSync(file, 'utf8');
  if (!source.includes('{% extends "layout.html" %}') && file !== 'Webstore/layout.html') {
    throw new Error(`${file} must extend layout.html.`);
  }
}

console.log('ECLIPSE theme validation passed.');
