import React from 'react';
import Block from './Block';

//cannot randomize color: color changes on state change

//scene is 400 x 400 (x, z)
const WorldLayout = (props) => {
  return (
    <>
      {/* southwest park*/}
      <Block size={[40, 0.2, 40]} position={[-150, 0, 150]} color={'green'} />
      <Block size={[100, 30, 40]} position={[-60, 0, 150]} color={0xb0a392} />
      <Block size={[40, 20, 40]} position={[30, 0, 150]} color={0xb0a392} />
      <Block size={[100, 30, 40]} position={[120, 0, 150]} color={0x6495ed} />
      <Block size={[40, 10, 40]} position={[-90, 0, 90]} color={0x000000} />
      <Block size={[100, 20, 40]} position={[0, 0, 90]} color={0x6495ed} />
      {/* southeast park*/}
      <Block size={[40, 0.2, 40]} position={[150, 0, 90]} color={'green'} />
      <Block size={[40, 20, 100]} position={[-150, 0, 60]} color={0x992d2b} />
      <Block size={[40, 30, 100]} position={[90, 0, 60]} color={0x6495ed} />
      <Block size={[40, 40, 40]} position={[150, 0, 30]} color={0x992d2b} />
      <Block size={[40, 20, 100]} position={[-90, 0, 0]} color={0xebebeb} />
      {/* center park*/}
      <Block size={[100, 0.2, 100]} position={[0, 0, 0]} color={'green'} />
      {/* west park*/}
      <Block size={[40, 0.2, 40]} position={[-150, 0, -30]} color={'green'} />
      <Block size={[100, 30, 40]} position={[120, 0, -30]} color={0x242424} />
      <Block size={[40, 20, 40]} position={[-90, 0, -90]} color={0xebebeb} />
      <Block size={[40, 30, 40]} position={[-30, 0, -90]} color={0xebebeb} />
      <Block size={[40, 10, 40]} position={[90, 0, -90]} color={0xb0a392} />
      <Block size={[40, 30, 40]} position={[150, 0, -90]} color={0x992d2b} />
      <Block size={[40, 20, 100]} position={[-150, 0, -120]} color={0x000000} />
      <Block size={[40, 10, 100]} position={[30, 0, -120]} color={0x6495ed} />
      <Block size={[100, 20, 40]} position={[-60, 0, -150]} color={0x6495ed} />
      {/* northeest park*/}
      <Block size={[100, 0.2, 40]} position={[120, 0, -150]} color={'green'} />
    </>
  );
};

export default WorldLayout;
