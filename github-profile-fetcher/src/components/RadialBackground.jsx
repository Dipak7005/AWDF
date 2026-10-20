import React from 'react';
import { GradientWave } from './GradientWave';
import './RadialBackground.css';

export const RadialBackground = ({ children }) => {
  return (
    <div className="radial-background-wrapper">
      <GradientWave
        colors={["#4f46e5", "#818cf8", "#c084fc", "#e0e7ff", "#38bdf8", "#ffffff"]}
        isPlaying={true}
        darkenTop={false}
      />
      <div className="radial-dot-pattern" />
      <div className="radial-content">{children}</div>
    </div>
  );
};

export default RadialBackground;

