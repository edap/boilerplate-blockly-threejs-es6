import * as THREE from 'three';
import Scenographer from './scenographer';
export default class Actor {
    constructor () {
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.mesh = new THREE.Mesh( geometry, material );
        this.durationRotation = 3000;
        this.scenographer = new Scenographer();
        this.durationStep = 3000;
        this.animating=false;
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
        if(instructions.length>0 && !this.animating){
            this.scenographer.setScenes(instructions);
            this.animating=true;
        }else if(this.animating){
            console.log("instructions are already being executed");
        }else{
            console.log("no instructions to execute");
        }
    }

    _consumeCommands(time){
        if (!this.animating || !this.scenographer.scenesAreAvailable()) return;
        
        let currentScene = this.scenographer.getCurrentScene();
        let key = currentScene["type"];
        let val = currentScene["value"];
        let duration = currentScene["duration"];
        let progress = 0;
        switch(key){
            case "move_forward":
                this.mesh.translateZ(val/60);
                //tweens.push(this._moveForwardTween(val));
            break;
            case "turn_right":
                this.mesh.rotation.y += 0.001;
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

    rotateX(rotationDeg){
        this.mesh.rotation.x += rotationDeg;
    }

    rotateY(rotationDeg){
        this.mesh.rotation.y += rotationDeg;
    }



    update(time){
        this.scenographer.update(time);
        this._consumeCommands(time);
    }
}