/**
* Description: The Stage Builder is responsible for controlling
* variables that are specific to the game enviroment and stage.
* This can include things like lighting, stage size etc.
* This should only be used as a setup and not as a continously
* running script.
**/
if (TESTING){
  const gSG = require('./_frontGlobal.js');
  var THREE = require('three');
  screen = gSG.screen;
  obj3DArray = gSG.obj3DArray;
  plateGeom = gSG.plateGeom;
  lambert = gSG.lambert;
  ambLight = gSG.ambLight;
  pointLight = gSG.pointLight;
  axes = gSG.axes;
  scene = gSG.scene;
  cam = gSG.cam;
}

/** Initialize Minimum Vars **/
function initScreen() {
  if (!TESTING) {
    // Set Background Color
    draw.setClearColor(BACKGROUND_COLOR);
    // Set Size
    draw.setSize(screen.width/2, screen.height/2);
    // Attach Render to HTML Element
    document.body.appendChild(draw.domElement);
  }
  // Set cam Postion
  cam.position.set(CAM_POS.X, CAM_POS.Y, CAM_POS.Z);
  controls.update();
  // Set cam Direction
  cam.lookAt(new THREE.Vector3(CAM_LOOK.X, CAM_LOOK.Y, CAM_LOOK.Z));
  controls.target.set(CAM_LOOK.X, CAM_LOOK.Y, CAM_LOOK.Z);
  controls.update();

  if (!TESTING) {
    controls.update();
  }

  // Add Axes
  if(AXES) {
    scene.add(axes);
  }
  // Add Lights
  scene.add(ambLight);
  scene.add(pointLight);

  // Console Print
  if(VERBOSE && !TESTING) {
    console.log("Scene Color and Size Set");
    if(DEEP_VERBOSE){
      console.log(scene);
    }
    console.log("Camera Oriented and Positioned");
    if(DEEP_VERBOSE){
      console.log(cam);
    }
    console.log("Lights Added");
    if(DEEP_VERBOSE){
      console.log(ambLight);
      console.log(pointLight);
    }
  }

  /** Only meant for use in JSFiddle **/
  //animate();

  /** Only meant for use in Actual Browser **/
  // Run if WebGL
  // NOT TESTABLE
  if (!TESTING) {
    if (Detector.webgl) {
      animate();
      // Console Print
      if(VERBOSE && !TESTING) {
        console.log("WebGL Detected \n Lights Camera Action!!!");
      }
    }

    // Error if no WebGL
    else {
      // Get Message
      var warning = Detector.getWebGLErrorMessage();

      // Post Message on Screen
      document.getElementById('container').appendChild(warning);
    }
  }
}


/** Build Stage **/
function buildStage(size) {
  // Add Plate to Scene
  SP = 4;
  var count = 0;
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      obj3DArray[SP] = new THREE.Mesh(plateGeom.clone(), lambert.clone());
      obj3DArray[SP].position.z = PLATE_DEPTH;
      obj3DArray[SP].position.x = (PLATE_SIZE + PLATE_GAP) * j;
      obj3DArray[SP].position.y = (PLATE_SIZE + PLATE_GAP) * -i;
      obj3DArray[SP].name = "tile" + (count++);
      scene.add(obj3DArray[SP]);
      SP++;

      /** Andrew Testing
      obj3DArray[SP] = new THREE.Mesh(plateGeom.clone(), lambert.clone());
      obj3DArray[SP].position.set((PLATE_SIZE + PLATE_GAP) * j, (PLATE_SIZE + PLATE_GAP) * -i, PLATE_DEPTH);
      obj3DArray[SP].name = "tile" + (count++);
      //console.log(obj3DArray[SP].name);
      scene.add(obj3DArray[SP]);
      obj3DArray[SP].needsupdate = true;
      SP++;
      **/

    }
  }

  // Console Print
  if(VERBOSE && !TESTING) {
    console.log("Plates Generated and Added to Scene");
    console.log("Stack Pointer: ", SP);
    if(DEEP_VERBOSE){
      console.log(obj3DArray);
      console.log(scene);
    }
  }
}


/** Mouse Event **/
function onMouseMove(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('click', onMouseMove, false);


/** Load Asset **/
/** Depricated
// Handler
function loadHandler(geometry) {
  obj3DArray[SP] = new THREE.Mesh(geometry.clone(), lambert.clone());
  obj3DArray[SP].castShadow = true;
  scene.add(obj3DArray[SP]);
  SP++;

  // Console Print
  if(VERBOSE && !TESTING) {
    console.log("Load Object onto Scene and Added to Array");
    console.log("Stack Pointer: ", SP);
    if(DEEP_VERBOSE){
      console.log(obj3DArray);
      console.log(scene);
    }
  }
}

// Function Needs to be fixed (I am lying to you)
function loadSTL(filename) {
  STL.load(filename, loadHandler);
}
**/
// Handler
function loadHandler0(geometry) {
  obj3DArray[0] = new THREE.Mesh(geometry.clone(), lambert.clone());
  obj3DArray[0].castShadow = true;
  scene.add(obj3DArray[0]);

  // Console Print
  if(VERBOSE && !TESTING) {
    console.log("Load Object onto Scene and Added to Array");
    console.log("Stack Pointer: ", 0);
    if(DEEP_VERBOSE){
      console.log(obj3DArray);
      console.log(scene);
    }
  }
}

// Function Needs to be fixed (I am lying to you)
function loadSTL0(filename) {
  STL.load(filename, loadHandler0);
}

// Handler
function loadHandler1(geometry) {
  obj3DArray[1] = new THREE.Mesh(geometry.clone(), lambert.clone());
  obj3DArray[1].castShadow = true;
  scene.add(obj3DArray[1]);

  // Console Print
  if(VERBOSE && !TESTING) {
    console.log("Load Object onto Scene and Added to Array");
    console.log("Stack Pointer: ", 1);
    if(DEEP_VERBOSE){
      console.log(obj3DArray);
      console.log(scene);
    }
  }
}

// Function Needs to be fixed (I am lying to you)
function loadSTL1(filename) {
  STL.load(filename, loadHandler1);
}

// Handler
function loadHandler2(geometry) {
  obj3DArray[2] = new THREE.Mesh(geometry.clone(), lambert.clone());
  obj3DArray[2].castShadow = true;
  scene.add(obj3DArray[2]);

  // Console Print
  if(VERBOSE && !TESTING) {
    console.log("Load Object onto Scene and Added to Array");
    console.log("Stack Pointer: ", 2);
    if(DEEP_VERBOSE){
      console.log(obj3DArray);
      console.log(scene);
    }
  }
}

// Function Needs to be fixed (I am lying to you)
function loadSTL2(filename) {
  STL.load(filename, loadHandler2);
}

// Handler
function loadHandler3(geometry) {
  obj3DArray[3] = new THREE.Mesh(geometry.clone(), lambert.clone());
  obj3DArray[3].castShadow = true;
  scene.add(obj3DArray[3]);

  // Console Print
  if(VERBOSE && !TESTING) {
    console.log("Load Object onto Scene and Added to Array");
    console.log("Stack Pointer: ", 3);
    if(DEEP_VERBOSE){
      console.log(obj3DArray);
      console.log(scene);
    }
  }
}

// Function Needs to be fixed (I am lying to you)
function loadSTL3(filename) {
  STL.load(filename, loadHandler3);
}

/** Object Manipulators **/
// Translation
function moveRelative(index, x, y, z) {
  obj3DArray[index].position.x += x;
  obj3DArray[index].position.y += y;
  obj3DArray[index].position.z += z;

  // Console Print
  if(VERBOSE && !TESTING) {
    console.log("Relative Motion");
    console.log("Index:", index);
    console.log("X:", x," Y:", y,"Z:", z);
    if(DEEP_VERBOSE){
      console.log(obj3DArray[index]);
    }
  }
}

function moveAbsolute(index, x, y, z) {
  obj3DArray[index].position.x = x;
  obj3DArray[index].position.y = y;
  obj3DArray[index].position.z = z;

  // Console Print
  if(VERBOSE && !TESTING) {
    console.log("Absolute Motion");
    console.log("Index:", index);
    console.log("X:", x," Y:", y,"Z:", z);
    if(DEEP_VERBOSE){
      console.log(obj3DArray[index]);
    }
  }
}

// Rotation
function rotateRelative(index, x, y, z) {
  obj3DArray[index].rotation.x += x * 0.0174533;
  obj3DArray[index].rotation.y += y * 0.0174533;
  obj3DArray[index].rotation.z += z * 0.0174533;

  // Console Print
  if(VERBOSE && !TESTING) {
    console.log("Relative Rotation");
    console.log("Index:", index);
    console.log("X:", x," Y:", y,"Z:", z);
    if(DEEP_VERBOSE){
      console.log(obj3DArray[index]);
    }
  }
}

function rotateAbsolute(index, x, y, z) {
  obj3DArray[index].rotation.x = x * 0.0174533;
  obj3DArray[index].rotation.y = y * 0.0174533;
  obj3DArray[index].rotation.z = z * 0.0174533;

  // Console Print
  if(VERBOSE && !TESTING) {
    console.log("Absolute Rotation");
    console.log("Index:", index);
    console.log("X:", x," Y:", y,"Z:", z);
    if(DEEP_VERBOSE){
      console.log(obj3DArray[index]);
    }
  }
}

// Scaling
function scaleRigid(index, i) {
  obj3DArray[index].scale.x = i;
  obj3DArray[index].scale.y = i;
  obj3DArray[index].scale.z = i;

  // Console Print
  if(VERBOSE && !TESTING) {
    console.log("Scale Rigid");
    console.log("Index:", index);
    console.log("I:", i);
    if(DEEP_VERBOSE){
      console.log(obj3DArray[index]);
    }
  }
}

function scaleLoose(index, x, y, z) {
  obj3DArray[index].scale.x = x;
  obj3DArray[index].scale.y = y;
  obj3DArray[index].scale.z = z;

  // Console Print
  if(VERBOSE && !TESTING) {
    console.log("Scale Loose");
    console.log("Index:", index);
    console.log("X:", x," Y:", y,"Z:", z);
    if(DEEP_VERBOSE){
      console.log(obj3DArray[index]);
    }
  }
}

// Color
function setColorHex(index, hex) {
  obj3DArray[index].material.color.setHex(hex);

  // Console Print
  if(VERBOSE && !TESTING) {
    console.log("Set Color HEX");
    console.log("Index:", index);
    console.log("Hex:", hex);
    if(DEEP_VERBOSE){
      console.log(obj3DArray[index]);
    }
  }
}

function getColorHex(index) {
  return obj3DArray[index].material.color.getHex();
}

function setColorRGB(index, r, g, b) {
  obj3DArray[index].material.color.setRGB(r, g, b);

  // Console Print
  if(VERBOSE && !TESTING) {
    console.log("Set Color RGB");
    console.log("Index:", index);
    console.log("R:", r," G:", g,"B:", b);
    if(DEEP_VERBOSE){
      console.log(obj3DArray[index]);
    }
  }
}

function getColorRGB(index) {
  return obj3DArray[index].material.color;
}

function invisible(index) {
  obj3DArray[index].visible = false;
  obj3DArray[index].needsupdate = true;
}

function visible(index) {
  obj3DArray[index].visible = true;
}

function updateCamera() {
  controls.target.set((220-22)/2, (-220+22)/2, -1);
  cam.position.set(CAM_POS.X, CAM_POS.Y, CAM_POS.Z);
  controls.update();
}

if (TESTING) {
  module.exports = {
    loadHandler,
    moveRelative,
    moveAbsolute,
    rotateRelative,
    rotateAbsolute,
    scaleRigid,
    scaleLoose,
    setColorHex,
    setColorRGB,
    getColorRGB,
    getColorHex,
    buildStage,
    obj3DArray,
    cam,
    initScreen
  };
}
// Smart Scaling (If Time)

// Smart Centering (If Time)
