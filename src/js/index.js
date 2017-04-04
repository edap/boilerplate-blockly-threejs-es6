import * as THREE from 'three';
import Actor from "./actor";

let actor, renderer, scene, camera, canvas;

function init(){
	console.log(window.Blockly);
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
}

function render() {
	requestAnimationFrame( render );
	actor.rotateX(0.1);
	actor.rotateY(0.1);
	renderer.render(scene, camera);
};

window.blockly_loaded = function(blockly) {
  console.log("called");
  init();
  return window.Blockly = blockly;
}

window.run_code = function() {
  console.log(window.Blockly.mainWorkspace);
  let code = window.Blockly.JavaScript.workspaceToCode(window.Blockly.mainWorkspace);
  eval(code);
}

