import * as THREE from './build/three.module.js';

import {GLTFLoader} from './examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';

let scene, renderer, camera, controls, icn, scl = 1, pos = 0, frm = 0;
let loaded = false;
let jump = false;
let trig1 = true, trig2 = false;

let bg_color = 0xffffff;

document.addEventListener("DOMContentLoaded", function(){

  init();
  animate();

});

$("#bttn").addEventListener("click", function(){
  jump = true;
  $("#bttn").style.display = "none";
}, false);

function $(sel) {
  return document.querySelector(sel);
}

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( bg_color );
  document.getElementById("icn").appendChild( renderer.domElement );


  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 1, 1, 1 );

  const loader = new GLTFLoader();
  loader.load(model, function(gltf) {
      icn = gltf.scene;
      scene.add( icn );
      loaded = true;
  });

  controls = new OrbitControls( camera, renderer.domElement );
  controls.autoRotate = true;
  controls.minPolarAngle = Math.PI/2;
  controls.maxPolarAngle = Math.PI/2;
  controls.autoRotateSpeed = 10;
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

function eas(t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t }

function animate() {

  requestAnimationFrame( animate );
  controls.update();

  if(loaded && jump) {
    pos = 0.0015 * frm * eas(frm/100);
    scl = 1 + (.015 * frm) * eas(frm/100);
    icn.position.set( 0, pos, 0 );
    icn.scale.set( scl, scl, scl );

    if(frm < 99 && trig1) {
      frm += 1.6;
    } else {
      trig1 = false;
      trig2 = true;
      if(frm > 75 && trig2) {
        frm -= .7;
      } else {
        jump = false;
      }
    }
  }

  render();

}

function render() {

  renderer.render( scene, camera );

}