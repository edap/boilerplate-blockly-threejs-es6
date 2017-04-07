import * as THREE from 'three';
export default class Actor {
    constructor () {
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.mesh = new THREE.Mesh( geometry, material );
        this.mesh.rotateY(Math.PI);
        this.instructions = [];
        this.target = new THREE.Object3D().copy(this.mesh, false);
        this.velocity = new THREE.Vector3();
        this.topSpeed = 0.1;
        this.accelleration = new THREE.Vector3(0.01,0.01,0.01);
        this.currentInstruction = null;
    }

    _limitVelocity(max){
        if(this.velocity > max){
            this.velocity = max;
        }
    }

    startConsume(instructions){
        this.instructions = instructions;
        if(this.instructions.length>0){
            this.currentInstruction = this.instructions.shift();
            this._setNewTarget(this.currentInstruction);
        }else{
            console.log("no instructions to execute");
        }
    }

    _consumeCommandsNew(){
        if(this.currentInstruction){
            let instruction = this.currentInstruction;
            let key = instruction["type"];
            switch(key){
                case "move_forward":
                let dir = new THREE.Vector3().copy(this.target.position);
                dir.sub(this.mesh.position)
                    .normalize()
                    .multiplyScalar(0.0005);

                this.velocity.add(dir);
                this._limitVelocity(this.topSpeed);
                this.mesh.position.add(this.velocity);
                break;
                default:
                    console.log("command not implemented");
                break;
            }
        }
    }

    _nextAnimation(){
        
    }

    _setNewTarget(instruction){
        let key = instruction["type"];
        let val = instruction["value"];
        switch(key){
            case "move_forward":
                this.target.translateZ(val);
            break;
            case "turn_right":
            break;
            case "turn_left":
            break;
            default:
                console.log("action "+key+" not implemented");
            break;
        }
    }

    getMesh() {
       return this.mesh;
    }

    reset() {
        this.mesh.position.set(new THREE.Vector3());
        this.target = new THREE.Object3D().copy(this.mesh, false);
        this.mesh.rotation.set(0.0,0.0,0.0); // not sure if this is the correct way to reset a rotation
    }

    update(time){
        this._consumeCommandsNew();
    }
}
