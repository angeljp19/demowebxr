import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.05, 1000);
camera.position.set(4, 2.5, -1);
camera.lookAt(0, 0, 0);

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

// Piso
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: 0x444444 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2;
floor.receiveShadow = true;
scene.add(floor);

// Luces mejoradas
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 2.0);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3.0);
directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true;
scene.add(directionalLight);

const fillLight = new THREE.PointLight(0xffffff, 1);
fillLight.position.set(-5, 5, 5);
scene.add(fillLight);

let rueda1, rueda2;
const loader = new GLTFLoader();
let mixer;
let animations;

loader.load('molino.glb', (gltf) => {
    gltf.scene.traverse(function(child) {
        if (child.isMesh) {
            if (!(child.material instanceof THREE.MeshStandardMaterial)) {
                child.material = new THREE.MeshStandardMaterial({
                    color: child.material.color || 0xffffff,
                    map: child.material.map
                });
            }
            child.material.needsUpdate = true;
        }
    });
    
    scene.add(gltf.scene);
    rueda1 = gltf.scene.getObjectByName('rueda1');
    rueda2 = gltf.scene.getObjectByName('rueda2');
    
    mixer = new THREE.AnimationMixer(gltf.scene);
    animations = gltf.animations;

    animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.play();
    });
});

function rotateWheel() {
    if (rueda1 && rueda2) {
        rueda1.rotation.x -= 0.03;
        rueda2.rotation.x -= 0.03;
    }
}

const clock = new THREE.Clock(); 

function animate() {
    renderer.setAnimationLoop(function() {
        const deltaTime = clock.getDelta();
        if (mixer) mixer.update(deltaTime);
        rotateWheel();
        renderer.render(scene, camera);
    });
}

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();