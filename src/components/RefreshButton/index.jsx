import React from 'react';
import { MdRefresh } from 'react-icons/md';

import './refresh-button.css';

const refreshButton = ({ refresh }) => (
  <>
    <button className="refresh-button" type="button" onClick={refresh}>
      <MdRefresh size={32} />
    </button>
  </>
);

export default refreshButton;
