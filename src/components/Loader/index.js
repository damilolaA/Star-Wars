import React from 'react';
import './loader.scss';

const Loader = () => (
  <div>
    <svg className="loader" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="30"></circle>
    </svg>
  </div>
);

export default Loader;