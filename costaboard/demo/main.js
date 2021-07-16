import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

let camera, controls, scene, renderer, loader, board;

init();

animate();

function init() {

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xffffff );
  document.body.appendChild( renderer.domElement );


  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 200, 200, 0 );

  // controls

  controls = new OrbitControls( camera, renderer.domElement );

  // world

  loader = new GLTFLoader();
  loader.load('resources/board.gltf', function(gltf) {
      board = gltf.scene;
      board.scale.set(4,4,4);
      scene.add(board);
  });

  // lights

  const dirLight1 = new THREE.DirectionalLight( 0xffffff );
  dirLight1.position.set( 1, 1, 1 );
  scene.add( dirLight1 );

  const dirLight2 = new THREE.DirectionalLight( 0xaaaaaa );
  dirLight2.position.set( - 1, - 1, - 1 );
  scene.add( dirLight2 );

  const ambientLight = new THREE.AmbientLight( 0x777777 );
  scene.add( ambientLight );

  //

}

function animate() {

  requestAnimationFrame( animate );

  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

  render();

}

function render() {

  renderer.render( scene, camera );

}