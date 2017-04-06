import * as THREE from 'three';
import Scenographer from './scenographer';
export default class Actor {
    constructor () {
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.mesh = new THREE.Mesh( geometry, material );
        this.mesh.rotateY(Math.PI);
        this.durationRotation = 3000; //ms
        this.scenographer = new Scenographer();
        this.durationStep = 3000; //ms
        // probably these should go in a timeline class
        this.currentCommandIndex = 0;
        this.commandStartedAt = 0;
    }

    getStepDuration(){
        return this.durationStep;
    }

    getRotationDuration(){
        return this.durationRotation;
    }

    startConsume(instructions){
        if(instructions.length>0 && !this.scenographer.animating){
            this.scenographer.setScenes(instructions);
            this.scenographer.animating = true;
        }else if(this.scenographer.animating){
            console.log("instructions are already being executed");
        }else{
            console.log("no instructions to execute");
        }
    }

    _consumeCommands(time){
        if (!this.scenographer.animating || !this.scenographer.scenesAreAvailable()) return;
        
        let currentScene = this.scenographer.getCurrentScene();
        let key = currentScene["type"];
        let val = currentScene["value"];
        let duration = currentScene["duration"];
        let progress = 0;
        switch(key){
            case "move_forward":
                // let copy_pos = new THREE.Vector3().copy(this.mesh.position);
                // let target = copy_pos.add(new THREE.Vector3(0.0, 0.0, val/40));
                // let rotationMatrix = new THREE.Matrix4().makeRotationY(this.mesh.rotation.y);
                // target.applyMatrix4(rotationMatrix);
                // console.log(this.mesh.position);
                // this.mesh.position.set(target);
                // console.log(this.mesh.position);
                //tweens.push(this._moveForwardTween(val));
                
                this.mesh.translateZ(0.01);
            break;
            case "turn_right":
                this.mesh.rotateY(-0.01);
                //tweens.push(this._turnRightTween(val));
            break;
            case "turn_left":
                this.mesh.rotateY(+0.01);
                //tweens.push(this._turnRightTween(val));
            break;
            default:
                console.log("action "+key+" not implemented");
            break
        }
    }

    getMesh() {
       return this.mesh;
    }

    reset() {
        this.mesh.position.set(new THREE.Vector3(0.0, 0.0, 0.0));
        this.scenographer.resetScenes();
        this.mesh.rotation.set(0.0,0.0,0.0);
    }

    update(time){
        this.scenographer.update(time*1000);
        this._consumeCommands(time*1000);
    }
}