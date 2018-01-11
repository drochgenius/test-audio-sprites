const { promisify } = require('util');
const fs = require('fs');
const child_process = require('child_process')


const exec = promisify(child_process.exec);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);


async function createSilenceAudio() {


    const cmd1 = 'ffmpeg -ar 48000 -t 60 -f s16le -acodec pcm_s16le -ac 2 -i /dev/zero -acodec copy silence.wav -y';
    const cmd2 = 'ffmpeg -i silence.wav -b:a 64k silence.mp3 -y';
    await exec(cmd1);
    await exec(cmd2);
}

(async () => {
    await createSilenceAudio();

    const content = await readFile('manifest.json');
    const manifest = JSON.parse(content);

    const list = manifest.tracks
        .map(track => track.src.replace('../../audio', 'audio'))
        .map(file => `file '${file}'`);

    console.log(list);

    const file = 'track-list.txt';
    const output = 'audio.mp3';
    await writeFile(file, list.join('\nfile \'silence.mp3\'\n'));

    const cmd = `ffmpeg -f concat -safe 0 -i ${file} -c copy ${output} -y`;

    await exec(cmd);

})();