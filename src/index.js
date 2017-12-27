import { play } from './player';

/**
 * @param {String} the path to a concatenated audio file
 * @param {String} the path to the audio manifest file
 */

// Working Sample
play('samples/rti/audio.mp3', 'samples/rti/manifest.json');

// Non-working sample
/*play(
    'samples/sample_widget/c1e69e2b50744d7ba8080b6fc03b8ea2.mp3',
    'samples/sample_widget/c1e69e2b50744d7ba8080b6fc03b8ea2.json'
);*/
