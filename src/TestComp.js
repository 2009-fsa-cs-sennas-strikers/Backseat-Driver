import React from "react";
import {useLoader} from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import car from './models/models/McLaren.glb'


const Box = (props) => {
    const gltf = useLoader(GLTFLoader, car)

    return (
        <primitive object={gltf.scene} position={[0,0,0]} />
    )
}


export default Box