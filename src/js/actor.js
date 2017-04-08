import * as THREE from 'three';
export default class Actor {
    constructor () {
        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        this.mesh = new THREE.Mesh( geometry, material );
        this.mesh.rotateY(Math.PI);
        this.instructions = [];
        this.target = new THREE.Object3D().copy(this.mesh, false);
        this.targetRadiansOnY = 0;
        this.currentRadiansOnY = 0;
        this.mass = 0.1;
        this.velocity = new THREE.Vector3();
        this.angularVelocity = 0.015;
        this.topSpeed = 0.05;
        this.topAccelleration = 0.0015;
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
        this.velocity.clampLength(-0.2,0.2);
    }

    _limitGravity(){
        //fake plane contact. Objects does not disappear under the ground
        if(this.mesh.position.y < 0){
            this.mesh.position.setY(0.0);
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
            let movementType = instruction["type"];
            switch(movementType){
                case "move_forward":
                    let dir = new THREE.Vector3().subVectors(this.target.position, this.mesh.position);
                    dir.setLength(this.topAccelleration);
                    //apply forces
                    this.applyForce(dir);
                    this.applyForce(this.gravityForce);
                    // add accelleration
                    this.velocity.add(this.accelleration);
                    //limits
                    this._limitVelocity(this.topSpeed);
                    //position object
                    this.mesh.position.add(this.velocity);
                    this._limitGravity();
                    // reset forces
                    this.accelleration.multiplyScalar(0.0);
                break;
                case "turn_right":
                     this.mesh.rotateY(-this.angularVelocity);
                     this.currentRadiansOnY += this.angularVelocity;
                break;
                case "turn_left":
                    this.mesh.rotateY(this.angularVelocity);
                    this.currentRadiansOnY += this.angularVelocity;
                break;
                default:
                    console.log("command not implemented");
                break;

            }
            if(this._targetReached(movementType)){
                this._nextAnimation();
            }
        }
    }

    _nextAnimation(){
        if(this.instructions.length >0){
            this.currentInstruction = this.instructions.shift();
            this._setNewTarget(this.currentInstruction);
        }else{
            this.currentInstruction = null;
        }
    }

    _targetReached(movement){
        if(movement === "move_forward"){
            let distance = this.mesh.position.distanceTo(this.target.position);
            return distance <= 0.01;
        }else if(movement === "turn_right" || movement === "turn_left"){
            return (this.currentRadiansOnY >= this.targetRadiansOnY);
        }
    };

    _setNewTarget(instruction){
        let key = instruction["type"];
        let val = instruction["value"];
        let rad;
        switch(key){
            case "move_forward":
                this.target.translateZ(val);
            break;
            case "turn_right":
                rad = val * (Math.PI/180);
                this.targetRadiansOnY = rad;
                this.currentRadiansOnY = 0;
                this.target.rotateY(-rad);
            break;
            case "turn_left":
                rad = val * (Math.PI/180);
                this.targetRadiansOnY = rad;
                this.currentRadiansOnY = 0;
                this.target.rotateY(rad);
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
        this.mesh.rotation.set(0.0,0.0,0.0); // TODO. Not sure if this is the correct way to reset a rotation
        this.targetRadiansOnY = 0;
        this.currentRadiansOnY = 0;
    }

    update(time){
        this._consumeCommandsNew();
    }

    getRandomArbitrary(min, max){
        return Math.random() * (max -min) +min;
    }
}
