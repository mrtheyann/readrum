import React, { useState } from 'react';
import Modal from 'react-modal';

import SingleSample from '../SingleSample';

import mountSamples from '../../utils/samplesList';

import './sample-selector.css';

const samples = mountSamples();

const inlineStyles = {
  content: {
    position: 'fixed',
    padding: '0',
    width: '80%',
    left: '50%',
    top: '5%',
    right: 'auto',
    bottom: '5%',
    transform: 'translate(-50%,0)',
    maxWidth: '30rem',
    backgroundColor: '#333',
    color: '#eee',
    border: '3px solid #444',
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(32, 32, 32, 0.75)',
  },
};

const SampleSelector = ({ add, cancel }) => {
  const [tab, setTab] = useState('samples');
  return (
    <Modal isOpen style={inlineStyles} contentLabel="Sample Selector Modal">
      <div className="sample-selector__title">
        <h1 className="sample-selector__heading-text">Choose a sample</h1>
        <button
          onClick={cancel}
          type="button"
          className="sample-selector__close"
        >
          ×
        </button>
      </div>
      <div className="sample-selector__tabs">
        <button
          className={`sample-selector__tab-button${
            tab === 'samples'
              ? ' sample-selector__tab-button--active'
              : ''
          }`}
          type="button"
          onClick={() => setTab('samples')}
        >
          Samples
        </button>
      </div>
      <div className="sample-selector__list">
        {tab === 'samples' &&
          samples.map(sample => (
            <SingleSample
              onAdd={() => add({ sample: sample.name })}
              displayName={sample.displayName}
              name={sample.name}
              key={sample.name}
              url={sample.url}
            />
          ))}
      </div>
    </Modal>
  );
};

export default SampleSelector;