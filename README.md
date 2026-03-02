<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# Try Function

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Wrap a function in a try/catch block.

<section class="installation">

## Installation

```bash
npm install @stdlib/utils-try-function
```

Alternatively,

-   To load the package in a website via a `script` tag without installation and bundlers, use the [ES Module][es-module] available on the [`esm`][esm-url] branch (see [README][esm-readme]).
-   If you are using Deno, visit the [`deno`][deno-url] branch (see [README][deno-readme] for usage intructions).
-   For use in Observable, or in browser/node environments, use the [Universal Module Definition (UMD)][umd] build available on the [`umd`][umd-url] branch (see [README][umd-readme]).

The [branches.md][branches-url] file summarizes the available branches and displays a diagram illustrating their relationships.

To view installation and usage instructions specific to each branch build, be sure to explicitly navigate to the respective README files on each branch, as linked to above.

</section>

<section class="usage">

## Usage

```javascript
var wrap = require( '@stdlib/utils-try-function' );
```

#### wrap( fcn )

Wraps a `function` in a `try/catch` block.

```javascript
function fcn() {
    throw new Error( 'beep boop' );
}

var f = wrap( fcn );

var out = f();
if ( out instanceof Error ) {
    console.error( out.message );
    // => 'beep boop'
}
```

The returned `function` has the same signature as the wrapped `function`.

```javascript
function fcn( a, b, c, d ) {
    var sum = a + b + c + d;
    if ( sum < 10 ) {
        throw new Error( 'invalid arguments. Arguments must sum to a number greater than or equal to 10.' );
    }
    return sum;
}

var f = wrap( fcn );

var out = f( 5, 6, 7, 8 );
// returns 26

out = f( 1, 2, 3, 1 );
// returns <Error>
```

If provided an asynchronous `function`, the returned `function` only traps `errors` which occur during the current event loop tick.

<!-- run throws: true -->

```javascript
function fcn( a, b, clbk ) {
    if ( !a ) {
        throw new Error( 'invalid argument.' );
    }
    setTimeout( onTimeout, 0 );
    function onTimeout() {
        if ( !b ) {
            throw new Error( 'invalid argument.' );
        }
        clbk();
    }
}

function done() {
    console.log( 'beep' );
}

var f = wrap( fcn );

var out = f( null, 5, done );
// returns <Error>

out = f( true, null, done );
// returns undefined
```

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   Isolating `try/catch` blocks as separate wrapped `functions` prevents a parent scope from permanently entering optimization hell.
-   If a function throws a literal, the literal is serialized as a `string` and returned as an `Error` object.

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- run throws: true -->

<!-- eslint no-undef: "error" -->

```javascript
var wrap = require( '@stdlib/utils-try-function' );

function beep( str ) {
    if ( typeof str !== 'string' ) {
        throw new TypeError( 'invalid argument. Must provide a string. Value: `' + str + '`.' );
    }
    return 'beep ' + str;
}

function boop( str, clbk ) {
    if ( typeof str !== 'string' ) {
        throw new TypeError( 'invalid argument. Must provide a string. Value: `' + str + '`.' );
    }
    setTimeout( done, 1000 );

    function done() {
        if ( str !== 'beep' ) {
            throw new Error( 'invalid argument. String must equal `beep`. Value: `' + str + '`.' );
        }
        clbk( str + ' boop' );
    }
}

function done( str ) {
    if ( str !== 'beep boop' ) {
        throw new Error( 'huh?' );
    }
}

// Synchronous...
var f = wrap( beep );

var out = f( 'boop' );
console.log( out );
// => 'beep boop'

out = f( null );
console.log( out.message );
// => '...'

// Asynchronous...
f = wrap( boop );

out = f( 'beep', done );
console.log( out );
// => undefined

out = f( 'foo', done );
console.log( out );
// => undefined
```

</section>

<!-- /.examples -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2026. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/utils-try-function.svg
[npm-url]: https://npmjs.org/package/@stdlib/utils-try-function

[test-image]: https://github.com/stdlib-js/utils-try-function/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/utils-try-function/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/utils-try-function/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/utils-try-function?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/utils-try-function.svg
[dependencies-url]: https://david-dm.org/stdlib-js/utils-try-function/main

-->

[chat-image]: https://img.shields.io/badge/zulip-join_chat-brightgreen.svg
[chat-url]: https://stdlib.zulipchat.com

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/utils-try-function/tree/deno
[deno-readme]: https://github.com/stdlib-js/utils-try-function/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/utils-try-function/tree/umd
[umd-readme]: https://github.com/stdlib-js/utils-try-function/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/utils-try-function/tree/esm
[esm-readme]: https://github.com/stdlib-js/utils-try-function/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/utils-try-function/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/utils-try-function/main/LICENSE

</section>

<!-- /.links -->
