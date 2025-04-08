import * as THREE from 'three';

const directionalLightTop = new THREE.DirectionalLight(0xffffff, 5);
directionalLightTop.position.set(0, 10, 0); 
directionalLightTop.lookAt(0,0,0)

const directionalLightRight = new THREE.DirectionalLight(0xffffff, 5); 
directionalLightRight.position.set(10, 0, 0); 
directionalLightRight.lookAt(0,0,0)

const directionalLightLeft = new THREE.DirectionalLight(0xffffff, 5); 
directionalLightLeft.position.set(-10, 0, 0); 
directionalLightLeft.lookAt(0,0,0)

const directionalLightFront = new THREE.DirectionalLight(0xffffff, 5); 
directionalLightFront.position.set(0, 0, -10); 
directionalLightFront.lookAt(0,0,0)

const directionalLightBack = new THREE.DirectionalLight(0xffffff, 5); 
directionalLightBack.position.set(0, 0, 10); 
directionalLightBack.lookAt(0,0,0)


export function addLights(scene) {
    scene.add(directionalLightTop);
    scene.add(directionalLightRight);
    scene.add(directionalLightLeft);
    scene.add(directionalLightFront);
    scene.add(directionalLightBack);
}