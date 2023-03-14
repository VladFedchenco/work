import * as THREE from './build/three.module.js';

import {GLTFLoader} from './examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';

let scene, renderer, camera, controls, man, video, texture;

let bg_color = 0xffffff;

document.getElementById("start_bttn").addEventListener("click", function() {

  init();
  animate();
  document.getElementById("state_buttons").classList.remove("hidden");
  this.style.display = "none";

});

let prev_state = 0;
let unlock = true;

function gotoState(current_state, time_mark) {
  if(unlock) {

    for(let i = 0; i < 6; i++) {
      document.getElementById("state" + i).classList.remove("current");
    }

    document.getElementById("state" + current_state).classList.add("current");

    if(current_state != 0 && prev_state != 0) {

      video.play();

      setTimeout(() => {
        video.pause();
        video.currentTime = time_mark;
        video.play();
        setTimeout(() => {
          video.pause();
          unlock = true;
        }, "5500")
      }, "1500")

    } else if(current_state == 1 && prev_state == 0) {

      video.play();
      setTimeout(() => {
        video.pause();
        unlock = true;
      }, "5500")

    } else if(current_state != 1 && prev_state == 0) {

      video.pause();
      video.currentTime = time_mark;
      video.play();
      setTimeout(() => {
        video.pause();
        unlock = true;
      }, "5500")

    } else {

      video.play();
      setTimeout(() => {
        video.pause();
        video.currentTime = time_mark;
        unlock = true;
      }, "1500")

    }

  }

}

document.getElementById("state0").addEventListener("click", function() {
  gotoState(0, 0);
  prev_state = 0;
  unlock = false;
}, false);

document.getElementById("state1").addEventListener("click", function() {
  gotoState(1, 0);
  prev_state = 1;
  unlock = false;
}, false);

document.getElementById("state2").addEventListener("click", function() {
  gotoState(2, 8);
  prev_state = 2;
  unlock = false;
}, false);

document.getElementById("state3").addEventListener("click", function() {
  gotoState(3, 16);
  prev_state = 3;
  unlock = false;
}, false);

document.getElementById("state4").addEventListener("click", function() {
  gotoState(4, 24);
  prev_state = 4;
  unlock = false;
}, false);

document.getElementById("state5").addEventListener("click", function() {
  gotoState(5, 32);
  prev_state = 5;
  unlock = false;
}, false);

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( bg_color );
  document.getElementById("man").appendChild( renderer.domElement );


  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( -1.4, 1, 3 );

  video = document.getElementById( 'video' );
  video.play();
  video.pause();

  texture = new THREE.VideoTexture( video );
  texture.flipY = false;

  const loader = new GLTFLoader();
  loader.load('model/man.gltf', function(gltf) {
      man = gltf.scene;
      man.traverse ( ( o ) => {
        if ( o.isMesh ) {
          o.material.map = texture;
        }
      } );
      man.position.set(0, -.8, 0);
      scene.add( man );
  });

  controls = new OrbitControls( camera, renderer.domElement );
  controls.autoRotate = true;
  controls.minPolarAngle = Math.PI/2;
  controls.maxPolarAngle = Math.PI/2;
  controls.autoRotateSpeed = .2;
  controls.enableDamping = true;
  controls.update();

  const light = new THREE.PointLight( 0xffffff, 2, 0 );
  light.position.set( 10, 5, 10 );
  scene.add( light );

  const light2 = new THREE.PointLight( 0xffffff, 2, 0 );
  light2.position.set( -10, 5, 10 );
  scene.add( light2 );

  const light3 = new THREE.PointLight( 0xffffff, 2, 0 );
  light3.position.set( 10, 5, -10 );
  scene.add( light3 );

  const light4 = new THREE.PointLight( 0xffffff, 2, 0 );
  light4.position.set( -10, 5, -10 );
  scene.add( light4 );

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