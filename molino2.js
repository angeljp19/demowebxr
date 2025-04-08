import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let molino, mixer, animations, ruedaRight, ruedaLeft
function addMolino2(scene){
    const loader = new GLTFLoader()
    loader.load('molino.glb', (gltf) => {
        molino = gltf.scene
        molino.position.set(-3, 0, 0);
        molino.rotation.z = -1.5
        scene.add(molino)

        ruedaLeft = molino.getObjectByName('rueda1')
        ruedaRight = molino.getObjectByName('rueda2')

        mixer = new THREE.AnimationMixer(molino)
        animations = gltf.animations
        animations.forEach((clip) => {
            const action = mixer.clipAction(clip)
            action.setLoop(THREE.LoopRepeat, Infinity)
            action.play()
        })
    })
}

function mixerMolino2(deltaTime){
    if(mixer) mixer.update(deltaTime)
}

function rotateWheelMolino2() {
    if (ruedaRight && ruedaLeft) {
        ruedaRight.rotation.x -= 0.03;
        ruedaLeft.rotation.x -= 0.03;
    }
}

export { addMolino2, rotateWheelMolino2, mixerMolino2 };