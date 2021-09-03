import * as THREE from 'https://cdn.skypack.dev/three@0.118/build/three.module.js';

import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.118/examples/jsm/controls/OrbitControls.js';

let camera, controls, scene, renderer, loader, wheel;
let spikes = [];

// Raycaster

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove( event ) {

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

window.addEventListener( 'mousemove', onMouseMove, false );

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
  camera.position.set( 0, 5, 6 );

  // controls

  controls = new OrbitControls( camera, renderer.domElement );
  controls.autoRotate = true;
  controls.autoRotateSpeed = .3;

  // world

  loader = new GLTFLoader();
  loader.load('resources/wheel_03.gltf', function(gltf) {
      wheel = gltf.scene;
      scene.add(wheel);
  });

  loader.load('resources/spike0.gltf', function(gltf) {
      spikes[0] = gltf.scene;
      spikes[0].name = "spike0";
      scene.add(spikes[0]);
  });

  loader.load('resources/spike1.gltf', function(gltf) {
      spikes[1] = gltf.scene;
      spikes[1].name = "spike1";
      scene.add(spikes[1]);
  });

  loader.load('resources/spike2.gltf', function(gltf) {
      spikes[2] = gltf.scene;
      spikes[2].name = "spike2";
      scene.add(spikes[2]);
  });

  loader.load('resources/spike3.gltf', function(gltf) {
      spikes[3] = gltf.scene;
      spikes[3].name = "spike3";
      scene.add(spikes[3]);
  });

  loader.load('resources/spike4.gltf', function(gltf) {
      spikes[4] = gltf.scene;
      spikes[4].name = "spike4";
      scene.add(spikes[4]);
  });

  loader.load('resources/spike5.gltf', function(gltf) {
      spikes[5] = gltf.scene;
      spikes[5].name = "spike5";
      scene.add(spikes[5]);
  });

  loader.load('resources/spike6.gltf', function(gltf) {
      spikes[6] = gltf.scene;
      spikes[6].name = "spike6";
      scene.add(spikes[6]);
  });

  // lights

  const dirLight1 = new THREE.DirectionalLight( 0xaaaaaa );
  dirLight1.position.set( 20, 10, 20 );
  scene.add( dirLight1 );

  const dirLight2 = new THREE.DirectionalLight( 0xaaaaaa );
  dirLight2.position.set( -20, -10, -20 );
  scene.add( dirLight2 );

  const dirLight3 = new THREE.DirectionalLight( 0xaaaaaa );
  dirLight1.position.set( 20, 10, -20 );
  scene.add( dirLight3 );

  const dirLight4 = new THREE.DirectionalLight( 0xaaaaaa );
  dirLight1.position.set( -20, 10, 20 );
  scene.add( dirLight3 );

  const dirLight5 = new THREE.DirectionalLight( 0xaaaaaa );
  dirLight1.position.set( -20, 10, -20 );
  scene.add( dirLight3 );

  const ambientLight = new THREE.AmbientLight( 0xcccccc );
  scene.add( ambientLight );

}

function animate() {

  requestAnimationFrame( animate );

  raycaster.setFromCamera( mouse, camera );

  const intersects = raycaster.intersectObjects( scene.children, true );

  if(intersects.length > 0) {

    let obj = intersects[0].object;
    if(obj.name == "spike0") {
      unselectAll();
      obj.scale.set(1.2,1.2,1.2);
    }
    if(obj.name == "spike1") {
      unselectAll();
      obj.scale.set(1.2,1.2,1.2);
    }
    if(obj.name == "spike2") {
      unselectAll();
      obj.scale.set(1.2,1.2,1.2);
    }
    if(obj.name == "spike3") {
      unselectAll();
      obj.scale.set(1.2,1.2,1.2);
    }
    if(obj.name == "spike4") {
      unselectAll();
      obj.scale.set(1.2,1.2,1.2);
    }
    if(obj.name == "spike5") {
      unselectAll();
      obj.scale.set(1.2,1.2,1.2);
    }
    if(obj.name == "spike6") {
      unselectAll();
      obj.scale.set(1.2,1.2,1.2);
    }
  }

  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

  render();

}

function unselectAll() {
  for(let i=0; i<7; i++) {
    spikes[i].children[0].scale.set(1,1,1);
  }
}

function render() {

  renderer.render( scene, camera );

}