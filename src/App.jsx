import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { updateTempo, startPlaying, stopPlaying } from './core';
import Header from './components/Header';
import PlayButton from './components/PlayButton';
import RefreshButton from './components/RefreshButton';
import TempoSlider from './components/TempoSlider';
import DrumRack from './components/DrumRack';
import AddSample from './components/AddSample';
import Footer from './components/Footer';
import SampleSelector from './components/SampleSelector';

import './App.css';

import mountSamples from './utils/samplesList';

const samplesList = mountSamples();

Modal.setAppElement('#root');

const App = () => {
  const [addSampleOpen, setAddSampleOpen] = useState(false);
  const [currentTempo, setCurrentTempo] = useState(120);
  const [samples, setSamples] = useState(samplesList.slice(0, 1));
  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    updateTempo(currentTempo);
  });

  const play = () => {
    if (isPlaying) {
      stopPlaying();
      setPlaying(false);
    } else {
      startPlaying();
      setPlaying(true);
    }
  };

  const refresh = () => {
    const emptySamplesList = [];
    setSamples(emptySamplesList);
  }

 /*
  *const randomizeSinglePattern = () => {
  *  const newPattern = [...Array(16)].map((_, i) => Math.random() >= 0.5)
  *  console.log('pattern: ', newPattern);
  *  return newPattern;
  }
  */

  const activateSample = sample => {
    const newSamplesList = [
      ...samples.filter(item => item.name !== sample),
      ...samplesList.filter(item => item.name === sample),
    ];
    setSamples(newSamplesList);
  };

  const removeSample = sample => {
    const newSamplesList = [
      ...samples.filter(item => item.name !== sample),
    ];
    setSamples(newSamplesList);
  };

  return (
    <div className="App">
      <Header />
      {addSampleOpen && (
        <SampleSelector
          cancel={() => setAddSampleOpen(false)}
          add={sample => {
            if (sample.sample) {
              activateSample(sample.sample);
            }
            setAddSampleOpen(false);
          }}
        />
      )}
      <div className="drum-cols">
        <div className="controls">
          <div className="buttons">
              <PlayButton text="Start / Stop" play={play} isPlaying={isPlaying} />
              <RefreshButton text="Refresh" refresh={refresh} />
          </div>
          <TempoSlider
            tempo={currentTempo}
            onchange={e => {
              setCurrentTempo(e.target.value);
              updateTempo(e.target.value);
            }}
          />
        </div>
        {samples.map(sample => (
          <DrumRack
            key={sample.name}
            sound={sample}
            remove={removeSample}
          />
        ))}
        <AddSample
          onClick={() => {
            setAddSampleOpen(true);
          }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
