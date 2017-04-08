import * as THREE from 'three';
import Stats from 'stats.js';
import Actor from "./actor";
import Plane from "./plane";

const debug = true;
const OrbitControls = require('three-orbit-controls')(THREE);
let instructions = [];
let actor, plane, renderer, scene, camera, canvas, stats, controls, clock;

function initGame(){
    clock = new THREE.Clock();
    let screenWidth = window.innerWidth/2;
    let screenHeight = window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, screenWidth/screenHeight, 0.1, 1000 );
    canvas = document.getElementById('game-canvas');
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(screenWidth, screenHeight);
    canvas.appendChild(renderer.domElement);
    controls = new OrbitControls(camera, renderer.domElement);

    plane = new Plane();
    plane.rotateX(-Math.PI/2);
    actor = new Actor();
    scene.add( actor.getMesh() );
    scene.add(plane.getMesh());

    camera.position.z = 5;
    camera.position.y=2;

    // stats
    stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.domElement.style.left=screenWidth*2 -80;
	 if (debug) {
        canvas.appendChild(stats.domElement);
    }
    var axes = new THREE.AxisHelper(2);
    scene.add(axes);

	  animate();

    window.Blockly.JavaScript['actor_move_forward'] = function(block) {
        var dropdown_actor_move_forward_distance = block.getFieldValue('actor_move_forward_distance');
        var code = "instructions.push({type:'move_forward',value:"+dropdown_actor_move_forward_distance+"});";
        return code;
    };

    window.Blockly.JavaScript['actor_turn_right'] = function(block) {
        var angle_actor_turn_right_value = block.getFieldValue('actor_turn_right_value');
        var code = "instructions.push({type:'turn_right',value:"+angle_actor_turn_right_value+"});";
        return code;
    };

    window.Blockly.JavaScript['actor_turn_left'] = function(block) {
        var angle_actor_turn_left_value = block.getFieldValue('actor_turn_left_value');
        var code = "instructions.push({type:'turn_left',value:"+angle_actor_turn_left_value+"});";
        return code;
    };

    window.Blockly.JavaScript['actor_jump'] = function(block) {
        var code = "console.log('actor_jump');";
        return code;
    };
}

function animate() {
    stats.begin();
    let delta = clock.getDelta();
    let time = clock.getElapsedTime();
    actor.update(time);
    render();
    controls.update();
    //console.log(actor.getMesh().position)
    stats.end();
    requestAnimationFrame( animate );
}

function render() {
    renderer.render(scene, camera);
};

window.blockly_loaded = function(blockly) {
    // init the game only after window.Blockly definition
    window.Blockly = blockly;
    initGame();
};

window.reset_car = function() {
    actor.reset();
};

window.run_code = function() {
    //reset instructions if the player did not complete everything
    // probably you should reset the position too
    instructions=[];
    var code = window.Blockly.JavaScript.workspaceToCode(window.Blockly.mainWorkspace);
    eval(code);
    actor.startConsume(instructions);
};



