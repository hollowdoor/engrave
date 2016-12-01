engrave
===

Install
------

`npm install -g engrave`

Usage
----

`engrave` is a mask over node's executable.

Basic usage would go something like this.

`script.js`

```javascript
import path from 'path';
console.log(path.join(__dirname, 'script.js'));
```

Then run `script.js` with the engrave command `engrave ./script.js`.

es2015 modules will be used, and any commonjs (using require) will also work.

You can also use `engrave` with a Unix shebang.

`script.js` with a Unix shebang.

```javascript
#!/usr/bin/env engrave
import path from 'path';
console.log(path.join(__dirname, 'script.js'));
```

1. Make the file executable on Unix systems (Linux) with the command `chmod +x script.js`.
2. Run the file on the command line by using it's name `./script.js`.

See [es-spawn](https://github.com/hollowdoor/es_spawn) to learn more about what enables engrave's functions.

The Default
-----------

If you don't pass a script name as a command then the default will be tried.

The default with no script argument to `engrave` is an `engrave.js` file in the current directory.

Arguments to node
-----------------

If you pass any flags to `engrave` before the script argument those arguments will be used by node.

es2015 and Beyond
-----------------

By default `engrave` runs es2015 modules, and [stage 3 ecma javascript](http://babeljs.io/docs/plugins/preset-stage-3/).

If you want more you can place a [.babelrc](https://babeljs.io/docs/usage/babelrc/) in the directory that contains your script. Add what ever `babel` plugins and presets to `.babelrc` to get the functionality you want.

Underneath `engrave` uses `rollup` to pre-compile es2015 modules. So you get the benefits of using `rollup` which includes module static analysis. You can also use [rollup presets](http://rollupjs.org/guide/#using-rollup-with-babel) in your `.babelrc` file.
