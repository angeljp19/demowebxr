import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let molino, mixer, animations, ruedaRight, ruedaLeft
function addMolino1(scene){
    const loader = new GLTFLoader()
    loader.load('molino.glb', (gltf) => {
        molino = gltf.scene
        molino.position.set(-5, 0,-5)
        molino.rotation.x = 1.6
        molino.rotation.y = 1.6
        scene.add(molino)

        ruedaRight = molino.getObjectByName('rueda1')
        ruedaLeft = molino.getObjectByName('rueda2')

        mixer = new THREE.AnimationMixer(molino)
        animations = gltf.animations
        animations.forEach((clip) => {
            const action = mixer.clipAction(clip)
            action.setLoop(THREE.LoopRepeat, Infinity)
            action.play()
        })
    })}


function rotateWheelMolino1(activeMachine) {
    if (ruedaRight && ruedaLeft && activeMachine) {
        ruedaRight.rotation.x -= 0.03;
        ruedaLeft.rotation.x -= 0.03;
    }

}
function mixerMolino1(deltaTime, activeMachine){
    if (mixer && activeMachine) mixer.update(deltaTime)
}

export { addMolino1, rotateWheelMolino1, mixerMolino1};