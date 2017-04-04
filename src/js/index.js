// import Person from "./person";

// let person = new Person("Dave", "Prati");

import * as THREE from 'three';

//THREE.JS test
var canvas, renderer;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
canvas = document.getElementById( 'mycanvas' );
renderer = new THREE.WebGLRenderer();
renderer.domElement = canvas;
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var render = function () {
  requestAnimationFrame( render );

  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;

  renderer.render(scene, camera);
};

render();