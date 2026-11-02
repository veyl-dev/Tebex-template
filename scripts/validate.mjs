import { readFileSync, existsSync } from 'node:fs';

const required = [
  'Webstore/layout.html',
  'Webstore/index.html',
  'Webstore/category.html',
  'Webstore/package.html',
  'Webstore/checkout.html',
  'Webstore/username.html',
  'Webstore/options.html',
  'Assets/eclipse.css',
  'Assets/eclipse.js',
  'Assets/category/tiered.html',
  'Assets/quote.html',
  'schema.json',
  'preview/index.html'
];

const missing = required.filter((file) => !existsSync(file));
if (missing.length) {
  console.error('Missing required theme files:', missing.join(', '));
  process.exit(1);
}

const schema = JSON.parse(readFileSync('schema.json', 'utf8'));
if (!schema.author || !Array.isArray(schema.config) || schema.config.length === 0) {
  throw new Error('schema.json must include an author and at least one config section.');
}

const css = readFileSync('Assets/eclipse.css', 'utf8');
const opens = (css.match(/{/g) || []).length;
const closes = (css.match(/}/g) || []).length;
if (opens !== closes) throw new Error(`CSS brace mismatch: ${opens} vs ${closes}`);

for (const file of required.filter((item) => item.startsWith('Webstore/') && item !== 'Webstore/layout.html')) {
  const source = readFileSync(file, 'utf8');
  if (!source.includes('{% extends "layout.html" %}')) throw new Error(`${file} must extend layout.html`);
}

const category = readFileSync('Webstore/category.html', 'utf8');
if (!category.includes('{% for package in packages %}') || category.includes('category.packages')) {
  throw new Error('category.html must use the documented category root variables.');
}

const packagePage = readFileSync('Webstore/package.html', 'utf8');
if (!packagePage.includes('{{ name }}') || packagePage.includes('{{ package.name }}')) {
  throw new Error('package.html must use documented package root variables.');
}

const username = readFileSync('Webstore/username.html', 'utf8');
if (!username.includes('{% if external %}') || !username.includes('name="ign"')) {
  throw new Error('username.html must support both external and non-external login.');
}

const checkout = readFileSync('Webstore/checkout.html', 'utf8');
if (!checkout.includes('basket.ident') || !checkout.includes('Tebex.checkout.launch')) {
  throw new Error('checkout.html must initialize Tebex.js using basket.ident.');
}

const options = readFileSync('Webstore/options.html', 'utf8');
for (const marker of ['options.package', 'options.variables', 'name="variables[', 'method="post"']) {
  if (!options.includes(marker)) throw new Error(`options.html missing expected marker: ${marker}`);
}

console.log('ECLIPSE theme static validation passed.');
