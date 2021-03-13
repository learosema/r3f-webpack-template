import React from 'react';
import { Canvas } from 'react-three-fiber';
import { ClickBox } from './click-box';

export const App: React.FC = () => (
  <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <ClickBox position={[-1.2, 0, 0]} />
    <ClickBox position={[1.2, 0, 0]} />
  </Canvas>
);
