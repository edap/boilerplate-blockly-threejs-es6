import * as THREE from 'three';
import TWEEN from 'tween.js';
export default class Actor {
    constructor () {
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.mesh = new THREE.Mesh( geometry, material );
    }

    consume(instructions){
        // how to stop chains
        // put some guards here https://github.com/tweenjs/tween.js/issues/75
        // how to stop https://github.com/tweenjs/tween.js/pull/95/commits/d8b2deb02c2d6fad9b7fdb5a9511669ef86d07dd
        let tweens = this._buildTweensChain(instructions);
        if(tweens.length>0){
            tweens[0].start();
        }else{
            console.log("no instructions to execute");
        }
    }

    _buildTweensChain(instructions){
        let tweens = [];
        instructions.forEach((command)=>{
            let key = command["type"];
            let val = command["value"];
            debugger;
            switch(key){
                case "move_forward":
                    tweens.push(this._moveForwardTween(val));
                break;
                case "turn_right":
                    tweens.push(this._turnRightTween(val));
                break;
                default:
                    console.log("action "+key+" not implemented");
                break
            }
            console.log(command);
        });
        for(let i = 0; i< tweens.length; i++){
            if(i!= tweens.length-1){
                tweens[i].chain(tweens[i+1]);  
            }
        }
        return tweens;   

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

    _moveForwardTween(_length){
        let length = Number(_length);
        let pos = this.mesh.position;
        let target = new THREE.Vector3(0.0, 0.0, length/10);
        let rotationMatrix = new THREE.Matrix4().makeRotationY(this.mesh.rotation.y);
        target.applyMatrix4(rotationMatrix);
        let tween = new TWEEN.Tween(pos).to(target, 300);
        return tween;
    }

    _turnRightTween(_length){
        let length = Number(_length);
        let pos = this.mesh.position;
        let target = new THREE.Vector3(0.0, 0.0, length/10);
        let rotationMatrix = new THREE.Matrix4().makeRotationY(this.mesh.rotation.y);
        target.applyMatrix4(rotationMatrix);
        let tween = new TWEEN.Tween(pos).to(target, 300);
        return tween;
    }

    animationMove(length){
        //let pos = this.mesh.position;
        let tween = this._moveForwardTween(length);
        tween.start();
    }

    animationTurnRight(deg){
       console.log(deg);
    }

    animationTurnLeft(deg){
       console.log(deg);
    }

    update(time){
        TWEEN.update( time );
    }
}