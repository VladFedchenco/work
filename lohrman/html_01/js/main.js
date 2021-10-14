import * as THREE from 'https://cdn.skypack.dev/three@0.118/build/three.module.js';

import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.118/examples/jsm/controls/OrbitControls.js';

let scene, renderer, camera, controls;

let bg_color = 0x002222;
let wire_color = 0x00ff00;
let threshold = 3;

init();
animate();

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( bg_color );
  document.getElementById("molecule").appendChild( renderer.domElement );


  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 0, 20, 20 );

  controls = new OrbitControls( camera, renderer.domElement );
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1;

  const loader = new GLTFLoader();
  loader.load('model/molecule.gltf', function(gltf) {
      let molecule = gltf.scene;
      molecule.traverse((node) => {
        if (!node.isMesh) return;
        const edges = new THREE.EdgesGeometry( node.geometry, threshold );
        const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: wire_color } ) );
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
  render();

}

function render() {

  renderer.render( scene, camera );

}