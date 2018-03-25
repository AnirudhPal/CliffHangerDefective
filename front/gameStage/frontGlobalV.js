/**
* Description: The _frontGlobal.js is where all globally
* used variables are initialized. The variables that
* are present here need to be used elsewhere. If they
* are not used elsewhere, place the variables where they are
* used once instead of here. Also objects are created here.
**/


/** Config Vars **/
var TESTING = false;
var VERBOSE = true;
var DEEP_VERBOSE = false;
var ELEMENT_ID = 'gameScreen';
var BACKGROUND_COLOR = 0x87CEEB;
var LAMBERT_COLOR = 0xD7DFE5;
var AXES = false;
var AXES_SIZE = 100;
var LIGHT_COLOR = 0xFFFFF0;
var LIGHT_INTENSITY = 0.5;
var PLATE_SIZE = 20;
var PLATE_THICKNESS = 5;
var CAM_FOV = 45;
var CAM_FAR_PLANE = 305 //5000;
var CAM_NEAR_PLANE = 1;
var CAM_POS = {X:99, Y:-99, Z:300};
var CAM_LOOK = {X:99, Y:-99, Z:0};
var PLATE_GAP = 2;
var PLATE_DEPTH = -5;
var SP = 0;
var MP_DUR = 0.5;
var FP_DUR = 5.00;
var FP_BUF = 1000;
var FP_EXP = 5;
var SP_RED = 0.05;
var SP_MIN = 0.00001;
var MOV_ERR = 2;

// Animations Performance Test: Graph frames rendered in the last second (FPS), msecs needed to render a frame (MS), and mbytes of allocated memory (MB).
/* Anjali uncomment for testing */
/*(function performanceTest()
{
  var script=document.createElement('script');
  script.onload=function measureStats()
  {
    var stats=new Stats();
    document.body.appendChild(stats.dom);

    // adjust according the game screen
    stats.domElement.style.top = '720px';

    requestAnimationFrame(function loop()
    {
      stats.update();
      requestAnimationFrame(loop)
    });
  };
  script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
  document.head.appendChild(script)
;})()
*/

if (TESTING) {
  var THREE = require('three');
}

// Console Print
if(VERBOSE && !TESTING) {
  console.log("Config Vars Done");
}

// TESTABLE
if (TESTING) {
  global.TESTING = true;
  global.TESTING_SSIDE = true;
  global.VERBOSE = false;
  global.DEEP_VERBOSE = false;
  global.ELEMENT_ID = 'gameScreen';
  global.BACKGROUND_COLOR = 0x87CEEB;
  global.LAMBERT_COLOR = 0xD7DFE5;
  global.AXES = true;
  global.AXES_SIZE = 5;
  global.LIGHT_COLOR = 0xFFFFF0;
  global.LIGHT_INTENSITY = 0.5;
  global.PLATE_SIZE = 20;
  global.PLATE_THICKNESS = 5;
  global.CAM_FOV = 45;
  global.CAM_FAR_PLANE = 5000;
  global.CAM_NEAR_PLANE = 1;
  global.CAM_POS = {X:0, Y:0, Z:100};
  global.CAM_LOOK = {X:0, Y:0, Z:0};
  global.PLATE_GAP = 1;
  global.PLATE_DEPTH = -3;
  global.SP = 0;
  global.MP_DUR = 0.5;
  global.FP_DUR = 5.00;
  global.FP_BUF = 1000;
  global.FP_EXP = 5;

}

// Import Node Lib
if (TESTING) {
  var THREE = require('three');
}


/** Setup HTML Element **/
// Get Element Reference
// NOT TESTABLE
if (!TESTING) {
  // var screen = document.getElementById(ELEMENT_ID);
  // // // Change Based on Available setSize
  // screen.width = window.innerWidth;
  // screen.height = window.innerHeight;
}
// TESTABLE ALTERNATIVE
if (TESTING && TESTING_SSIDE) {
  var screen = {
    width: 100,
    height: 50
  };

}

// Console Print
if(VERBOSE && !TESTING) {
  console.log("Screen Done");
  if(DEEP_VERBOSE){
    console.log(screen);
  }
}


/** Setup Render Engine **/
// Set WebGL
// NOT TESTABLE
if (!TESTING) {
  var draw = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  draw.sortObjects = false;
}

// Console Print
if(VERBOSE && !TESTING) {
  console.log("Draw Done");
  if(DEEP_VERBOSE){
    console.log(draw);
  }
}


/** Setup Clock **/
var clock = new THREE.Clock();
if (TESTING) {
  global.clock = clock;
}


/** Setup Raycaster **/
var ray = new THREE.Raycaster();
var mouse = new THREE.Vector2();


/** Setup cam & Orbital Controls **/
// Set cam
var cam = new THREE.PerspectiveCamera(CAM_FOV, screen.width / screen.height, CAM_NEAR_PLANE, CAM_FAR_PLANE);
// Set Controls
// NOT TESTABLE
if (!TESTING) {
  var controls = new THREE.OrbitControls(cam, draw.domElement);
}

// Console Print
if(VERBOSE && !TESTING) {
  console.log("Cam Done");
  if(DEEP_VERBOSE){
    console.log(cam);
  }
  console.log("Controls Done");
  if(DEEP_VERBOSE){
    console.log(controls);
  }
}


/** Setup Geometries **/
// Set Scene
var scene = new THREE.Scene();
// Add Axis
if (AXES) {
  var axes = new THREE.AxesHelper(AXES_SIZE);
}
// Set Lighting
var ambLight = new THREE.AmbientLight(LIGHT_COLOR, LIGHT_INTENSITY);
var pointLight = new THREE.PointLight(LIGHT_COLOR, LIGHT_INTENSITY / 2);
// Set Material
var lambert = new THREE.MeshPhongMaterial({color: LAMBERT_COLOR});
// Set Geometry
var plateGeom = new THREE.CubeGeometry(PLATE_SIZE, PLATE_SIZE, PLATE_THICKNESS);

// Console Print
if(VERBOSE && !TESTING) {
  console.log("Scene Done");
  if(DEEP_VERBOSE){
    console.log(scene);
  }
  console.log("Ambient Light Done");
  if(DEEP_VERBOSE){
    console.log(ambLight);
  }
  console.log("Point Light Done");
  if(DEEP_VERBOSE){
    console.log(pointLight);
  }
}

/** Load Custom Object **/
// 3D Object Array
var obj3DArray = [];
if(VERBOSE && !TESTING) {
  console.log("obj3DArray Done");
  if(DEEP_VERBOSE){
    console.log(obj3DArray);
  }
}

// Set STL Loader
// NOT TESTABLE
if (!TESTING) {
  var STL = new THREE.STLLoader();
}

// Win size
function onWindowResize() {
  cam.aspect = screen.innerWidth / screen.innerHeight;
  cam.updateProjectionMatrix();
  draw.setSize( screen.innerWidth, screen.innerHeight );
}
window.addEventListener('resize', onWindowResize, false);


//Export if TESTING
if (TESTING) {
  module.exports = {
    screen,
    obj3DArray,
    plateGeom,
    lambert,
    ambLight,
    pointLight,
    axes,
    scene,
    cam

  };
}
