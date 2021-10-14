import * as THREE from 'https://cdn.skypack.dev/three@0.118/build/three.module.js';

import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.118/examples/jsm/controls/OrbitControls.js';

let scene, renderer, camera, controls, molecule, line;

let wire_color = 0x00ff00; // line color
let threshold = 3; // 0-15 to reduce edges
let transparent_bg = true; // false for solid color background
let bg_color = 0x002222; // solid color background
let draggable = true; // false for turning off click-drag to rotate

document.addEventListener('DOMContentLoaded', function(){ 
    init();
    animate();
}, false);

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  if(!transparent_bg) {
    renderer.setClearColor( bg_color );
  }
  document.getElementById("molecule").appendChild( renderer.domElement );


  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 0, 20, 20 );

  controls = new OrbitControls( camera, renderer.domElement );
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.enableZoom = false;
  controls.rotateSpeed = .3;
  controls.autoRotateSpeed = 1;
  if(!draggable) {
    controls.enabled = false;
  }

  const loader = new GLTFLoader();
  loader.load('model/molecule.gltf', function(gltf) {
      molecule = gltf.scene;
      molecule.traverse((node) => {
        if (!node.isMesh) return;
        const edges = new THREE.EdgesGeometry( node.geometry, threshold );
        line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: wire_color } ) );
        scene.add( line );
      });
  });

  let ambientLight = new THREE.AmbientLight( 0xffffff );
  scene.add( ambientLight );

  window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

  requestAnimationFrame( animate );
  controls.update();

  if(line) {
    line.rotateX(.002);
    line.rotateZ(-.002);
  }

  render();

}

function render() {

  renderer.render( scene, camera );

}