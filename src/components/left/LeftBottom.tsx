import { styles } from './LeftNavigation';
import React from 'react';

export const content: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontWeight: 'lighter',
  fontSize: '9px',
  margin: '10px',
};

const LeftNavigationContent: React.FC = () => (
  <div style={content}>
    <p style={{ fontWeight: 'normal', margin: 5 }}>업무스킬(Skill):</p>
    <p>Python, SQL, Javascript, C</p>
    <p style={{ fontWeight: 'normal', margin: 5 }}>구사언어(Language):</p>
    <p>Korean(Native), English(Beginner)</p>
  </div>
);

export default LeftNavigationContent;
