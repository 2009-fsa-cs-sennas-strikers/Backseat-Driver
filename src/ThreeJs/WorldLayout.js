import React from 'react';
import Block from './Block';

//scene is 400 x 400 (x, z)
const WorldLayout = (props) => {
  return (
    <>
      {/* southwest park*/}
      <Block size={[40, 10, 40]} position={[-150, 0, 150]} />
      <Block size={[100, 30, 40]} position={[-60, 0, 150]} />
      <Block size={[40, 20, 40]} position={[30, 0, 150]} />
      <Block size={[100, 30, 40]} position={[120, 0, 150]} />
      <Block size={[40, 10, 40]} position={[-90, 0, 90]} />
      <Block size={[100, 20, 40]} position={[0, 0, 90]} />
      <Block size={[40, 30, 40]} position={[150, 0, 90]} />
      {/* southeast park*/}
      <Block size={[40, 2, 100]} position={[-150, 0, 60]} />
      <Block size={[40, 30, 100]} position={[90, 0, 60]} />
      <Block size={[40, 40, 40]} position={[150, 0, 30]} />
      <Block size={[40, 20, 100]} position={[-90, 50, 0]} />
      {/* center park*/}
      <Block size={[100, 2, 100]} position={[0, 0, 0]} />
      {/* west park*/}
      <Block size={[40, 2, 40]} position={[-150, 0, -30]} />
      <Block size={[100, 30, 40]} position={[120, 0, -30]} />
      <Block size={[40, 20, 40]} position={[-90, 0, -90]} />
      <Block size={[40, 30, 40]} position={[-30, 0, -90]} />
      <Block size={[40, 10, 40]} position={[90, 0, -90]} />
      <Block size={[40, 30, 40]} position={[150, 0, -90]} />
      <Block size={[40, 20, 100]} position={[-150, 0, -120]} />
      <Block size={[40, 10, 100]} position={[30, 0, -120]} />
      <Block size={[100, 20, 40]} position={[-60, 0, -150]} />
      {/* northeest park*/}
      <Block size={[100, 2, 40]} position={[120, 0, -150]} />
    </>
  );
};

export default WorldLayout;
