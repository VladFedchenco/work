import * as THREE from 'https://cdn.skypack.dev/three@0.133/build/three.module.js';

import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.133/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.133/examples/jsm/controls/OrbitControls.js';

let gData, gNumber, gNames, gIndex = [], camera, controls, scene, renderer, loader, wheel, geometry = [], cylinder = [], ctx = [], materials = [], texture = [], slctd;
let gData_2, gNumber_2, gNames_2, gIndex_2 = [], geometry_2 = [], cylinder_2 = [], ctx_2 = [], materials_2 = [], texture_2 = [], slctd_2;

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
  compareItems(request_id + 1);
  init();
  animate();
  document.querySelector("canvas").addEventListener( 'click', canvasClick, false );
  document.getElementById("info").innerHTML = "ID:" + request_id + " & ID:" + (request_id + 1);
}

function compareItems(request_id) {
  let requestURL = 'https://jbu8rgg856.execute-api.us-east-2.amazonaws.com/default/snobAiApi';
  let request = new XMLHttpRequest();
  request.open('POST', requestURL);
  request.responseType = 'json';
  request.send('{"id":"' + request_id + '"}');

  request.onload = function() {
    gData_2 = request.response;
    gNumber_2 = Object.keys(gData_2.position).length;
    gNames_2 = Object.keys(gData_2.molecule_flavor);
    createObjects2();
  }
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
    compareItems(request_id + 1);
  }
  document.getElementById("info").innerHTML = "ID:" + request_id + " & ID:" + (request_id + 1);
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
      compareItems(request_id + 1);
    }
    document.getElementById("info").innerHTML = "ID:" + request_id + " & ID:" + (request_id + 1);
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
  camera.position.set( 0, 28, 20 );

  // helpers

  // const gridHelper = new THREE.GridHelper( 20, 20 );
  // scene.add( gridHelper );

  // controls

  controls = new OrbitControls( camera, renderer.domElement );
  // controls.enableDamping = true;
  controls.autoRotate = true;
  controls.enablePan = false;
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

  if(intersects.length > 0 && (gIndex.indexOf(intersects[0].object.geometry.name) != -1 || gIndex_2.indexOf(intersects[0].object.geometry.name) != -1)) {
    let obj = intersects[0].object.geometry.name;
    if(gIndex.indexOf(intersects[0].object.geometry.name) != -1) {
      selectedGraph(gIndex.indexOf(obj));
    }
    if(gIndex_2.indexOf(intersects[0].object.geometry.name) != -1) {
      selectedGraph2(gIndex_2.indexOf(obj));
    }
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
    geometry[i] = new THREE.CylinderGeometry( .28, .28, gData.position[gNames[i]].h * 1.5, 16, 1, false, 0.3 );
    geometry[i].name = "tube" + i;
    gIndex.push(geometry[i].name);
    let mat_color = new THREE.Color(gData.colors[gNames[i]]);
    materials[i] = [ new THREE.MeshPhysicalMaterial({
      color: mat_color,
      alphaMap: texture[i],
      metalness: 0,
      roughness: .3,
      transparent: true,
      transmission: 1,
      opacity: 1,
      reflectivity: 0.3,
      ior: 2.3
    }),
    new THREE.MeshPhysicalMaterial({
      color: mat_color,
      metalness: 0,
      roughness: .3,
      transparent: true,
      transmission: 1,
      opacity: 1,
      reflectivity: 0.3,
      ior: 2.3
    }),
    new THREE.MeshPhysicalMaterial({
      color: mat_color,
      metalness: 0,
      roughness: .3,
      transparent: true,
      transmission: 1,
      opacity: 1,
      reflectivity: 0.3,
      ior: 2.3
    })
    ]
    cylinder[i] = new THREE.Mesh( geometry[i], materials[i] );
    cylinder[i].position.set( gData.position[gNames[i]].x, (gData.position[gNames[i]].h * 1.5 / 2 + 1), gData.position[gNames[i]].y );
    scene.add( cylinder[i] );
  }
}

function createObjects2() {
  gIndex_2 = [];
  for(let i = 0; i < gNumber_2; i++) {
    texture_2[i] = new THREE.CanvasTexture(createText2(i, gNames_2[i], '#cccccc'));
    geometry_2[i] = new THREE.CylinderGeometry( .28, .28, gData_2.position[gNames_2[i]].h * 1.5, 16, 1, false, 0.3 );
    geometry_2[i].name = "scnd_tube" + i;
    gIndex_2.push(geometry_2[i].name);
    let mat_color = new THREE.Color(gData_2.colors[gNames_2[i]]);
    materials_2[i] = [ new THREE.MeshPhysicalMaterial({
      color: mat_color,
      alphaMap: texture_2[i],
      metalness: 0,
      roughness: .3,
      transparent: true,
      transmission: 1,
      opacity: 1,
      reflectivity: 0.3,
      ior: 2.3
    }),
    new THREE.MeshPhysicalMaterial({
      color: mat_color,
      metalness: 0,
      roughness: .3,
      transparent: true,
      transmission: 1,
      opacity: 1,
      reflectivity: 0.3,
      ior: 2.3
    }),
    new THREE.MeshPhysicalMaterial({
      color: mat_color,
      metalness: 0,
      roughness: .3,
      transparent: true,
      transmission: 1,
      opacity: 1,
      reflectivity: 0.3,
      ior: 2.3
    })
    ]
    cylinder_2[i] = new THREE.Mesh( geometry_2[i], materials_2[i] );
    cylinder_2[i].position.set( gData_2.position[gNames_2[i]].x, (gData_2.position[gNames_2[i]].h * 1.5 / 2 + 1), gData_2.position[gNames_2[i]].y );
    scene.add( cylinder_2[i] );
  }
}

function removeObjects() {
  for(let i = 0; i < gNumber; i++) {
    scene.remove( cylinder[i] );
  }
  for(let i = 0; i < gNumber_2; i++) {
    scene.remove( cylinder_2[i] );
  }
}

function selectedGraph(indx) {
  cylinder[indx].scale.set(2,1,2);
  document.body.style.cursor = "pointer";
  slctd = indx;
}

function selectedGraph2(indx) {
  cylinder_2[indx].scale.set(2,1,2);
  document.body.style.cursor = "pointer";
  slctd_2 = indx;
}

function canvasClick() {
  if(slctd >= 0) {
    updateText(slctd, gData.molecule_flavor[gNames[slctd]], '#cccccc');
    texture[slctd].needsUpdate = true;
  }
  if(slctd_2 >= 0) {
    updateText2(slctd_2, gData_2.molecule_flavor[gNames_2[slctd_2]], '#cccccc');
    texture_2[slctd_2].needsUpdate = true;
  }
}

function createText(i, txt, fill) {
  ctx[i] = document.createElement('canvas').getContext('2d');
  ctx[i].canvas.width = 400;
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

function createText2(i, txt, fill) {
  ctx_2[i] = document.createElement('canvas').getContext('2d');
  ctx_2[i].canvas.width = 400;
  ctx_2[i].canvas.height = 1100;
  ctx_2[i].fillStyle = fill;
  ctx_2[i].fillRect(0, 0, ctx_2[i].canvas.width, ctx_2[i].canvas.height);
  ctx_2[i].translate(-10,1050);
  ctx_2[i].rotate(-0.5*Math.PI);
  ctx_2[i].fillStyle = '#000000';
  ctx_2[i].font = '44px sans-serif';
  ctx_2[i].fillText(txt, 10, 300);
  return ctx_2[i].canvas;
}

function updateText2(i, txt, fill) {
  ctx_2[i].rotate(0.5*Math.PI);
  ctx_2[i].translate(10,-1050);
  ctx_2[i].fillStyle = fill;
  ctx_2[i].fillRect(0, 0, ctx_2[i].canvas.width, ctx_2[i].canvas.height);
  ctx_2[i].translate(-10,1050);
  ctx_2[i].rotate(-0.5*Math.PI);
  ctx_2[i].fillStyle = '#000000';
  ctx_2[i].fillText(txt, 10, 300);
}

function unselectAll() {
  for(let i = 0; i < gNumber; i++) {
    cylinder[i].scale.set(1,1,1);
  }
  for(let i = 0; i < gNumber_2; i++) {
    cylinder_2[i].scale.set(1,1,1);
  }
  document.body.style.cursor = "default";
}

function render() {

  renderer.render( scene, camera );

}