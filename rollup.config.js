import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
// rollup.config.js
export default {
    // can be an array (for multiple inputs)
    // core input options
    input: 'src/index.js', // required

    output: {
        // required (can be an array, for multiple outputs)
        // core output options
        file: 'build/index.js', // required
        format: 'iife' // required
    },

    plugins: [
        resolve({
            jsnext: true,
            main: true
        }),
        commonjs()
    ],

    watch: {
        include: ['src/*']
    }
};
