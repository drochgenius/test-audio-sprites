const { spawn } = require('child_process');
const bs = require('browser-sync');

// build with rollup and watch for changes
spawn('rollup', ['-cw']);
// launch the development server
bs({ server: '.', files: ['*.html', 'build/**'] });
