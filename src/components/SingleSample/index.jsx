import React, { useState, useEffect } from 'react';
import { MdPlayArrow } from 'react-icons/md';


import { rackPlayers, playSound } from '../../core';

import './single-sample.css';

const SingleSample = ({ displayName, name, url, onAdd }) => {
  const [isPlaying, setPlaying] = useState(false);
  const handlePlay = () => {
    if (isPlaying === false) {
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (isPlaying === true) {
      if (!rackPlayers.has(name)) {
        rackPlayers.add(name, url, () => {
          setPlaying(false);
          playSound(name);
        });
      } else {
        playSound(name);
        setPlaying(false);
      }
    }
  }, isPlaying);

  return (
    <div className="signle-sample">
      <button
        className="signle-sample__button"
        type="button"
        onClick={handlePlay}
        disabled={isPlaying === true}
      >
        {isPlaying === false && <MdPlayArrow size={30} />}
        {isPlaying === true && <h3>Loading</h3>}
      </button>
      <button
        type="button"
        onClick={onAdd}
        className="signle-sample signle-sample__button signle-sample__name"
      >
        {displayName}
      </button>
      {/*
    <button className="signle-sample__button" type="button" onClick={onAdd}>
      <MdAdd size={24} />
    </button>
*/}
    </div>
  );
};

export default SingleSample;
