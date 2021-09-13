import * as THREE from 'https://cdn.skypack.dev/three@0.118/build/three.module.js';

import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.118/examples/jsm/controls/OrbitControls.js';

let gData, gNumber, gIndex = [], camera, controls, scene, renderer, loader, wheel, geometry = [], cylinder = [], ctx = [], materials = [], texture = [], slctd, mc;

let requestURL = 'data.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  gData = request.response;
  gNumber = Object.keys(gData.graph0).length;
  init();
  animate();
  mc = new Hammer(document.querySelector("canvas"));
  mc.on("tap", canvasClick);
}

// Raycaster

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove( event ) {

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

window.addEventListener( 'mousemove', onMouseMove, false );


function init() {

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xffffff );
  document.body.appendChild( renderer.domElement );


  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 0, 10, 12 );

  // helpers

  // const gridHelper = new THREE.GridHelper( 20, 20 );
  // scene.add( gridHelper );

  // controls

  controls = new OrbitControls( camera, renderer.domElement );
  // controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = .3;

  // world

  loader = new GLTFLoader();
  loader.load('resources/wheel_v2_01.gltf', function(gltf) {
      wheel = gltf.scene;
      wheel.position.set(0, -.15, 0);
      scene.add(wheel);
  });

  //create graphs

  for(let i = 0; i < gNumber; i++) {
    texture[i] = new THREE.CanvasTexture(createText(i, gData.graph0["cyl"+i].init_text, gData.graph0["cyl"+i].color));
    geometry[i] = new THREE.CylinderGeometry( .1, .1, gData.graph0["cyl"+i].h, 12, 1, false, 0.3 );
    geometry[i].name = "tube" + i;
    gIndex.push(geometry[i].name);
    let mat_color = new THREE.Color(gData.graph0["cyl"+i].color);
    materials[i] = [
      new THREE.MeshBasicMaterial( {map: texture[i]} ),
      new THREE.MeshBasicMaterial( { color: mat_color } ),
      new THREE.MeshBasicMaterial( { color: mat_color } )
    ]
    cylinder[i] = new THREE.Mesh( geometry[i], materials[i] );
    cylinder[i].position.set( gData.graph0["cyl"+i].x, (gData.graph0["cyl"+i].h / 2 + .6), gData.graph0["cyl"+i].y );
    scene.add( cylinder[i] );
  }

  // lights

  const ambientLight = new THREE.AmbientLight( 0xeeeeee );
  scene.add( ambientLight );

}

function animate() {

  requestAnimationFrame( animate );

  
  raycaster.setFromCamera( mouse, camera );

  const intersects = raycaster.intersectObjects( scene.children, true );

  if(intersects.length > 0 && gIndex.indexOf(intersects[0].object.geometry.name) != -1) {
    let obj = intersects[0].object.geometry.name;
    selectedGraph(gIndex.indexOf(obj));
  } else {
    slctd = -1;
    unselectAll();
  }


  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

  render();

}

function selectedGraph(indx) {
  cylinder[indx].scale.set(2,1,2);
  document.body.style.cursor = "pointer";
  slctd = indx;
}

function canvasClick() {
  if(slctd >= 0) {
    updateText(slctd, gData.graph0["cyl"+slctd].updated_text, gData.graph0["cyl"+slctd].color);
    texture[slctd].needsUpdate = true;
  }
}

function createText(i, txt, fill) {
  ctx[i] = document.createElement('canvas').getContext('2d');
  ctx[i].canvas.width = 300;
  ctx[i].canvas.height = 1100;
  ctx[i].fillStyle = fill;
  ctx[i].fillRect(0, 0, ctx[i].canvas.width, ctx[i].canvas.height);
  ctx[i].translate(-10,1050);
  ctx[i].rotate(-0.5*Math.PI);
  ctx[i].fillStyle = '#000000';
  ctx[i].font = '44px sans-serif';
  ctx[i].fillText(txt, 10, 300);
  return ctx[i].canvas;
}

function updateText(i, txt, fill) {
  ctx[i].rotate(0.5*Math.PI);
  ctx[i].translate(10,-1050);
  ctx[i].fillStyle = fill;
  ctx[i].fillRect(0, 0, ctx[i].canvas.width, ctx[i].canvas.height);
  ctx[i].translate(-10,1050);
  ctx[i].rotate(-0.5*Math.PI);
  ctx[i].fillStyle = '#000000';
  ctx[i].fillText(txt, 10, 300);
}

function unselectAll() {
  for(let i = 0; i < gNumber; i++) {
    cylinder[i].scale.set(1,1,1);
  }
  document.body.style.cursor = "default";
}

function render() {

  renderer.render( scene, camera );

}