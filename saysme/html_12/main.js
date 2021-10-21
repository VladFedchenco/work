import * as THREE from 'https://cdn.skypack.dev/three@0.133/build/three.module.js';

import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.133/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.133/examples/jsm/controls/OrbitControls.js';

let camera, controls, scene, renderer, loader, wheel, test_tube, ctx = [];

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
  camera.position.set( 0, 28, 20 );

  controls = new OrbitControls( camera, renderer.domElement );
  controls.autoRotate = true;
  controls.enablePan = false;
  controls.autoRotateSpeed = .3;

  loader = new GLTFLoader();
  loader.load('resources/wheel.gltf', function(gltf) {
      wheel = gltf.scene;
      wheel.position.set(0, -.15, 0);
      scene.add(wheel);
  });

  loader.load('resources/test_tube.gltf', function(gltf) {
      test_tube = gltf.scene;
      test_tube.position.set(0, .7, 0);
      let test_tube_material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        clearcoat: .2,
        metalness: 0,
        roughness: 0,
        transparent: false,
        transmission: 1,
        opacity: 1,
        reflectivity: 0.3,
        ior: 2.3
      })
      //let liquid_material = new THREE.MeshBasicMaterial({color: 0x00ff00});
      let liquid_material  = new THREE.MeshPhysicalMaterial({
        color: 0x00ff00,
        clearcoat: .2,
        metalness: 0,
        roughness: 0,
        transparent: false,
        transmission: 0,
        opacity: .7,
        reflectivity: 0.3,
        ior: 2.3
      })
      let label_canvas = new THREE.CanvasTexture(createText(1, "text1", "text2", '#aaccaa'));
      let label_material = new THREE.MeshBasicMaterial( {map: label_canvas} );
      test_tube.traverse((o) => {
        if (o.isMesh && o.name == "test_tube") o.material = test_tube_material;
        if (o.isMesh && o.name == "semisphere") o.material = liquid_material;
        if (o.isMesh && o.name == "liquid") {
          o.material = liquid_material;
          o.scale.z = 5;
        }
        if (o.isMesh && o.name == "ring") {
          o.position.set(0, 4, 0);
        }
        if (o.isMesh && o.name == "label") {
          o.material = label_material;
        }
      });
      scene.add(test_tube);
  });

  // Lights

  scene.add( new THREE.AmbientLight( 0xdddddd ) );

  const light = new THREE.PointLight( 0xffffff, .1, 0 );
  light.position.set( 50, 0, 50 );
  scene.add( light );

}

function createText(i, txt, txt2, fill) {
  ctx[i] = document.createElement('canvas').getContext('2d');
  ctx[i].canvas.width = 100;
  ctx[i].canvas.height = 300;
  ctx[i].fillStyle = fill;
  ctx[i].fillRect(0, 0, ctx[i].canvas.width, ctx[i].canvas.height);
  ctx[i].translate(-10,290);
  ctx[i].rotate(-0.5*Math.PI);
  ctx[i].fillStyle = '#000000';
  ctx[i].font = '40px sans-serif';
  ctx[i].fillText(txt, 10, 65);
  ctx[i].font = '21px sans-serif';
  ctx[i].fillText(txt2, 10, 85);
  //document.body.appendChild(ctx[i].canvas);
  return ctx[i].canvas;
}

function animate() {

  requestAnimationFrame( animate );

  controls.update();

  render();

}

function render() {

  renderer.render( scene, camera );

}