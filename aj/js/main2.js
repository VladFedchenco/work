import * as THREE from './build/three.module.js';

import {GLTFLoader} from './examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from './examples/jsm/loaders/RGBELoader.js';

let scene, renderer, camera, controls, can;

init();
animate();

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( bg_color );
  document.getElementById("can").appendChild( renderer.domElement );


  camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 1, .2, 1 );

  new RGBELoader()
  .setPath( 'model/' )
  .load( bg_hdr, function ( texture ) {

    texture.mapping = THREE.CubeReflectionMapping;

    // scene.background = texture;
    scene.environment = texture;

    render();

    // model

    let map_texture = new THREE.TextureLoader().load( cover );
    let map_metal = new THREE.TextureLoader().load( metall );
    map_texture.flipY = false;
    map_metal.flipY = false;

    const loader = new GLTFLoader();
    loader.load('model/can.gltf', function(gltf) {
        can = gltf.scene;
        can.traverse ( ( o ) => {
        if ( o.isMesh ) {
            o.material.map = map_texture;
            o.material.metalnessMap = map_metal;
          }
        } );
        can.position.set(0, -.08, 0);
        scene.add( can );
    });

  } );

  controls = new OrbitControls( camera, renderer.domElement );
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = .5;
  controls.enableDamping = true;
  controls.update();

  const light = new THREE.AmbientLight( main_light );
  scene.add( light );

  const light1 = new THREE.AmbientLight( scnd_light );
  scene.add( light1 );

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