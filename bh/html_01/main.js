import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

let camera, controls, scene, renderer, loader, obj;

let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const mouse = new THREE.Vector2();

function onDocumentMouseMove( event ) {

  mouseX = ( event.clientX - windowHalfX ) / 50;
  mouseY = ( event.clientY - windowHalfY ) / 50;

  event.preventDefault();

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

init();

animate();

function init() {

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0x000000 );
  document.body.appendChild( renderer.domElement );


  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 0, 0, 4 );

  // controls

  // controls = new OrbitControls( camera, renderer.domElement );

  // world

  loader = new GLTFLoader();
  loader.load('resources/alien.gltf', function(gltf) {
      obj = gltf.scene;
      // obj.traverse((node) => {
      //   if (!node.isMesh) return;
      //   // node.material.wireframe = true;
      //   node.material.transparent = true;
      //   node.material.opacity = 0.1;
      // });
      obj.position.set(0, -1, 0);
      scene.add(obj);
  });

  // lights

  const dirLight1 = new THREE.DirectionalLight( 0x666666 );
  dirLight1.position.set( 1, 1, 1 );
  scene.add( dirLight1 );

  const dirLight2 = new THREE.DirectionalLight( 0x666666 );
  dirLight2.position.set( - 1, - 1, - 1 );
  scene.add( dirLight2 );

  const ambientLight = new THREE.AmbientLight( 0x999999 );
  scene.add( ambientLight );

  //

}

function animate() {

  requestAnimationFrame( animate );

  // controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
  camera.position.x = ( mouseX - camera.position.x ) * .1;
  camera.position.y = ( - mouseY - camera.position.y ) * .1;
  camera.lookAt(0, 0, 0);

  render();

}

function render() {

  renderer.render( scene, camera );

}