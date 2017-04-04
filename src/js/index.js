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

	window.Blockly.JavaScript['move_forward'] = function(block) {
		var dropdown_move_distance = block.getFieldValue('move_distance');
		// TODO: Assemble JavaScript into code variable.
		var code = "console.log('move forward');";
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



