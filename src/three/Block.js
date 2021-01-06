import React from 'react';
import Building from './Building';
import Sidewalk from './Sidewalk';

const Block = (props) => {
  return (
    <>
      <Building
        position={[props.position[0], props.size[1] / 2, props.position[2]]}
        args={[props.size[0] - 5, props.size[1], props.size[2] - 5, 5, 5, 5]}
        color={props.color}
      />
      <Sidewalk position={props.position} size={props.size} />
    </>
  );
};

export default Block;
