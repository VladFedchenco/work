let scene, scene2, renderer, composer, fxaaPass;
let clock, controls, mixer, raycaster, raycaster2, loader;
let camera, light, pointLight;
let rocket, flame, logo, why, countdown, smoke;
let sound, sound_init, audioLoader;

let help_cam = false;
let is_started = false; // to avoid window focus issues on mobile

let is_scene2 = false;
let scene2_cam_pos = 0;

let unlock = true;
let music = true;
let scale_factor = 0;
let height_factor = 0;
let rocket_scale = 1;
let camera_before_start_y;

let btn_r = 0.00485;
let btn_g = 1;
let pink = false;

let req_af; // request animation frame

// Check if on mobile

let ismobile = false;

function $(sel) {
  return document.querySelector(sel);
}

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  ismobile = true;
} else {
  let ismobile = false;
}

function getScrollPercent() {
  let h = document.documentElement, 
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
  return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight);
}


// Load Manager

const manager = new THREE.LoadingManager();

manager.onLoad = function ( ) {
  console.log("ready");
  setTimeout(function(){
    $("#loader").style.opacity = 0;
    is_scene2 ? animate2() : animate() ;
    $("#skip").style.display = "block";
    is_started = true;
    setTimeout(function(){
      $("#loader").style.display = "none";
    }, 1000);
  }, 1000);
};

// Mouse events

let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const mouse = new THREE.Vector2();
const radius = 10;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

init();

function init() {

  scene = new THREE.Scene();

  clock = new THREE.Clock();

  const skycube = new THREE.CubeTextureLoader();
  const texture = skycube.load([
      'imgs/posx.jpg',
      'imgs/negx.jpg',
      'imgs/posy.jpg',
      'imgs/negy.jpg',
      'imgs/posz.jpg',
      'imgs/negz.jpg',
  ]);
  scene.background = texture;

  scene2 = new THREE.Scene();

  const skycube2 = new THREE.CubeTextureLoader();
  const texture2 = skycube2.load([
      'imgs/bg2.jpg',
      'imgs/bg2.jpg',
      'imgs/bg2.jpg',
      'imgs/bg2.jpg',
      'imgs/bg2.jpg',
      'imgs/bg2.jpg',
  ]);
  scene2.background = texture2;

  raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devidePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(64, window.innerWidth / window.innerHeight, 0.1, 1000);

  if(!ismobile) {
    camera.position.set(0, 12, -110);
  } else {
    camera.position.set(-4, 20, -130);
  }

  // Audio

  const listener = new THREE.AudioListener();
  camera.add( listener );

  sound = new THREE.Audio( listener );

  audioLoader = new THREE.AudioLoader();

  audioLoader.load( 'sounds/countdown.mp3', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( false );
    sound.setVolume( 0.5 );
  });

  sound2 = new THREE.Audio( listener );

  audioLoader2 = new THREE.AudioLoader();

  audioLoader2.load( 'sounds/fly.mp3', function( buffer ) {
    sound2.setBuffer( buffer );
    sound2.setLoop( true );
    sound2.setVolume( 0.5 );
  });

  // Lights

  light = [];

  for(i = 0; i<4; i++) {
    light[i] = new THREE.DirectionalLight(0x333333, .5);
    light[i].castShadow = true;
    light[i].shadow.bias = -0.001;
    light[i].shadow.mapSize.width = 2048;
    light[i].shadow.mapSize.height = 2048;
    light[i].shadow.camera.near = 0.5;
    light[i].shadow.camera.far = 100.0;
    light[i].shadow.camera.left = 100;
    light[i].shadow.camera.right = -100;
    light[i].shadow.camera.top = 100;
    light[i].shadow.camera.bottom = -100;
    scene.add(light[i]);
  }

  light[0].position.set(100, 100, 100);
  light[1].position.set(-100, 100, 100);
  light[2].position.set(-100, 100, -100);
  light[3].position.set(100, 100, -100);

  light[0].target.position.set(20, 10, 20);
  light[1].target.position.set(-20, 10, 20);
  light[2].target.position.set(-20, 10, -20);
  light[3].target.position.set(20, 10, -20);

  scene.add(light[0].target);
  scene.add(light[1].target);
  scene.add(light[2].target);
  scene.add(light[3].target);

  pointLight = [];

  pointLight[0] = new THREE.PointLight( 0x444444, 1, 0 );
  pointLight[0].position.set( 0, 350, 0 );
  scene.add( pointLight[0] );

  pointLight[1] = new THREE.PointLight( 0xbb4bf5, .1, 0 );
  pointLight[1].position.set( 34, 20, 26 );
  scene.add( pointLight[1] );

  pointLight[2] = new THREE.PointLight( 0xbb4bf5, .1, 0 );
  pointLight[2].position.set( -15, 20, 26 );
  scene.add( pointLight[2] );

  pointLight[3] = new THREE.PointLight( 0xbb4bf5, .15, 0 );
  pointLight[3].position.set( 34, 14, -22 );
  scene.add( pointLight[3] );

  pointLight[4] = new THREE.PointLight( 0xbb4bf5, .15, 0 );
  pointLight[4].position.set( -15, 14, -22 );
  scene.add( pointLight[4] );

  pointLight[5] = new THREE.PointLight( 0x444444, .3, 0 );
  pointLight[5].position.set( 0, -15, -50 );
  scene.add( pointLight[5] );

  // Lights for the Scene 2

  const light_moon = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
  scene2.add( light_moon );

  // Helpers

  if (help_cam) {
    set_helpers();
  }

  // Models

  loader = new THREE.GLTFLoader(manager);
  loader.load('models/flame.gltf', function(gltf) {
      flame = gltf.scene;
      flame.visible = false;
      flame.position.y = 6;
      flame.scale.set(0,0,0);
      scene.add(flame);
      const animations = gltf.animations;
      mixer = new THREE.AnimationMixer(flame);
      const action = mixer.clipAction(animations[0]);
      const action1 = mixer.clipAction(animations[1]);
      action.play();
      action1.play();
  });

  loader.load('models/rocket.gltf', function(gltf) {
      rocket = gltf.scene;
      rocket.position.set(0, -1, 0);
      rocket.rotation.y = .2;
      scene.add(rocket);
  });

  loader.load('models/launch_site.gltf', function(gltf) {
      model = gltf.scene;
      scene.add(model);
  });

  loader.load('models/moon.gltf', function(gltf) {
      model = gltf.scene;
      model.children[0].material.emissiveIntensity = 4;
      model.position.set(0, 0, 0);
      model.scale.set(12,12,12);
      scene2.add(model);
  });

  // Why button

  loader.load('models/why.gltf', function(gltf) {
      why = gltf.scene;
      why.children[0].material.transparent = true;
      why.children[2].material.transparent = true;
      why.children[0].material.opacity = 0;
      why.children[2].material.opacity = 0;
      why.children[1].material.visible = false;
      why.children[0].material.emissiveIntensity = .9;
      why.position.set(0, 0, 190);
      why.scale.set(10,10,10);
      if(ismobile) {
        why.scale.set(5,5,5);
      }
      scene2.add(why);
  });

  // Start button

  loader.load('models/bttn_b.gltf', function(gltf) {
      logo = gltf.scene;
      logo.children[0].material.transparent = true;
      logo.children[2].visible = false;
      logo.position.set(0, -8, -40);
      logo.rotation.y = Math.PI;
      logo.scale.set(5,5,5);
      if(ismobile) {
        logo.scale.set(4,4,4);
      }
      scene.add(logo);
  });

  loader.load('models/countdown.gltf', function(gltf) {
      countdown = gltf.scene;
      countdown.position.set(40, 24, 10);
      countdown.rotation.y = Math.PI;
      countdown.scale.set(3,3,3);

      if(ismobile) {
        countdown.position.set(0, 35, -16);
        countdown.scale.set(1.6,1.6,1.6);
      }

      countdown.children[0].visible=false;
      countdown.children[1].visible=false;
      countdown.children[2].visible=false;
      scene.add(countdown);
  });

  // Light Glowing effect

  const map = new THREE.TextureLoader().load( 'imgs/light.png' );
  const l_material = new THREE.SpriteMaterial( { map: map } );
  l_material.blending = THREE.AdditiveBlending;
  let sprite = [];
  for(i=0; i<4; i++) {
    sprite[i] = new THREE.Sprite( l_material );
    sprite[i].material.opacity = .6;
    sprite[i].scale.set(26, 26, 0);
    scene.add( sprite[i] );
  }

  sprite[0].position.set(34, 20, 26);
  sprite[0].scale.set(40, 40, 0);
  sprite[1].position.set(-15, 20, 26);
  sprite[1].scale.set(40, 40, 0);
  sprite[2].position.set(34, 14, -22);
  sprite[3].position.set(-15, 14, -22);


  // Smoke

  const map2 = new THREE.TextureLoader().load( 'imgs/smoke.png' );
  const s_material = new THREE.SpriteMaterial( { map: map2 } );

  smoke = [];
  for(i=0; i<15; i++) {
    smoke[i] = new THREE.Sprite( s_material );
    smoke[i].material.opacity = .8;
    smoke[i].scale.set(0, 0, 0);
    scene.add( smoke[i] );
  }
  smoke[0].position.set(-32, -8, 0);
  smoke[1].position.set(-24, -7, 0);
  smoke[2].position.set(-16, -6, 0);
  smoke[3].position.set(-8, -4, 0);
  smoke[4].position.set(0, -2, -4);
  smoke[5].position.set(8, -4, 0);
  smoke[6].position.set(16, -6, 0);
  smoke[7].position.set(24, -7, 0);
  smoke[8].position.set(32, -8, 0);
  smoke[9].position.set(0, -16, -10);
  smoke[10].position.set(0, -12, 0);
  smoke[11].position.set(-34, -9, 0);
  smoke[12].position.set(-38, -10, 0);
  smoke[13].position.set(34, -9, 0);
  smoke[14].position.set(38, -10, 0);
}

const geometry1 = new THREE.PlaneBufferGeometry( 100, 56 );
const material1 = new THREE.MeshBasicMaterial( {color: 0x000000} );
material1.transparent = true;
material1.opacity = .2;
const stop1 = new THREE.Mesh( geometry1, material1 );
scene2.add( stop1 );
stop1.position.set(0, 0, 700);

const geometry1_ttl = new THREE.PlaneBufferGeometry( 57, 12 );
const stop1_text_ttl = new THREE.TextureLoader().load( 'imgs/stop1_ttl.png' );
const stop1_mat_ttl = new THREE.MeshBasicMaterial( { map: stop1_text_ttl } );
stop1_mat_ttl.transparent = true;
const stop1_ttl = new THREE.Mesh( geometry1_ttl, stop1_mat_ttl );
scene2.add( stop1_ttl );
stop1_ttl.position.set(0, 16, 701);

const geometry1_1 = new THREE.PlaneBufferGeometry( 15, 20 );
const stop1_text1 = new THREE.TextureLoader().load( 'imgs/stop1_1.png' );
const stop1_mat1 = new THREE.MeshBasicMaterial( { map: stop1_text1 } );
stop1_mat1.transparent = true;
const stop1_1 = new THREE.Mesh( geometry1_1, stop1_mat1 );
scene2.add( stop1_1 );
stop1_1.position.set(-32, -6, 701);

const geometry1_2 = new THREE.PlaneBufferGeometry( 15, 20 );
const stop1_text2 = new THREE.TextureLoader().load( 'imgs/stop1_2.png' );
const stop1_mat2 = new THREE.MeshBasicMaterial( { map: stop1_text2 } );
stop1_mat2.transparent = true;
const stop1_2 = new THREE.Mesh( geometry1_2, stop1_mat2 );
scene2.add( stop1_2 );
stop1_2.position.set(-11, -6, 701);

const geometry1_3 = new THREE.PlaneBufferGeometry( 15, 20 );
const stop1_text3 = new THREE.TextureLoader().load( 'imgs/stop1_3.png' );
const stop1_mat3 = new THREE.MeshBasicMaterial( { map: stop1_text3 } );
stop1_mat3.transparent = true;
const stop1_3 = new THREE.Mesh( geometry1_3, stop1_mat3 );
scene2.add( stop1_3 );
stop1_3.position.set(11, -6, 701);

const geometry1_4 = new THREE.PlaneBufferGeometry( 15, 20 );
const stop1_text4 = new THREE.TextureLoader().load( 'imgs/stop1_4.png' );
const stop1_mat4 = new THREE.MeshBasicMaterial( { map: stop1_text4 } );
stop1_mat4.transparent = true;
const stop1_4 = new THREE.Mesh( geometry1_4, stop1_mat4 );
scene2.add( stop1_4 );
stop1_4.position.set(32, -6, 701);



const geometry2 = new THREE.PlaneBufferGeometry( 100, 56 );
const material2 = new THREE.MeshBasicMaterial( {color: 0x000000} );
material2.transparent = true;
material2.opacity = 0;
const stop2 = new THREE.Mesh( geometry2, material2 );
scene2.add( stop2 );
stop2.position.set(0, 0, 500);

const geometry2_ttl = new THREE.PlaneBufferGeometry( 77, 5 );
const stop2_text_ttl = new THREE.TextureLoader().load( 'imgs/stop2_ttl.png' );
const stop2_mat_ttl = new THREE.MeshBasicMaterial( { map: stop2_text_ttl } );
stop2_mat_ttl.transparent = true;
stop2_mat_ttl.opacity = 0;
const stop2_ttl = new THREE.Mesh( geometry2_ttl, stop2_mat_ttl );
scene2.add( stop2_ttl );
stop2_ttl.position.set(0, 12, 501);

const geometry2_1 = new THREE.PlaneBufferGeometry( 15, 20 );
const stop2_text1 = new THREE.TextureLoader().load( 'imgs/stop2_1.png' );
const stop2_mat1 = new THREE.MeshBasicMaterial( { map: stop2_text1 } );
stop2_mat1.transparent = true;
stop2_mat1.opacity = 0;
const stop2_1 = new THREE.Mesh( geometry2_1, stop2_mat1 );
scene2.add( stop2_1 );
stop2_1.position.set(-32, -6, 501);

const geometry2_2 = new THREE.PlaneBufferGeometry( 15, 20 );
const stop2_text2 = new THREE.TextureLoader().load( 'imgs/stop2_2.png' );
const stop2_mat2 = new THREE.MeshBasicMaterial( { map: stop2_text2 } );
stop2_mat2.transparent = true;
stop2_mat2.opacity = 0;
const stop2_2 = new THREE.Mesh( geometry2_2, stop2_mat2 );
scene2.add( stop2_2 );
stop2_2.position.set(-11, -6, 501);

const geometry2_3 = new THREE.PlaneBufferGeometry( 15, 20 );
const stop2_text3 = new THREE.TextureLoader().load( 'imgs/stop2_3.png' );
const stop2_mat3 = new THREE.MeshBasicMaterial( { map: stop2_text3 } );
stop2_mat3.transparent = true;
stop2_mat3.opacity = 0;
const stop2_3 = new THREE.Mesh( geometry2_3, stop2_mat3 );
scene2.add( stop2_3 );
stop2_3.position.set(11, -6, 501);

const geometry2_4 = new THREE.PlaneBufferGeometry( 15, 20 );
const stop2_text4 = new THREE.TextureLoader().load( 'imgs/stop2_4.png' );
const stop2_mat4 = new THREE.MeshBasicMaterial( { map: stop2_text4 } );
stop2_mat4.transparent = true;
stop2_mat4.opacity = 0;
const stop2_4 = new THREE.Mesh( geometry2_4, stop2_mat4 );
scene2.add( stop2_4 );
stop2_4.position.set(32, -6, 501);



const geometry3 = new THREE.PlaneBufferGeometry( 100, 56 );
const material3 = new THREE.MeshBasicMaterial( {color: 0x000000} );
material3.transparent = true;
material3.opacity = 0;
const stop3 = new THREE.Mesh( geometry3, material3 );
scene2.add( stop3 );
stop3.position.set(0, 0, 300);

const geometry3_ttl = new THREE.PlaneBufferGeometry( 83, 10 );
const stop3_text_ttl = new THREE.TextureLoader().load( 'imgs/stop3_ttl.png' );
const stop3_mat_ttl = new THREE.MeshBasicMaterial( { map: stop3_text_ttl } );
stop3_mat_ttl.transparent = true;
stop3_mat_ttl.opacity = 0;
const stop3_ttl = new THREE.Mesh( geometry3_ttl, stop3_mat_ttl );
scene2.add( stop3_ttl );
//stop3_ttl.position.set(0, 18, 301);
stop3_ttl.position.set(0, 8, 301);

const geometry3_email = new THREE.PlaneBufferGeometry( 76, 8 );
const stop3_text_email = new THREE.TextureLoader().load( 'imgs/stop3_email.png' );
const stop3_mat_email = new THREE.MeshBasicMaterial( { map: stop3_text_email } );
stop3_mat_email.transparent = true;
stop3_mat_email.opacity = 0;
const stop3_email = new THREE.Mesh( geometry3_email, stop3_mat_email );
scene2.add( stop3_email );
//stop3_email.position.set(0, 7, 301);
stop3_email.position.set(0, -3, 301);

const geometry3_1 = new THREE.PlaneBufferGeometry( 21, 21 );
const stop3_text1 = new THREE.TextureLoader().load( 'imgs/stop3_1.png' );
const stop3_mat1 = new THREE.MeshBasicMaterial( { map: stop3_text1 } );
stop3_mat1.transparent = true;
stop3_mat1.opacity = 0;
const stop3_1 = new THREE.Mesh( geometry3_1, stop3_mat1 );
//scene2.add( stop3_1 );
stop3_1.position.set(-36, -12, 301);

const geometry3_2 = new THREE.PlaneBufferGeometry( 21, 21 );
const stop3_text2 = new THREE.TextureLoader().load( 'imgs/stop3_2.png' );
const stop3_mat2 = new THREE.MeshBasicMaterial( { map: stop3_text2 } );
stop3_mat2.transparent = true;
stop3_mat2.opacity = 0;
const stop3_2 = new THREE.Mesh( geometry3_2, stop3_mat2 );
//scene2.add( stop3_2 );
stop3_2.position.set(-13, -12, 301);

const geometry3_3 = new THREE.PlaneBufferGeometry( 21, 21 );
const stop3_text3 = new THREE.TextureLoader().load( 'imgs/stop3_3.png' );
const stop3_mat3 = new THREE.MeshBasicMaterial( { map: stop3_text3 } );
stop3_mat3.transparent = true;
stop3_mat3.opacity = 0;
const stop3_3 = new THREE.Mesh( geometry3_3, stop3_mat3 );
//scene2.add( stop3_3 );
stop3_3.position.set(13, -12, 301);

const geometry3_4 = new THREE.PlaneBufferGeometry( 21, 21 );
const stop3_text4 = new THREE.TextureLoader().load( 'imgs/stop3_4.png' );
const stop3_mat4 = new THREE.MeshBasicMaterial( { map: stop3_text4 } );
stop3_mat4.transparent = true;
stop3_mat4.opacity = 0;
const stop3_4 = new THREE.Mesh( geometry3_4, stop3_mat4 );
//scene2.add( stop3_4 );
stop3_4.position.set(36, -12, 301);


// Composer

composer = new THREE.EffectComposer(renderer);
composer2 = new THREE.EffectComposer(renderer);
const renderPass = new THREE.RenderPass(is_scene2 ? scene2 : scene, help_cam ? camera2 : camera);
const renderPass2 = new THREE.RenderPass(scene2, help_cam ? camera2 : camera);

fxaaPass = new THREE.ShaderPass(THREE.FXAAShader);
fxaaPass.material.uniforms[ 'resolution' ].value.x = .0007;
fxaaPass.material.uniforms[ 'resolution' ].value.y = .0007;

const bloom = new THREE.UnrealBloomPass({ x: 1024, y: 1024 }, .8, 1, .3);

composer.addPass(renderPass);
composer.addPass(bloom);
composer.addPass(fxaaPass);

composer2.addPass(renderPass2);
composer2.addPass(bloom);

// Mouse Move Function

function onDocumentMouseMove( event ) {

  //if(!is_scene2) return;

  mouseX = ( event.clientX - windowHalfX ) / 50;
  mouseY = ( event.clientY - windowHalfY ) / 50;

  event.preventDefault();

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}


function animate() {

    req_af = requestAnimationFrame(animate);

    let mixerUpdateDelta = clock.getDelta();
    if (mixer) {
      mixer.update( mixerUpdateDelta );
    }

    composer.render();

    if (help_cam) {
      controls.update();
    }

    if (unlock && !ismobile) {
      camera.position.x += ( mouseX - camera.position.x ) * .5;
      camera.position.y += ( - mouseY - camera.position.y + 12 ) * .5;
      camera.lookAt( 0, 20, 0 );
    } else {
      camera.lookAt( 0, 0, 0 );
    }

    if (!unlock) {
      if(scale_factor < 1) {
        scale_factor += .005;
        countdown.children[2].visible=true;
        if(scale_factor > .3) {
          countdown.children[2].visible=false;
          countdown.children[1].visible=true;
        }
        if(scale_factor > .6) {
          countdown.children[1].visible=false;
          countdown.children[0].visible=true;
        }
        if(scale_factor > .9) {
          countdown.children[0].visible=false;
        }

        let trnsp = 1-scale_factor*20;

        if(trnsp >= 0) {
          logo.children[0].material.opacity = trnsp;
          logo.children[1].material.opacity = trnsp;
        } else {
          logo.children[0].material.opacity = 0;
          logo.children[1].material.opacity = 0;
        }

        for(i=0; i<15; i++) {
          smoke[i].scale.set(60*scale_factor, 40*scale_factor, 0);
          smoke[i].position.z = -20*scale_factor;
        }

        flame.scale.set(2.6*scale_factor,5*scale_factor,2.6*scale_factor);

        if(!ismobile) {
          camera.position.z = scale_factor*60 - 110;
          camera.position.y = camera_before_start_y;
          camera.lookAt(0, 20, 0)
        } else {
          camera.position.z = scale_factor*60 - 130;
          camera.position.y = camera_before_start_y;
          camera.lookAt( 0, 0, 0 );
        }
        

      } else if (height_factor < 1) {

        height_factor += .001;
        rocket.position.y = 1200 * height_factor;
        flame.position.y = 1200 * height_factor + 6;
        rocket.rotation.y = Math.PI * height_factor + .2;
        for(i = 0; i<5; i++) {
          pointLight[i].intensity = (1-height_factor) / 6;
        }
        if(height_factor > .6) {
          let scl = (1-height_factor)*2.5;
          flame.scale.set(2.6*scl, 5*scl, 2.6*scl);
          rocket.scale.set(scl, scl, scl);

          if(music) {
            sound2.play();
            music = false;
          }

          $("#loader").style.display = "block";
          setTimeout(function(){
            $("#loader").style.opacity = 1;
          }, 100);
        }

        if(!ismobile) {
          camera.position.z = height_factor*50 - 50;
          camera.position.y = height_factor*96 + camera_before_start_y;
          camera.lookAt(0, height_factor*1200+20, 0)
        } else {
          camera.position.z = height_factor*50 - 70;
          camera.position.y = height_factor*96 + camera_before_start_y;
          camera.lookAt(0, height_factor*1200, 0)
        }

      } else if (height_factor >= 1) {

        cancelAnimationFrame(req_af);
        is_scene2 = true;
        req_af = requestAnimationFrame(animate2);

        $("body").style.height = "10000px";

        $("#loader").style.opacity = 0;
        setTimeout(function(){
          $("#mouse_icon").classList.add("active");
          $("#pointer_icon").classList.add("active");
          $("#loader").style.display = "none";
        }, 1000);
      }
    }

    if(!pink) {
      if(btn_r < .5) {
        btn_r += .01;
        btn_g -= .019;
      } else {
        pink = true;
      }
    } else {
      if(btn_r > 0) {
        btn_r -= .01;
        btn_g += .019;
      } else {
        pink = false;
      }
    }

    logo.children[0].material.emissive.r = btn_r;
    logo.children[0].material.emissive.g = btn_g;

    logo.rotation.y += .01;

    raycaster.setFromCamera(mouse, help_cam ? camera2 : camera);


    if ( raycaster.intersectObject(logo.children[2]).length > 0 ) {

      $("canvas").style.cursor = "pointer";
      if(!ismobile) {
        logo.scale.set(5.4,5.4,5.4);
      } else {
        logo.scale.set(4.2,4.2,4.2);
      }

      $("canvas").onclick = function() {
        $("#skip").style.display = "none";
        if(unlock) {
          camera_before_start_y = camera.position.y
          flame.visible = true;
          unlock = false;
          sound.play();
        }
      };

    } else {
      $("canvas").style.cursor = "default";
      $("canvas").onclick = null;
      if(!ismobile) {
        logo.scale.set(5,5,5);
      } else {
        logo.scale.set(4,4,4);
      }
    }

}

function selected_state(obj) {
    $("canvas").style.cursor = "pointer";
    obj.material.color.set(0x67e8fa);
    obj.scale.set(1.06, 1.06, 1);
}

function unselect_state() {
  $("canvas").onclick = null;
  $("canvas").style.cursor = "default";
  let all_obj = [stop1_1, stop1_2, stop1_3, stop1_4, stop2_1, stop2_2, stop2_3, stop2_4, stop3_email]
  for(let i = 0; i < all_obj.length; i++) {
    all_obj[i].material.color.set(0xffffff);
    all_obj[i].scale.set(1, 1, 1);
  }
  why.children[0].material.emissiveIntensity = .9;
  why.children[2].material.emissive.b = 0;
  why.scale.set(10, 10, 10);
  if(ismobile) {
    why.scale.set(5,5,5);
  }
  console.log("working");
}

function options_active() {
  $("#scene2_options").classList.add("active");
  $("#close_bttn").classList.add("active");
}

function OpenInNewTabWinBrowser(url) {
  let win = window.open(url, '_blank');
  win.focus();
}

function close_all() {
  $("#scene2_options").classList.remove("active");
  $("#close_bttn").classList.remove("active");
  $("#close_bttn").classList.remove("email_section");

  $("#space_music").classList.add("inactive");
  $("#become").classList.add("inactive");

  $("#space_music").contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  if (!sound2.isPlaying) {
    sound2.play();
  }
}

document.addEventListener('scroll', function(e) {
  scene2_cam_pos = 620 * getScrollPercent();
  if (!sound2.isPlaying) {
    sound2.play();
  }
});

// Window events

window.addEventListener( 'resize', onWindowResize, false );

window.addEventListener("blur", win_blur, false);

window.addEventListener("focus", win_focus, false);

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function win_blur() {
  if(music) {
    sound.pause();
  } else {
    sound2.pause();
  }
  //cancelAnimationFrame(req_af);
}

function win_focus() {
  if(is_started) {
    if(music) {
      // cancelAnimationFrame(req_af);
      // req_af = requestAnimationFrame(animate);
      if(!unlock && !sound2.isPlaying) {
        sound.play();
      }
    } else {
      // cancelAnimationFrame(req_af);
      // req_af = requestAnimationFrame(animate2);
      if (!sound2.isPlaying) {
        sound2.play();
      }
    }
  }
}

function skip_intro() {
  $("#skip").style.display = "none";

  if(music) {
    sound2.play();
    music = false;
  }

  $("#loader").style.display = "block";
  setTimeout(function(){
    $("#loader").style.opacity = 1;
  }, 100);

  $("body").style.height = "10000px";

  setTimeout(function(){
    cancelAnimationFrame(req_af);
    is_scene2 = true;
    req_af = requestAnimationFrame(animate2);

    $("#loader").style.opacity = 0;
    $("#mouse_icon").classList.add("active");
    $("#pointer_icon").classList.add("active");
    setTimeout(function(){
      $("#loader").style.display = "none";
    }, 1000);
  }, 1000);

}

$("#skip").onclick = skip_intro;

function animate2() {

    req_af = requestAnimationFrame(animate2);

    camera.position.set(0, 0, 900 - scene2_cam_pos);

    if(!pink) {
      if(btn_r < .5) {
        btn_r += .01;
        btn_g -= .019;
      } else {
        pink = true;
      }
    } else {
      if(btn_r > 0) {
        btn_r -= .01;
        btn_g += .019;
      } else {
        pink = false;
      }
    }

    why.children[0].material.emissive.r = btn_r;
    why.children[0].material.emissive.g = btn_g;

    if(scene2_cam_pos > 600) {
      $("#mouse_icon").classList.remove("active");
      $("#pointer_icon").classList.remove("active");
    } else {
      $("#mouse_icon").classList.add("active");
      $("#pointer_icon").classList.add("active");
    }

    if(scene2_cam_pos > 200 && scene2_cam_pos < 400) {
      material2.opacity = .2
      stop2_mat_ttl.opacity = 1;
      stop2_mat1.opacity = 1;
      stop2_mat2.opacity = 1;
      stop2_mat3.opacity = 1;
      stop2_mat4.opacity = 1;
    } else {
      material2.opacity = 0;
      stop2_mat_ttl.opacity = 0;
      stop2_mat1.opacity = 0;
      stop2_mat2.opacity = 0;
      stop2_mat3.opacity = 0;
      stop2_mat4.opacity = 0;
    }

    if(scene2_cam_pos > 400 && scene2_cam_pos < 600) {
      material3.opacity = .2
      stop3_mat_ttl.opacity = 1;
      stop3_mat_email.opacity = 1;
      stop3_mat1.opacity = 1;
      stop3_mat2.opacity = 1;
      stop3_mat3.opacity = 1;
      stop3_mat4.opacity = 1;
    } else {
      material3.opacity = 0;
      stop3_mat_ttl.opacity = 0;
      stop3_mat_email.opacity = 0;
      stop3_mat1.opacity = 0;
      stop3_mat2.opacity = 0;
      stop3_mat3.opacity = 0;
      stop3_mat4.opacity = 0;
    }

    if(scene2_cam_pos > 600 && scene2_cam_pos < 630) {
      why.children[0].material.opacity = 1;
      why.children[2].material.opacity = 1;
    } else {
      why.children[0].material.opacity = 0;
      why.children[2].material.opacity = 0;
    }

    camera.position.x += ( mouseX - camera.position.x ) * .2;
    camera.position.y += ( - mouseY - camera.position.y ) * .2;
    camera.lookAt(0, 0, 0);

    raycaster2 = new THREE.Raycaster();
    raycaster2.setFromCamera(mouse, help_cam ? camera2 : camera);


    if (raycaster2.intersectObject(stop1_1).length > 0) {
      unselect_state();
      selected_state(stop1_1);
      $("canvas").onclick = function() {
        sound2.pause();
        $("#space_music").classList.remove("inactive");
        $("#close_bttn").addEventListener("click", close_all);
        options_active();
      }
    } else if (raycaster2.intersectObject(stop1_2).length > 0) {
      unselect_state();
      selected_state(stop1_2)
      $("canvas").onclick = function() {
        sound2.pause();
        $("#space_music").classList.remove("inactive");
        $("#close_bttn").addEventListener("click", close_all);
        options_active();
      }
    } else if (raycaster2.intersectObject(stop1_3).length > 0) {
      unselect_state();
      selected_state(stop1_3)
      $("canvas").onclick = function() {
        sound2.pause();
        $("#space_music").classList.remove("inactive");
        $("#close_bttn").addEventListener("click", close_all);
        options_active();
      }
    } else if (raycaster2.intersectObject(stop1_4).length > 0) {
      unselect_state();
      selected_state(stop1_4)
      $("canvas").onclick = function() {
        sound2.pause();
        $("#space_music").classList.remove("inactive");
        $("#close_bttn").addEventListener("click", close_all);
        options_active();
      }
    } else if (raycaster2.intersectObject(stop2_1).length > 0 && scene2_cam_pos > 200 && scene2_cam_pos < 400) {
      unselect_state();
      selected_state(stop2_1);
      $("canvas").onclick = function() {
        OpenInNewTabWinBrowser("watch.html");
      }
    } else if (raycaster2.intersectObject(stop2_2).length > 0 && scene2_cam_pos > 200 && scene2_cam_pos < 400) {
      unselect_state();
      selected_state(stop2_2)
      $("canvas").onclick = function() {
        OpenInNewTabWinBrowser("listen.html");
      }
    } else if (raycaster2.intersectObject(stop2_3).length > 0 && scene2_cam_pos > 200 && scene2_cam_pos < 400) {
      unselect_state();
      selected_state(stop2_3)
      $("canvas").onclick = function() {
        OpenInNewTabWinBrowser("read.html");
      }
    } else if (raycaster2.intersectObject(stop2_4).length > 0 && scene2_cam_pos > 200 && scene2_cam_pos < 400) {
      unselect_state();
      selected_state(stop2_4)
      $("canvas").onclick = function() {
        OpenInNewTabWinBrowser("subscribe.html");
      }
    } else if (raycaster2.intersectObject(stop3_email).length > 0 && scene2_cam_pos > 400 && scene2_cam_pos < 600) {
      unselect_state();
      selected_state(stop3_email);
      $("canvas").onclick = function() {
        $("#become").classList.remove("inactive");
        $("#close_bttn").addEventListener("click", close_all);
        options_active();
        $("#close_bttn").classList.add("email_section");
      }
    } else if (raycaster2.intersectObject(why.children[1]).length > 0 && scene2_cam_pos > 600 && scene2_cam_pos < 630) {
      unselect_state();
      $("canvas").style.cursor = "pointer";
      why.children[0].material.emissiveIntensity = 1.2;
      why.children[2].material.emissive.b = btn_g;
      why.scale.set(10.5, 10.5, 10.5);
      if(ismobile) {
        why.scale.set(6,6,6);
      }
      $("canvas").onclick = function() {
        OpenInNewTabWinBrowser("why.html");
      }
    } else {
      unselect_state();
    }

    composer2.render();

}