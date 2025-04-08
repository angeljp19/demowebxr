import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let molino, mixer, actions = []
let direction = -1
function ensamblarMolino(scene){
    const loader = new GLTFLoader()
    loader.load('molinoEnsamble.glb', function(gltf) {
        molino = gltf.scene
        scene.add(molino)

        mixer = new THREE.AnimationMixer(molino)
        gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip)
            action.setLoop(THREE.LoopOnce)
            action.clampWhenFinished = true 
            actions.push(action)
        })
    })
}

function updateMolino(delta){
    if (mixer) {
        mixer.update(delta)
    }
}

function toggleAnimacionMolino() {
    direction *= -1
    actions.forEach(action => {
        action.paused = false
        action.enabled = true
        action.timeScale = direction
        action.play()
        action.time = (direction === -1) ? action.getClip().duration : 0
    })
}

function getDirection() {
    return direction
}

export {ensamblarMolino, toggleAnimacionMolino, updateMolino, getDirection}