const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const rollup = require('rollup');
let pack = require('./package');
let external = Object.keys(pack.dependencies);

rollup.rollup({
    entry: 'src/index.js',
    plugins: [
        nodeResolve({jsnext: true, module: true}),
        babel()
    ],
    acorn: {
        allowHashBang: true
    }
}).then(bundle=>{

    bundle.write({
      dest: 'dist/bundle.js',
      format: 'cjs',
      sourceMap: true
    });

    bundle.write({
        dest: 'dist/bundle.es.js',
        format: 'es',
        sourceMap: true
    });
});
