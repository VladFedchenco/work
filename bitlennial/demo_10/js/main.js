let scene, scene2, renderer, composer, fxaaPass;
let clock, controls, mixer, raycaster, loader;
let camera, camera2, light, pointLight;
let rocket, flame, logo, countdown, smoke;
let sound, sound_init, audioLoader;

let help_cam = false;
let is_scene2 = false;

let scene2_cam_pos = 0;

let unlock = true;
let scale_factor = 0;
let height_factor = 0;
let rocket_scale = 1;
let camera_before_start_y;

let btn_r = 0.00485;
let btn_g = 1;
let pink = false;

let req_af;

let ismobile = false;

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  ismobile = true;
}else{
  let ismobile = false;
}


// Load Manager

const manager = new THREE.LoadingManager();

manager.onLoad = function ( ) {
  console.log("ready");
  setTimeout(function(){
    document.querySelector("#loader").style.opacity = 0;
    is_scene2 ? animate2() : animate() ;
    setTimeout(function(){
      document.querySelector("#loader").style.display = "none";
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

  const sky = new THREE.TextureLoader();
  sky.load('imgs/bg.jpg' , function(texture) {
       scene2.background = texture;  
  });

  raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devidePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(64, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 12, -110);

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

  // Helpers for the Scene 1

  if (help_cam) {

  camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera2.position.set(0, 300, 0.1);
  camera.lookAt( scene.position );

  const gridHelper = new THREE.GridHelper( 300, 30 );
  scene.add( gridHelper );

  const axesHelper = new THREE.AxesHelper( 150 );
  scene.add( axesHelper );

  const helper = new THREE.CameraHelper( camera );
  scene.add( helper );
  scene2.add( helper );

  const pointLightHelper = new THREE.PointLightHelper( pointLight[0], 10 );
  scene.add( pointLightHelper );

  const pointLightHelper2 = new THREE.PointLightHelper( pointLight[1], 4 );
  scene.add( pointLightHelper2 );

  const pointLightHelper3 = new THREE.PointLightHelper( pointLight[2], 4 );
  scene.add( pointLightHelper3 );

  const pointLightHelper4 = new THREE.PointLightHelper( pointLight[3], 4 );
  scene.add( pointLightHelper4 );

  const pointLightHelper5 = new THREE.PointLightHelper( pointLight[4], 4 );
  scene.add( pointLightHelper5 );

  const lhelper0 = new THREE.DirectionalLightHelper( light[0], 3 );
  scene.add( lhelper0 );

  const lhelper1 = new THREE.DirectionalLightHelper( light[1], 3 );
  scene.add( lhelper1 );

  const lhelper2 = new THREE.DirectionalLightHelper( light[2], 3 );
  scene.add( lhelper2 );

  const lhelper3 = new THREE.DirectionalLightHelper( light[3], 3 );
  scene.add( lhelper3 );

  // Orbit Controls

  controls = new THREE.OrbitControls(camera2, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.autoRotate = false;
  controls.autoRotateSpeed = .8;
  controls.update();

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

  loader.load('models/bttn_b.gltf', function(gltf) {
      logo = gltf.scene;
      logo.children[0].material.transparent = true;
      logo.children[2].visible = false;
      logo.position.set(0, -8, -40);
      logo.rotation.y = Math.PI;
      logo.scale.set(6,6,6);
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

  const stop1 = new THREE.TextureLoader().load( 'imgs/stop1.png' );
  const stop1_material = new THREE.SpriteMaterial( { map: stop1 } );
  let stop1_plane = new THREE.Sprite( stop1_material );
  scene2.add( stop1_plane );
  stop1_plane.position.set(0, 0, 700);
  stop1_plane.scale.set(100, 56, 0);

  const stop2 = new THREE.TextureLoader().load( 'imgs/stop2.png' );
  const stop2_material = new THREE.SpriteMaterial( { map: stop2 } );
  let stop2_plane = new THREE.Sprite( stop2_material );
  scene2.add( stop2_plane );
  stop2_plane.position.set(0, 0, 500);
  stop2_plane.scale.set(100, 56, 0);
  stop2_plane.material.opacity = 0;

  const stop3 = new THREE.TextureLoader().load( 'imgs/stop3.png' );
  const stop3_material = new THREE.SpriteMaterial( { map: stop3 } );
  let stop3_plane = new THREE.Sprite( stop3_material );
  scene2.add( stop3_plane );
  stop3_plane.position.set(0, 0, 300);
  stop3_plane.scale.set(100, 56, 0);
  stop3_plane.material.opacity = 0;

  const stop4 = new THREE.TextureLoader().load( 'imgs/stop4.png' );
  const stop4_material = new THREE.SpriteMaterial( { map: stop4 } );
  let stop4_plane = new THREE.Sprite( stop4_material );
  scene2.add( stop4_plane );
  stop4_plane.position.set(0, 0, 200);
  stop4_plane.scale.set(100, 56, 0);
  stop4_plane.material.opacity = 0;

// Composer

composer = new THREE.EffectComposer(renderer);
composer2 = new THREE.EffectComposer(renderer);
const renderPass = new THREE.RenderPass(is_scene2 ? scene2 : scene, help_cam ? camera2 : camera);
const renderPass2 = new THREE.RenderPass(scene2, camera);

fxaaPass = new THREE.ShaderPass(THREE.FXAAShader);
fxaaPass.material.uniforms[ 'resolution' ].value.x = .0007;
fxaaPass.material.uniforms[ 'resolution' ].value.y = .0007;

composer.addPass(renderPass);
composer.addPass(new THREE.UnrealBloomPass({ x: 1024, y: 1024 }, .8, 1, .3));
composer.addPass(fxaaPass);

composer2.addPass(renderPass2);
composer2.addPass(new THREE.UnrealBloomPass({ x: 1024, y: 1024 }, .8, 1, .3));

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

    if (unlock) {
      camera.position.x += ( mouseX - camera.position.x ) * .5;
      camera.position.y += ( - mouseY - camera.position.y + 12 ) * .5;
      camera.lookAt( 0, 20, 0 );
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
        camera.position.z = scale_factor*60 - 110;
        camera.position.y = camera_before_start_y;
        camera.lookAt(0, 20, 0)
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

          sound2.play();
          document.querySelector("#loader").style.display = "block";
          setTimeout(function(){
            document.querySelector("#loader").style.opacity = 1;
          }, 100);
        }
        camera.position.z = height_factor*50 - 50;
        camera.position.y = height_factor*96 + camera_before_start_y;
        camera.lookAt(0, height_factor*1200+20, 0)
      } else if (height_factor >= 1) {
        cancelAnimationFrame(req_af);
        is_scene2 = true;
        req_af = requestAnimationFrame(animate2);

        document.querySelector("#loader").style.opacity = 0;
        setTimeout(function(){
          document.querySelector("#loader").style.display = "none";
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

    let intersects = raycaster.intersectObjects(logo.children, true);

    if ( intersects.length > 0 ) {

      document.querySelector("body").style.cursor = "pointer";
      if(!ismobile) {
        logo.scale.set(6.4,6.4,6.4);
      } else {
        logo.scale.set(4.2,4.2,4.2);
      }

      document.querySelector("body").onclick = function() {
        if(unlock) {
          camera_before_start_y = camera.position.y
          flame.visible = true;
          unlock = false;
          sound.play();
        }
      };

    } else {
      document.querySelector("body").style.cursor = "default";
      document.querySelector("body").onclick = null;
      if(!ismobile) {
        logo.scale.set(6,6,6);
      } else {
        logo.scale.set(4,4,4);
      }
    }

}

function animate2() {

    requestAnimationFrame(animate2);

    if(scene2_cam_pos < 620) {
      scene2_cam_pos += .3;
    }
    camera.position.set(0, 0, 900 - scene2_cam_pos);
    // camera.position.set(0, 0, 900);

    if(scene2_cam_pos > 200) {
      stop2_plane.material.opacity = 1;
    }

    if(scene2_cam_pos > 400) {
      stop3_plane.material.opacity = 1;
    }

    if(scene2_cam_pos > 600) {
      stop4_plane.material.opacity = 1;
    }

    camera.position.x += ( mouseX - camera.position.x ) * .2;
    camera.position.y += ( - mouseY - camera.position.y ) * .2;
    camera.lookAt(0, 0, 0);

    composer2.render();

    // raycaster.setFromCamera(mouse, camera);

    // let intersects = raycaster.intersectObjects(logo.children, true);

    // if ( intersects.length > 0 ) {

    //   document.querySelector("body").style.cursor = "pointer";
    //   if(!ismobile) {
    //     logo.scale.set(6.4,6.4,6.4);
    //   } else {
    //     logo.scale.set(4.2,4.2,4.2);
    //   }

    //   document.querySelector("body").onclick = function() {
    //     if(unlock) {
    //       camera_before_start_y = camera.position.y
    //       flame.visible = true;
    //       unlock = false;
    //       sound.play();
    //     }
    //   };

    // } else {
    //   document.querySelector("body").style.cursor = "default";
    //   document.querySelector("body").onclick = null;
    //   if(!ismobile) {
    //     logo.scale.set(6,6,6);
    //   } else {
    //     logo.scale.set(4,4,4);
    //   }
    // }

}