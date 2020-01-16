import React from 'react';

import './add-sample.css';

const AddSample = ({ onClick }) => (
  <div className="add-sample__container">
    <div className="add-sample">
      <div className="add-sample__new">
        <button
          type="button"
          onClick={onClick}
          className="add-sample__button"
        >
          <div className="add-sample__text">ADD</div>
        </button>
      </div>
    </div>
  </div>
);

export default AddSample;
