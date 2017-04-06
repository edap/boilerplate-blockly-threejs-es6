import * as THREE from 'three';
import TWEEN from 'tween.js';
export default class Actor {
    constructor () {
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.mesh = new THREE.Mesh( geometry, material );
        this.currentAnimationIndex = 0;
    }


    consume(instructions){
        // how to stop chains
        // put some guards here https://github.com/tweenjs/tween.js/issues/75
        // how to stop https://github.com/tweenjs/tween.js/pull/95/commits/d8b2deb02c2d6fad9b7fdb5a9511669ef86d07dd
        let tweens = this._buildTweensChain(instructions);
        if(tweens.length>0){
            tweens[0].start().onComplete(()=>{
                //debugger;
                if(this.currentAnimationIndex < tweens.length+1){
                    this.currentAnimationIndex++;
                    tweens[this.currentAnimationIndex].start();
                }
            });
        }else{
            console.log("no instructions to execute");
        }
    }

    _buildTweensChain(instructions){
        let tweens = [];
        instructions.forEach((command)=>{
            let key = command["type"];
            let val = command["value"];
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
        // for(let i = 0; i< tweens.length; i++){
        //     if(i!= tweens.length-1){
        //         tweens[i].chain(tweens[i+1]);  
        //     }
        // }
        //console.log(tweens);
        return tweens;   

    }

    getMesh() {
       return this.mesh;
    }

    reset() {
        this.mesh.position.set(new THREE.Vector3(0.0, 0.0, 0.0));
        this.mesh.currentAnimationIndex = 0;
        this.mesh.rotation.set(0.0,0.0,0.0);
    }

    rotateX(rotationDeg){
        this.mesh.rotation.x += rotationDeg;
    }

    rotateY(rotationDeg){
        this.mesh.rotation.y += rotationDeg;
    }

    testChained(){
        let radians = 90 * THREE.Math.DEG2RAD;

        let pos_copy_a = new THREE.Vector3().copy(this.mesh.position);
        let target_a = pos_copy_a.add(new THREE.Vector3(0.0, 0.0, 0.8));
        let rotationMatrix_a = new THREE.Matrix4().makeRotationY(this.mesh.rotation.y);
        target_a.applyMatrix4(rotationMatrix_a);
        let a = new TWEEN.Tween(this.mesh.position).to(target_a, 300).onComplete(()=>{
            console.log("animation a");
            console.log(this.mesh.position);
            console.log(this.mesh.rotation);
        }).onUpdate(()=>{
            this.mesh.position.set(target_a);
        });

        let target_b = {y:this.mesh.rotation.y + radians};
        let b = new TWEEN.Tween(this.mesh.rotation).to(target_b, 300).onComplete(()=>{
            console.log("animation b");
            //console.log(this.mesh.position);
            //console.log(this.mesh.rotation);  
        }).onUpdate(()=>{
            this.mesh.rotation.set(target_b);
        });

        let pos_copy_c = new THREE.Vector3().copy(this.mesh.position);
        let target_c = pos_copy_c.add(new THREE.Vector3(0.0, 0.0, 2.8));
        let rotationMatrix_c = new THREE.Matrix4().makeRotationY(this.mesh.rotation.y);
        target_c.applyMatrix4(rotationMatrix_c);

        let c = new TWEEN.Tween(this.mesh.position).to(target_c, 300)
        .onComplete(()=>{
            console.log("animation c");
                    console.log(target_c);
            console.log(this.mesh.position);
            console.log(this.mesh.rotation);
        }).onUpdate(()=>{
            this.mesh.position.set(target_c);
        });
        a.chain(b);
        b.chain(c);
        a.start();
    }

    _moveForwardTween(_length){
        let length = Number(_length);
        let rotationMatrix_c = new THREE.Matrix4().makeRotationY(this.mesh.rotation.y);
        let distance = new THREE.Vector3(0.0, 0.0, length/10);
        distance.applyMatrix4(rotationMatrix_c);
        let target = {
            x: String(distance.x),
            y: String(distance.y),
            z: String(distance.z)
        }
        console.log(target);
        let tween = new TWEEN.Tween(this.mesh.position).to(target, 300);
        return tween;
    }

    // Rotation and tweenjs http://stackoverflow.com/questions/9094971/threejs-rotation-animation
    _turnRightTween(_degree){
        let radians = Number(_degree) * THREE.Math.DEG2RAD;
        let radiansToString = String("+"+radians);
        let target = {y:radiansToString};
        let tween = new TWEEN.Tween(this.mesh.rotation).to(target, 300);
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