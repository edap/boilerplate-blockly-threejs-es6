import * as THREE from 'three';
export default class Actor {
    constructor () {
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.mesh = new THREE.Mesh( geometry, material );
        this.mesh.rotateY(Math.PI);
        this.instructions = [];
        this.target = new THREE.Object3D().copy(this.mesh, false);
        this.mass = 10;
        this.velocity = new THREE.Vector3();
        this.topSpeed = 0.1;
        this.accelleration = new THREE.Vector3();
        this.currentInstruction = null;
        this.gravityForce=  new THREE.Vector3(0.0,-0.01,0.0);
    }

    applyForce(force){
        let copyForce = new THREE.Vector3().copy(force);
        copyForce.divideScalar(this.mass);
        this.accelleration.add(copyForce);
    }

    _limitVelocity(max){
        if(this.velocity > max){
            this.velocity = max;
        }
    }

    _limitGravity(){
        //fake plane contact. Objects does not disappear under the ground
        if(this.mesh.position.y < 0){
            this.mesh.translateY(0.0);
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
                this.accelleration = dir;
                this.applyForce(this.gravityForce);
                // this.applyForce(new THREE.Vector3(
                //     this.getRandomArbitrary(-0.001, 0.001),
                //     this.getRandomArbitrary(-0.001, 0.001),
                //     this.getRandomArbitrary(-0.001, 0.001)
                // ));
                this.velocity.add(this.accelleration);
                this._limitVelocity(this.topSpeed);
                this._limitGravity();
                this.mesh.position.add(this.velocity);
                this.accelleration.multiplyScalar(0);
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
    getRandomArbitrary(min, max){
        return Math.random() * (max -min) +min;
    }

}
