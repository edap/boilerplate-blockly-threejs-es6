import * as THREE from 'three';
import TWEEN from 'tween.js';
import Stats from 'stats.js';
import Actor from "./actor";
import Plane from "./plane";
import Commander from "./commander";

const debug = true;
const OrbitControls = require('three-orbit-controls')(THREE);
let instructions = [];
let actor, plane, renderer, scene, camera, canvas, stats, controls;

function initGame(){
	let halfScreenWidth = window.innerWidth/2;
	let halfScreenHeight = window.innerHeight/2;

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, halfScreenWidth/halfScreenHeight, 0.1, 1000 );
	canvas = document.getElementById('game-canvas');
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(halfScreenWidth, halfScreenHeight);
	canvas.appendChild(renderer.domElement);
	controls = new OrbitControls(camera, renderer.domElement);

    plane = new Plane();
    plane.rotateX(-Math.PI/2);
    actor = new Actor();
	scene.add( actor.getMesh() );
	scene.add(plane.getMesh());

	camera.position.z = 5;

	// stats
    stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.domElement.style.left=halfScreenWidth*2 -80;
	if (debug) {
        canvas.appendChild(stats.domElement);
    }
    var axes = new THREE.AxisHelper(2);
    scene.add(axes);

	animate();

	window.Blockly.JavaScript['actor_move_forward'] = function(block) {
        var dropdown_actor_move_forward_distance = block.getFieldValue('actor_move_forward_distance');
        //actor.animationMove(dropdown_actor_move_forward_distance);
        instructions.push({"type":"move_forward", "value": dropdown_actor_move_forward_distance});
		var code = "console.log('move forward');";
		return code;
	};

    window.Blockly.JavaScript['actor_turn_right'] = function(block) {
        var angle_actor_turn_right_value = block.getFieldValue('actor_turn_right_value');
        instructions.push({"type":"turn_right", "value": angle_actor_turn_right_value});
		var code = "console.log('actor_turn_right');";
		return code;
	};

    window.Blockly.JavaScript['actor_turn_left'] = function(block) {
        var angle_actor_turn_left_value = block.getFieldValue('actor_turn_left_value');
        instructions.push({"type":"turn_left", "value": angle_actor_turn_left_value});
		var code = "console.log('actor_turn_left');";
		return code;
	};

	window.Blockly.JavaScript['actor_jump'] = function(block) {
		var code = "console.log('actor_jump');";
		return code;
	};
}

function animate(time) {
	stats.begin();
	actor.update(time)
	render();
	controls.update;
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
}

window.run_code = function() {
	//reset instructions if the player did not complete everything
	// probably you should reset the position too
	instructions=[];
	var code = window.Blockly.JavaScript.workspaceToCode(window.Blockly.mainWorkspace);
	console.log(instructions);
	eval(code);
	console.log();
	actor.consume(instructions);
	actor.testChained();
}



