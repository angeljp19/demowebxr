import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import {addLights} from './lighting.js';
import {addMolino1, rotateWheelMolino1, mixerMolino1} from './molino1.js';
import {addMolino2, rotateWheelMolino2, mixerMolino2} from './molino2.js';
import {ensamblarMolino, toggleAnimacionMolino, updateMolino, getDirection} from './molinoEnsamble.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.05, 1000);
camera.position.set(0, -1, 2);
// camera.lookAt(2, 2, 2);

const renderer = new THREE.WebGLRenderer({ 
  antialias: true,
  alpha: false
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.xr.enabled = true;
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
renderer.physicallyCorrectLights = true;
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

addLights(scene);
addMolino1(scene);
ensamblarMolino(scene);

let activeMachine = false
let activeEnsamble = false
const clock = new THREE.Clock(); 
function animate() {
    renderer.setAnimationLoop(function() {
        const deltaTime = clock.getDelta();
        mixerMolino1(deltaTime, activeMachine);
        updateMolino(deltaTime);
        rotateWheelMolino1(activeMachine)
        renderer.render(scene, camera);
    });
    

}


window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
document.getElementById('btnActivarMaquina').addEventListener('click', function() {
    activeMachine = !activeMachine;
    if (activeMachine) {
        document.getElementById('btnActivarMaquina').innerText = 'Desactivar Máquina';
    } else {
        document.getElementById('btnActivarMaquina').innerText = 'Activar Máquina';
    }
})

document.getElementById('btnVerPartes').addEventListener('click', () => {
    toggleAnimacionMolino()
    activeEnsamble = !activeEnsamble
    document.getElementById('btnVerPartes').innerText = getDirection() === -1 ? 'Desarmar' : 'Armar'
})
animate();