import * as THREE from 'three';
import Stats from 'stats.js';
import Actor from "./actor";
import Plane from "./plane";

const debug = true;
let actor, plane, renderer, scene, camera, canvas, stats;

function initGame(){
	let halfScreenWidth = window.innerWidth/2;
	let halfScreenHeight = window.innerHeight/2;

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, halfScreenWidth/halfScreenHeight, 0.1, 1000 );
	canvas = document.getElementById( 'game-canvas' );
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(halfScreenWidth, halfScreenHeight);
	canvas.appendChild(renderer.domElement);
    plane = new Plane();
    plane.rotateX(-Math.PI/4);
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

	render();

	window.Blockly.JavaScript['actor_move_forward'] = function(block) {
        var dropdown_actor_move_forward_distance = block.getFieldValue('actor_move_forward_distance');
        actor.animationMove(dropdown_actor_move_forward_distance);
		// TODO: Assemble JavaScript into code variable.
		var code = "console.log('move forward');";
		return code;
	};

    window.Blockly.JavaScript['actor_turn_right'] = function(block) {
        var angle_actor_turn_right_value = block.getFieldValue('actor_turn_right_value');
		// TODO: Assemble JavaScript into code variable.
		var code = "console.log('actor_turn_right');";
		return code;
	};

    window.Blockly.JavaScript['actor_turn_left'] = function(block) {
        var angle_actor_turn_right_value = block.getFieldValue('actor_turn_left_value');
		// TODO: Assemble JavaScript into code variable.
		var code = "console.log('actor_turn_left');";
		return code;
	};

	window.Blockly.JavaScript['actor_jump'] = function(block) {
		// TODO: Assemble JavaScript into code variable.
		var code = "console.log('actor_jump');";
		return code;
	};
}

function render() {

	requestAnimationFrame( render );
	//actor.rotateX(0.1);
	//actor.rotateY(0.1);
	stats.begin();
	renderer.render(scene, camera);
	stats.end();
};
/*
move forward block
https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#h4ynt2

turn actor right
https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#n9y6ca

actor jump block
https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#av6o3o
*/

window.blockly_loaded = function(blockly) {
    // init the game only after window.Blockly definition
	window.Blockly = blockly;
	initGame();
}

window.run_code = function() {
	var code = window.Blockly.JavaScript.workspaceToCode(window.Blockly.mainWorkspace);
	console.log(window.Blockly.mainWorkspace);
	eval(code);
}



