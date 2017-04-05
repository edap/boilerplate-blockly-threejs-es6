import * as THREE from 'three';
export default class Plane {
    constructor () {
        let geometry = new THREE.PlaneBufferGeometry( 10, 10, 1 );
        let material = new THREE.MeshBasicMaterial( { color: 0xe6e6e6 } );
        this.mesh = new THREE.Mesh( geometry, material );
    }

    getMesh() {
       return this.mesh;
    }

    rotateX(rotationDeg){
        this.mesh.rotation.x += rotationDeg;
    }
}