import * as THREE from 'three';
import Actor from "./actor";

let actor, renderer, scene, camera, canvas;

function initGame(){
	let halfScreenWidth = window.innerWidth/2;
	let halfScreenHeight = window.innerHeight/2;

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, halfScreenWidth/halfScreenHeight, 0.1, 1000 );
	canvas = document.getElementById( 'game-canvas' );
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(halfScreenWidth, halfScreenHeight);
	canvas.appendChild(renderer.domElement);

    actor = new Actor();
	scene.add( actor.getMesh() );
	camera.position.z = 5;
	render();

	window.Blockly.JavaScript['actor_move_forward'] = function(block) {
        var dropdown_actor_move_forward_distance = block.getFieldValue('actor_move_forward_distance');
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
	actor.rotateX(0.1);
	actor.rotateY(0.1);
	renderer.render(scene, camera);
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
	console.log(window.Blockly.mainWorkspace);
	var code = window.Blockly.JavaScript.workspaceToCode(window.Blockly.mainWorkspace);
	eval(code);
}



