let camera2;

function set_helpers() {

  camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera2.position.set(0, 300, 0.1);
  camera.lookAt( scene.position );

  const gridHelper = new THREE.GridHelper( 300, 30 );
  scene.add( gridHelper );

  const axesHelper = new THREE.AxesHelper( 150 );
  scene.add( axesHelper );

  const cam1_helper = new THREE.CameraHelper( camera );
  scene.add( cam1_helper );

  const cam2_helper = new THREE.CameraHelper( camera );
  scene2.add( cam2_helper );

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