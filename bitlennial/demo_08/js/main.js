const manager = new THREE.LoadingManager();

let scene, clock, renderer, composer, camera, light, mixer, raycaster, loader, rocket, flame, logo, countdown, sound, sound_init, audioLoader;

let unlock = true;
let scale_factor = 0
let height_factor = 0;
let rocket_scale = 1;
let camera_before_start_y;

let mouseX = 0, mouseY = 0;

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const mouse = new THREE.Vector2();
const radius = 10;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );

init();

manager.onLoad = function ( ) {
  console.log("ready");
  setTimeout(function(){
    document.querySelector("#loader_animation").classList.add("invis");
    document.querySelector("#start_bttn").classList.remove("invis");

    document.querySelector("#start_bttn").onclick = function() {
      sound_init.play();
      document.querySelector("#loader").style.opacity = 0;
      animate();
      document.querySelector("#start_bttn").classList.add("invis");
    }

  }, 3000);
  //document.querySelector("#loader").style.opacity = 0;
  //animate();
};

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

  raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devidePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(30, 0, -140);

  const listener = new THREE.AudioListener();
  camera.add( listener );

  sound = new THREE.Audio( listener );

  audioLoader = new THREE.AudioLoader();

  audioLoader.load( 'sounds/countdown.mp3', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( false );
    sound.setVolume( 0.5 );
  });

  sound_init = new THREE.Audio( listener );

  audioLoader.load( 'sounds/initial.mp3', function( buffer ) {
    sound_init.setBuffer( buffer );
    sound_init.setLoop( true );
    sound_init.setVolume( 0.5 );
  });

  composer = new THREE.EffectComposer(renderer);
  const renderPass = new THREE.RenderPass(scene, camera);
  composer.addPass(renderPass);
  composer.addPass(new THREE.UnrealBloomPass({ x: 1024, y: 1024 }, .8, 1.2, .5));

  light = [];

  for(i = 0; i<4; i++) {
    light[i] = new THREE.DirectionalLight(0x333333, 1.1);
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

  light[0].position.set(100, 100, 0);
  light[0].target.position.set(60, 60, 0);
  light[1].position.set(-100, 100, 0);
  light[1].target.position.set(-60, 60, 0);
  light[2].position.set(0, 100, 100);
  light[2].target.position.set(0, 60, 60);
  light[3].position.set(0, 100, -100);
  light[3].target.position.set(0, 60, -60);

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
      rocket.position.y = 0;
      scene.add(rocket);
  });

  loader.load('models/launch_site.gltf', function(gltf) {
      model = gltf.scene;
      scene.add(model);
  });

  loader.load('models/logo.gltf', function(gltf) {
      logo = gltf.scene;
      logo.position.set(40, -14, -90);
      logo.rotation.y = Math.PI * .86;
      logo.scale.set(11,11,11);
      scene.add(logo);
  });

  loader.load('models/countdown.gltf', function(gltf) {
      countdown = gltf.scene;
      countdown.position.set(-30, 6, -40);
      countdown.rotation.y = Math.PI * .86;
      countdown.scale.set(3,3,3);
      countdown.children[0].visible=false;
      countdown.children[1].visible=false;
      countdown.children[2].visible=false;
      scene.add(countdown);
  });

}

function onDocumentMouseMove( event ) {

  mouseX = ( event.clientX - windowHalfX ) / 50;
  mouseY = ( event.clientY - windowHalfY ) / 50;

  event.preventDefault();

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}


function animate() {

    requestAnimationFrame(animate);

    let mixerUpdateDelta = clock.getDelta();
    if (mixer) {
      mixer.update( mixerUpdateDelta );
    }

    composer.render();

    if (unlock) {
      camera.position.x += ( mouseX - camera.position.x ) * .5 + 30;
      camera.position.y += ( - mouseY - camera.position.y ) * .5;
      camera.lookAt( scene.position );
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
        countdown.rotation.y = Math.PI - Math.PI * scale_factor / 4;
        countdown.scale.set(3+1*scale_factor, 3+1*scale_factor, 3+1*scale_factor);
        flame.scale.set(2.6*scale_factor,5*scale_factor,2.6*scale_factor);
        camera.position.z = scale_factor*60 - 140;
        camera.position.y = camera_before_start_y;
        camera.lookAt(0, 0, 0)
      } else if (height_factor < 1) {
        height_factor += .002;
        rocket.position.y = 300 * height_factor;
        flame.position.y = 300 * height_factor + 6;
        rocket.rotation.y = Math.PI * height_factor / 7;
        for(i = 0; i<4; i++) {
          light[i].intensity = 1.1 + 1*height_factor;
        }
        camera.position.z = height_factor*60 - 80;
        camera.position.y = height_factor*50 + camera_before_start_y;
        camera.lookAt(0, height_factor*250, 0)
      } else if (rocket_scale > 0) {
        rocket_scale -= .002;
        camera.lookAt(0, (1-rocket_scale)*-80 + 250, 0)
        flame.scale.set(2.6*rocket_scale, 5*rocket_scale, 2.6*rocket_scale);
        rocket.scale.set(rocket_scale, rocket_scale, rocket_scale);
      }
    }

    raycaster.setFromCamera( mouse, camera );

    const intersects = raycaster.intersectObjects(logo.children, true);

    if ( intersects.length > 0 ) {

      document.querySelector("body").style.cursor = "pointer";
      logo.children[0].material.emissive.g = .7;

      document.querySelector("body").onclick = function() {
        if(unlock) {
          camera_before_start_y = camera.position.y
          logo.children[0].visible = false;
          flame.visible = true;
          unlock = false;
          sound_init.stop();
          sound.play();
        }
      };

    } else {

      document.querySelector("body").style.cursor = "default";
      logo.children[0].material.emissive.g = 1;

    }

}