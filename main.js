import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

// Piso
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: 0x444444 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2;
floor.receiveShadow = true;
scene.add(floor);


const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(0, 10, 0); 
directionalLight.lookAt(0,0,0)
scene.add(directionalLight);


const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dirLightHelper);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 5); 
directionalLight2.position.set(10, 0, 0); 
directionalLight2.lookAt(0,0,0)
scene.add(directionalLight2);

const dirLightHelper2 = new THREE.DirectionalLightHelper(directionalLight2, 5);
// scene.add(dirLightHelper2);

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 5); 
directionalLight3.position.set(-10, 0, 0); 
directionalLight3.lookAt(0,0,0)
scene.add(directionalLight3);

const dirLightHelper3 = new THREE.DirectionalLightHelper(directionalLight3, 5);
// scene.add(dirLightHelper3);

const directionalLight4 = new THREE.DirectionalLight(0xffffff, 5); 
directionalLight4.position.set(0, 0, -10); 
directionalLight4.lookAt(0,0,0)
scene.add(directionalLight4);

const dirLightHelper4 = new THREE.DirectionalLightHelper(directionalLight4, 5);
// scene.add(dirLightHelper4);

const directionalLight5 = new THREE.DirectionalLight(0xffffff, 5); 
directionalLight5.position.set(0, 0, 10); 
directionalLight5.lookAt(0,0,0)
scene.add(directionalLight5);

const dirLightHelper5 = new THREE.DirectionalLightHelper(directionalLight5, 5);
// scene.add(dirLightHelper5);

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
    camera.position.set(4, 2.5, -1);
    camera.lookAt(0, 0, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();