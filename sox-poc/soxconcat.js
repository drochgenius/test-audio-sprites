const { promisify } = require('util');
const fs = require('fs');
const child_process = require('child_process')


const exec = promisify(child_process.exec);
const readFile = promisify(fs.readFile);


async function createSilenceAudio(file) {

    const time = 1; // 1 second of silence
    const rate = (await exec(`sox --i -r ${file}`)).stdout.trim();
    const channels =  (await exec(`sox --i -c ${file}`)).stdout.trim();

    console.log('RATE', rate, channels);

    const cmd1 = `sox -n -r ${rate} -c ${channels} silence.wav trim 0.0 ${time}`;
    const cmd2 = 'ffmpeg -i silence.wav -b:a 64k silence.mp3 -y';
    await exec(cmd1);
    await exec(cmd2);
}

(async () => {

    const content = await readFile('manifest.json');
    const manifest = JSON.parse(content);

    const list = manifest.tracks
        .map(track => track.src.replace('../../audio', 'audio'));

    console.log(list);

    const output = 'audio';

    const all = list.join(' silence.mp3 ');

    await createSilenceAudio(list[0]);


    const cmd1 = `sox ${all} ${output}.wav`;
    const cmd2 = `ffmpeg -i ${output}.wav -b:a 64k ${output}.mp3 -y`;

    await exec(cmd1);
    await exec(cmd2);

})();