import React from 'react';
import LeftImage from './LeftImage';
import LeftMiddle from './LeftMiddle';
import LeftBottom from './LeftBottom';

export const styles: React.CSSProperties = {
  fontFamily: 'sans-serif',
  color: 'rgb(255,255,255)',
  display: 'flex',
  flexDirection: 'column',
  borderStyle: 'solid',
  backgroundColor: 'rgb(000 000 102)',
  padding: '13px',
  alignItems: 'center',
};

export const line: React.CSSProperties = {
  backgroundColor: 'rgb(255,255,255)',
  width: '100%',
  height: '1px',
};

const LeftNavigation: React.FC = () => {
  return (
    <div style={styles}>
      <LeftImage img="/image/picture.png" />
      <LeftMiddle />
      <div style={line}></div>
      <LeftBottom />
    </div>
  );
};

export default LeftNavigation;
