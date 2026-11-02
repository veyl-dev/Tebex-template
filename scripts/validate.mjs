import { readFileSync, existsSync } from 'node:fs';

const required = [
  'Webstore/layout.html','Webstore/index.html','Webstore/category.html',
  'Webstore/package.html','Webstore/checkout.html','Webstore/username.html',
  'Webstore/options.html','Assets/eclipse.css','Assets/eclipse.js',
  'Assets/category/tiered.html','Assets/quote.html','schema.json','preview/index.html'
];
const missing = required.filter((file) => !existsSync(file));
if (missing.length) throw new Error('Missing files: '+missing.join(', '));

const schema=JSON.parse(readFileSync('schema.json','utf8'));
if(!schema.author||!Array.isArray(schema.config)||!schema.config.length) throw new Error('Invalid Tebex schema.');
const ids=new Set();
for(const section of schema.config){
  if(!section.header||!Array.isArray(section.options)) throw new Error('Invalid schema section.');
  for(const option of section.options){
    if(!option.id||ids.has(option.id)) throw new Error('Missing or duplicate schema option id: '+option.id);
    ids.add(option.id);
    if(!['textarea','url','select','colour-picker','slider','file','image-uploader'].includes(option.type)) throw new Error('Unsupported Tebex schema type: '+option.type);
  }
}
const css=readFileSync('Assets/eclipse.css','utf8');
if((css.match(/{/g)||[]).length!==(css.match(/}/g)||[]).length) throw new Error('CSS braces are unbalanced.');
for(const file of required.filter(p=>p.startsWith('Webstore/')&&p!=='Webstore/layout.html')){
  if(!readFileSync(file,'utf8').includes('{% extends "layout.html" %}')) throw new Error(file+' must extend layout.html');
}
const category=readFileSync('Webstore/category.html','utf8');
if(!category.includes('{% for package in packages %}')||category.includes('category.packages')) throw new Error('Category page must use category root variables.');
const packagePage=readFileSync('Webstore/package.html','utf8');
if(!packagePage.includes('{{ name }}')||packagePage.includes('{{ package.name }}')) throw new Error('Package page must use package root variables.');
const username=readFileSync('Webstore/username.html','utf8');
if(!username.includes('{% if external %}')||!username.includes('name="ign"')) throw new Error('Username page must support both login types.');
const checkout=readFileSync('Webstore/checkout.html','utf8');
if(!checkout.includes('basket.ident')||!checkout.includes('Tebex.checkout.launch')) throw new Error('Checkout must use basket.ident and Tebex.js.');
const options=readFileSync('Webstore/options.html','utf8');
for(const marker of ['options.package','options.variables','name="variables[','method="post"']) if(!options.includes(marker)) throw new Error('Options page missing '+marker);
const tier=readFileSync('Assets/category/tiered.html','utf8');
for(const marker of ['/tier/quote?category=','/checkout/packages/add/','tier.downgrade_package_id','Pending downgrade']) if(!tier.includes(marker)) throw new Error('Tier page missing '+marker);
console.log('ECLIPSE static validation passed.');
