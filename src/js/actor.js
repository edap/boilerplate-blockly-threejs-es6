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
        console.log(this.mesh.position);
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
            let movementValue = instruction["value"];
            let dir = null;
            switch(movementType){
                case "move_forward":
                    dir = new THREE.Vector3().subVectors(this.target.position, this.mesh.position);
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
                case "jump_forward":
                    dir = new THREE.Vector3().subVectors(this.target.position, this.mesh.position);
                    let upForce = new THREE.Vector3(0,(0.012*(dir.length()/movementValue)),0);
                    dir.setLength(this.topAccelleration);
                    //apply forces
                    this.applyForce(dir);
                    this.applyForce(upForce);
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

                case "turn":
                    if (movementValue==="turnLeft") {
                        this.mesh.rotateY(this.angularVelocity);
                        this.currentRadiansOnY += this.angularVelocity;
                    } else {
                        this.mesh.rotateY(-this.angularVelocity);
                        this.currentRadiansOnY += this.angularVelocity;
                    }
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
        this.velocity.multiplyScalar(0);
        if(this.instructions.length >0){
            this.currentInstruction = this.instructions.shift();
            this._setNewTarget(this.currentInstruction);
        }else{
            this.currentInstruction = null;
        }
    }

    _targetReached(movement){
        if(movement === "move_forward" || movement == "jump_forward"){
            let distance = this.mesh.position.distanceTo(this.target.position);
            return distance <= 0.01;
        }else if(movement === "turn"){
            return (this.currentRadiansOnY >= this.targetRadiansOnY);
        }
    }

    _setNewTarget(instruction){
        let key = instruction["type"];
        let val = instruction["value"];
        let rad;
        switch(key){
            case "move_forward":
                this.target.translateZ(val);
            break;
            case "jump_forward":
                this.target.translateZ(val);
            break;
            case "turn":
                rad = 90 * (Math.PI/180);
                this.targetRadiansOnY = rad;
                this.currentRadiansOnY = 0;
                if (val === "turnLeft") {
                    this.target.rotateY(rad);
                } else {
                    this.target.rotateY(-rad);
                }
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
        let origin = new THREE.Vector3(0.0, 0.0, 0.0);
        this.mesh.position.setX(origin.x);
        this.mesh.position.setY(origin.y);
        this.mesh.position.setZ(origin.z);
        this.mesh.rotation.set(0.0,0.0,0.0); // TODO. Not sure if this is the correct way to reset a rotation
        this.mesh.rotateY(Math.PI);
        this.accelleration = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
        this.targetRadiansOnY = 0;
        this.currentRadiansOnY = 0;

        this.target = new THREE.Object3D().copy(this.mesh, false);

        console.log(this.mesh.position);
    }

    update(time){
        this._consumeCommandsNew();
    }

    getRandomArbitrary(min, max){
        return Math.random() * (max -min) +min;
    }
}
