// rollup.config.js
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import { eslint } from 'rollup-plugin-eslint';
import { version } from '../package.json';
import replace  from 'rollup-plugin-replace';

const VERSION = process.env.VERSION || version;

const copyright = new Date().getFullYear() > 2018 ? '2018-' + new Date().getFullYear() : 2018;

const banner =
  '/*!\n' +
  ' * idebug v' + VERSION + '\n' +
  ' * (c) ' + copyright + ' Weich\n' +
  ' * Released under the MIT License.\n' +
  ' */';

// const weexFactoryPlugin = {
//     intro () {
//         return 'module.exports = function weexFactory (exports, document) {'
//     },
//     outro () {
//         return '}'
//     }
// };

const isProd = process.env.NODE_ENV === 'production';

// 通用的插件
const basePlugins = [
    // weexFactoryPlugin,
    replace({
        __VERSION__: VERSION
    }),
    eslint({
        throwOnError: true,
        throwOnWarning: true,
        include: ['src/**'],
        exclude: ['node_modules/**']
    }),
    json(),
    resolve(),
    commonjs(),
    babel({
        exclude: 'node_modules/**' // 只编译我们的源代码
    })
];
// 开发环境需要使用的插件
const devPlugins = [];

// 生产环境需要使用的插件
const prodPlugins = [
    uglify({
        output: {
          comments: function(node, comment) {
              var text = comment.value;
              var type = comment.type;
              if (type == "comment2") {
                  // multiline comment
                  return /idebug/i.test(text);
              }
          }
        }
    })
];

const plugins = [...basePlugins].concat(isProd ? prodPlugins : devPlugins);

export default 

function genConfig(file, format, sourcemap) {
    const config = {
        input: 'src/main.js',
        output: {
            banner: banner,
            footer: '/* idebug version ' + VERSION + ' */',
            file: isProd ? 'dist/bundle.min.js' : 'dist/bundle.js',
            name: 'result',
            format: 'iife',
            globals: {
                jquery: 'jQuery'
            },
            paths: {
                jquery: 'https://cdn.bootcss.com/jquery/3.2.1/jquery.js'
            },
            sourcemap: isProd ? true : false
        },
        plugins,
        external: ['jquery']
    };
}