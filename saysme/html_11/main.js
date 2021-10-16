import * as THREE from 'https://cdn.skypack.dev/three@0.133/build/three.module.js';

import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.133/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.133/examples/jsm/controls/OrbitControls.js';

let gData, gNumber, gNames, gIndex = [], camera, controls, scene, renderer, loader, wheel, geometry = [], cylinder = [], ctx = [], materials = [], texture = [], slctd, mc;

let requestURL = 'https://jbu8rgg856.execute-api.us-east-2.amazonaws.com/default/snobAiApi';
let request = new XMLHttpRequest();
let request_id = 1;
request.open('POST', requestURL);
request.responseType = 'json';
request.send('{"id":"' + request_id + '"}');

request.onload = function() {
  gData = request.response;
  gNumber = Object.keys(gData.position).length;
  gNames = Object.keys(gData.molecule_flavor);
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

document.getElementById("bttn_next").addEventListener("click", function(){ 
  request_id++;
  let requestURL = 'https://jbu8rgg856.execute-api.us-east-2.amazonaws.com/default/snobAiApi';
  let request = new XMLHttpRequest();
  request.open('POST', requestURL);
  request.responseType = 'json';
  request.send('{"id":"' + request_id + '"}');

  request.onload = function() {
    removeObjects();
    gData = request.response;
    gNumber = Object.keys(gData.position).length;
    gNames = Object.keys(gData.molecule_flavor);
    createObjects();
  }
});

document.getElementById("bttn_prev").addEventListener("click", function(){
  if(request_id > 1) {
    request_id--;
    let requestURL = 'https://jbu8rgg856.execute-api.us-east-2.amazonaws.com/default/snobAiApi';
    let request = new XMLHttpRequest();
    request.open('POST', requestURL);
    request.responseType = 'json';
    request.send('{"id":"' + request_id + '"}');

    request.onload = function() {
      removeObjects();
      gData = request.response;
      gNumber = Object.keys(gData.position).length;
      gNames = Object.keys(gData.molecule_flavor);
      createObjects();
    }
  }
});

function init() {

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xffffff );
  document.body.appendChild( renderer.domElement );


  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 0, 15, 17 );

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
  loader.load('resources/wheel.gltf', function(gltf) {
      wheel = gltf.scene;
      wheel.position.set(0, -.15, 0);
      scene.add(wheel);
  });

  //create graphs

  createObjects();

  // Lights

  scene.add( new THREE.AmbientLight( 0xdddddd ) );

  const light = new THREE.PointLight( 0xffffff, .1, 0 );
  light.position.set( 50, 0, 50 );
  scene.add( light );

  const light2 = new THREE.PointLight( 0xffffff, .1, 0 );
  light2.position.set( -50, 0, -50 );
  scene.add( light2 );

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

function createObjects() {
  gIndex = [];
  for(let i = 0; i < gNumber; i++) {
    texture[i] = new THREE.CanvasTexture(createText(i, gNames[i], '#cccccc'));
    geometry[i] = new THREE.CylinderGeometry( .14, .14, gData.position[gNames[i]].h, 12, 1, false, 0.3 );
    geometry[i].name = "tube" + i;
    gIndex.push(geometry[i].name);
    let mat_color = new THREE.Color(gData.colors[gNames[i]]);
    // materials[i] = [
    //   new THREE.MeshBasicMaterial( {map: texture[i]} ),
    //   new THREE.MeshBasicMaterial( { color: mat_color } ),
    //   new THREE.MeshBasicMaterial( { color: mat_color } )
    // ]
    materials[i] = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      alphaMap: texture[i],
      metalness: 0,
      roughness: .3,
      transparent: true,
      transmission: 1,
      opacity: 1,
      reflectivity: 0.3,
      ior: 2.3
    })
    cylinder[i] = new THREE.Mesh( geometry[i], materials[i] );
    cylinder[i].position.set( gData.position[gNames[i]].x, (gData.position[gNames[i]].h / 2 + .6), gData.position[gNames[i]].y );
    scene.add( cylinder[i] );
  }
}

function removeObjects() {
  for(let i = 0; i < gNumber; i++) {
    scene.remove( cylinder[i] );
  }
}

function selectedGraph(indx) {
  cylinder[indx].scale.set(2,1,2);
  document.body.style.cursor = "pointer";
  slctd = indx;
}

function canvasClick() {
  if(slctd >= 0) {
    updateText(slctd, gData.molecule_flavor[gNames[slctd]], '#cccccc');
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