// Copyright (c) 2024 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import r from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-function@v0.2.1-esm/index.mjs";import t from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-error@v0.2.1-esm/index.mjs";import e from"https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-fmtprodmsg@v0.2.1-esm/index.mjs";function s(s,n){var o;if(!r(s))throw new TypeError(e("1Xr3J",s));return o=arguments.length>1?n:null,function(){var r,e,n;for(e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];try{return s.apply(o,r)}catch(r){return t(r)?r:"object"==typeof r?new Error(JSON.stringify(r)):new Error(r.toString())}}}export{s as default};
//# sourceMappingURL=index.mjs.map
