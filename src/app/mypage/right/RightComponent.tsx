import React from 'react';
import RightContent from './RightContent';

export const styles: React.CSSProperties = {
  fontFamily: 'sans-serif',
  color: 'rgb(0,0,0)',
  display: 'flex',
  flexDirection: 'column',
  borderStyle: 'solid',
  backgroundColor: 'rgb(255,255,255)',
  padding: '10px',
};

export const blank: React.CSSProperties = {
  width: '100%',
  height: '50%',
};

const RightComponent: React.FC = () => {
  return (
    <div style={styles}>
      <RightContent lan="ko" />
      <div style={blank}></div>
      <RightContent lan="en" />
    </div>
  );
};

export default RightComponent;
