import * as THREE from 'https://cdn.skypack.dev/three@0.118/build/three.module.js';

import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.118/examples/jsm/controls/OrbitControls.js';

let camera, controls, scene, renderer, loader, wheel, ctx, cylinder, text_string, materials, texture;

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
  camera.position.set( 0, 10, 12 );

  // controls

  controls = new OrbitControls( camera, renderer.domElement );
  // controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = .3;

  // world

  loader = new GLTFLoader();
  loader.load('resources/wheel_v2_01.gltf', function(gltf) {
      wheel = gltf.scene;
      scene.add(wheel);
  });

  //create image
  ctx = document.createElement('canvas').getContext('2d');
  ctx.canvas.width = 300;
  ctx.canvas.height = 1100;
  ctx.fillStyle = '#ffff00';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  let text_initial = "Click to change text";
  let queryString = window.location.search;
  if (queryString != "") {
      let urlParams = new URLSearchParams(queryString);
      text_string = urlParams.get("text");
    } else {
      text_string = "Hello world";
  }

  ctx.translate(-10,1050);
  ctx.rotate(-0.5*Math.PI);
  ctx.fillStyle = '#000000';
  ctx.font = '44px sans-serif';
  ctx.fillText(text_initial, 10, 300);
  texture = new THREE.CanvasTexture(ctx.canvas);

  const geometry = new THREE.CylinderGeometry( .1, .1, 4, 12, 1, false, 0.3 );
  geometry.name = "tube1";
  materials = [
    new THREE.MeshBasicMaterial( {map: texture} ),
    new THREE.MeshBasicMaterial( { color: 0xfffff00 } ),
    new THREE.MeshBasicMaterial( { color: 0xffff00 } )
  ]
  cylinder = new THREE.Mesh( geometry, materials );
  cylinder.position.set( 4, 2.6, 0 );
  scene.add( cylinder );

  // lights

  const ambientLight = new THREE.AmbientLight( 0xeeeeee );
  scene.add( ambientLight );

}

function animate() {

  requestAnimationFrame( animate );

  

  raycaster.setFromCamera( mouse, camera );

  const intersects = raycaster.intersectObjects( scene.children, true );

  if(intersects.length > 0) {
    let obj = intersects[0].object;
    if(obj.geometry.name == "tube1") {
      obj.scale.set(2,1.05,2);
      document.body.style.cursor = "pointer";
      document.querySelector("canvas").onclick = function() {
        ctx.rotate(0.5*Math.PI);
        ctx.translate(10,-1050);
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.translate(-10,1050);
        ctx.rotate(-0.5*Math.PI);
        ctx.fillStyle = '#000000';
        ctx.fillText(text_string, 10, 300);

        texture.needsUpdate = true;

      };
    } else {
      unselectAll();
    }
  } else {
    unselectAll();
  }


  controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

  render();

}

function unselectAll() {
  scene.children[0].scale.set(1,1,1);
  document.body.style.cursor = "default";
  document.querySelector("canvas").onclick = function() {};
}

function render() {

  renderer.render( scene, camera );

}