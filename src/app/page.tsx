'use client';
import LeftNavigation from '../components/left/LeftNavigation';
import RightComponent from '../components/right/RightComponent';
import React from 'react';

const styles: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
};

export default function Home() {
  return (
    <div style={styles}>
      <LeftNavigation />
      <RightComponent />
    </div>
  );
}