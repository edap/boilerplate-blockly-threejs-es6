import * as THREE from 'three';
export default class Actor {
    constructor () {
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.mesh = new THREE.Mesh( geometry, material );
    }

    getMesh() {
       return this.mesh;
    }

    rotateX(rotationDeg){
        this.mesh.rotation.x += rotationDeg;
    }

    rotateY(rotationDeg){
        this.mesh.rotation.y += rotationDeg;
    }

    animationMove(length){
       console.log(length);
       this.mesh.translateZ(length);
    }

    animationTurnRight(deg){
       console.log(deg);
    }

    animationTurnLeft(deg){
       console.log(deg);
    }
}