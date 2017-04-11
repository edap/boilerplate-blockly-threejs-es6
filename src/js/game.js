import * as THREE from 'three';
import Stats from 'stats.js';
import Actor from "./actor";
import Plane from "./plane";
const OrbitControls = require('three-orbit-controls')(THREE);

export default class Game {
    constructor(){
        this.debug = true;
        this.screenWidth = window.innerWidth/2;
        this.screenHeight = window.innerHeight;
        const OrbitControls = require('three-orbit-controls')(THREE);
        this.instructions = [];
        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75, this.screenWidth/this.screenHeight, 0.1, 1000 );
        this.canvas = document.getElementById('game-canvas');
        this.renderer = new THREE.WebGLRenderer({antialias:true});
        this.renderer.setSize(this.screenWidth, this.screenHeight);
        this.canvas.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.stats = new Stats();

        this.actor = new Actor();
        this.clock = new THREE.Clock();
        this.plane = new Plane();
    }

    initGame(){
        this.plane.rotateX(-Math.PI/2);
        this.scene.add( this.actor.getMesh() );
        this.scene.add(this.plane.getMesh());
        this.camera.position.z = 5;
        this.camera.position.y=2;

        // stats
        this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        this.stats.domElement.style.left=this.screenWidth*2 -80;
        if (this.debug) {
            this.canvas.appendChild(this.stats.domElement);
        }
        var axes = new THREE.AxisHelper(2);
        this.scene.add(axes);

        this.animate();
    }

    update(){
        let delta = this.clock.getDelta();
        let time = this.clock.getElapsedTime();
        this.actor.update(time);
        this.controls.update();
    }

    animate() {
        this.stats.begin();
        this.render();
        this.update();
        this.stats.end();
        requestAnimationFrame( this.animate.bind(this) );
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    };
}
