import { Howl } from 'howler';
import { tc2ms } from './utils';

export async function play(audio, manifest) {
    const src = [audio];
    const response = await fetch(manifest);
    const content = await response.json();

    const sprite = {};

    const tracks = content.tracks.map(track => {
        const name = track.id;
        const info = [];
        info.push(tc2ms(track.clipBegin));
        info.push(tc2ms(track.clipEnd) - tc2ms(track.clipBegin));
        sprite[name] = info;
        return { name, cues: track.vttCues };
    });

    const sound = new Howl({
        src,
        sprite
    });

    let index = 0;

    sound.on('play', () => {
        const { name, cues } = tracks[index];
        document.getElementById('track').innerHTML = name;

        if (cues) {
            const el = document.getElementById('list');
            el.innerHTML = '';
            cues.forEach(cue => {
                const li = document.createElement('li');
                li.innerHTML = cue.text;
                el.appendChild(li);
            });
        }
    });

    sound.on('end', () => {
        ++index;
        sound.play(tracks[index].name);
    });

    // kick off the playback
    sound.play(tracks[index].name);
}
