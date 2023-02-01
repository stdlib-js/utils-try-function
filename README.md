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

# Try Function

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Wrap a function in a try/catch block.



<section class="usage">

## Usage

```javascript
import wrap from 'https://cdn.jsdelivr.net/gh/stdlib-js/utils-try-function@deno/mod.js';
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
import wrap from 'https://cdn.jsdelivr.net/gh/stdlib-js/utils-try-function@deno/mod.js';

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

This package is part of [stdlib][stdlib], a standard library with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2023. The Stdlib [Authors][stdlib-authors].

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

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://gitter.im/stdlib-js/stdlib/

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/utils-try-function/tree/deno
[umd-url]: https://github.com/stdlib-js/utils-try-function/tree/umd
[esm-url]: https://github.com/stdlib-js/utils-try-function/tree/esm
[branches-url]: https://github.com/stdlib-js/utils-try-function/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/utils-try-function/main/LICENSE

</section>

<!-- /.links -->
