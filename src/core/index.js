import Tone from 'tone';

/* Basically, sequencer logic is based here
 * It is tempo/pitch/volume updates
 * and transport control
 * docs: https://tonejs.github.io/docs/13.8.25/Transport
 *       https://tonejs.github.io/docs/13.8.25/Players
 *       https://tonejs.github.io/docs/13.8.25/Player
 */

export const updatePitch = (sound, pitch) => {
  rackPlayers.get(sound.name).playbackRate = pitch;
}

export const updateTempo = tempo => {
  Tone.Transport.bpm.value = tempo;
};

export const updateVolume = (sound, volume) => {
  rackPlayers.get(sound.name).volume.value = volume;
}

export const startPlaying = () => {
  Tone.Transport.start('+0.1');
};

export const stopPlaying = () => {
  Tone.Transport.stop();
};

export const getTransportPosition = () => {
  /* ["0", "0", "0"] <--
   * ["0", "0", "3"] <--
   * ["0", "1", "0"] <--  */
  const pos = Tone.Transport.position.split('.')[0].split(':');
  return Number(pos[1]) * 4 + Number(pos[2]);
};

export const rackPlayers = new Tone.Players({}).toMaster();

export const playSound = name => rackPlayers.get(name).start()

// DOM manipulations in callback are extremly prohibited. Info:
// https://github.com/Tonejs/Tone.js/wiki/Performance#syncing-visuals


// Docs: https://tonejs.github.io/docs/13.8.25/Sequence
export const sequence = (sound, callback = () => {}) => {
  return new Tone.Sequence(
    (time, note) => {
      if (note.notes.includes(1)) {
        rackPlayers.get(sound.name).start();
      }
      callback();
    },
    new Array(16).fill({ notes: [] }),
    '16n',
  );
}

