var THREE = require('three');
const gSG = require('./_frontGlobal.js');
const gSM = require('./_frontMain.js');
const gSB = require('./_frontBuilder.js');
/** Global **/

test('Test if Camera is Perspective', () =>{
  expect(gSG.cam.isPerspectiveCamera).toBeTruthy();
});

test('Test if Camera has right Aspect Ratio', () =>{

  expect(gSG.cam.aspect).toBe(gSG.screen.width / gSG.screen.height);
});

test('Test if Camera has right FOV', () =>{
  expect(gSG.cam.fov).toBe(global.CAM_FOV);
});

test('Test if Camera has right Far Plane', () =>{
  expect(gSG.cam.far).toBe(global.CAM_FAR_PLANE);
});

test('Test if Camera has right Near Plane', () =>{
  expect(gSG.cam.near).toBe(global.CAM_NEAR_PLANE);
});

test('Test if Scene is Created', () =>{
  expect(gSG.scene.type).toBe(new THREE.Scene().type);
  expect(gSG.scene.matrix).toEqual(new THREE.Scene().matrix);
});

test('Test if Light is Ambient', () => {
  expect(gSG.ambLight.isAmbientLight).toBeTruthy();
});

test('Test if Light has Color', () => {
  expect(gSG.ambLight.color.getHex()).toBe(global.LIGHT_COLOR);
});

test('Test if Light has Intesity', () => {
  expect(gSG.ambLight.intensity).toBe(global.LIGHT_INTENSITY);
});

test('Test if Light is Point', () => {
  expect(gSG.pointLight.isPointLight).toBeTruthy();
});

test('Test if Light has Color', () => {
  expect(gSG.pointLight.color.getHex()).toBe(global.LIGHT_COLOR);
});

test('Test if Light has Intesity', () => {
  expect(gSG.pointLight.intensity).toBe(global.LIGHT_INTENSITY / 2);
});

test('Test if Material is Lambert', () => {
  expect(gSG.lambert.isMeshPhongMaterial).toBeTruthy();
});

test('Test if Material has Color', () => {
  expect(gSG.lambert.color.getHex()).toBe(global.LAMBERT_COLOR);
});

test('Test if Geometry is Created', () => {
  expect(gSG.plateGeom.parameters.width).toBe(global.PLATE_SIZE);
  expect(gSG.plateGeom.parameters.height).toBe(global.PLATE_SIZE);
  expect(gSG.plateGeom.parameters.depth).toBe(global.PLATE_THICKNESS);
});

// test('Test if Mesh is Created', () => {
//   expect(gSG.plate.isMesh).toBeTruthy();
// });
//
// test('Test if Mesh has Material', () => {
//   expect(gSG.plate.material).toEqual(gSG.lambert);
// });
//
// test('Test if Mesh has Geometry', () => {
//   expect(gSG.plate.geometry).toEqual(gSG.plateGeom);
// });

/** Builder **/

/*     builder Initialization      */
test('Test if The 3dArray is defined', () => {
    expect(gSG.obj3DArray).not.toEqual('undefined');
});

test('Test if The 25 plates have been created', () => {
  gSB.buildStage(5);
  expect(gSG.obj3DArray.length).toEqual(25);
});

test('Test if The colors were set according to global declaration of color lambert', () => {
  for (var i = 0; i < 25; i++) {
  expect(gSB.getColorHex(i)).toEqual(global.LAMBERT_COLOR);
  }
});

test('Test Camera is defined across the builder', () => {
  gSB.initScreen();
  expect(gSG.cam).not.toEqual('undefined');
});

test('camera is defined at the location matching the global (x,y,z) variable declaration', () => {
  gSB.initScreen();
  expect(gSB.cam.position).toEqual({"x": global.CAM_POS.X, "y": global.CAM_POS.Y, "z": global.CAM_POS.Z});
});
/*     builder movement      */

test('check if move absolute locates the object to be moved to the specific location', () => {
  gSB.buildStage(5);
  gSB.moveAbsolute(1,5,5,5);
  expect(gSB.obj3DArray[1].position).toEqual({"x": 5, "y": 5, "z": 5});
});
test('check if move absolute locates the object to be moved to the specific location with negative values', () => {
  gSB.buildStage(5);
  gSB.moveAbsolute(1,-5,-5,-5);
  expect(gSB.obj3DArray[1].position).toEqual({"x": -5, "y": -5, "z": -5});
});
test('check if move relative moves the object to be moved to the specific location with respect to the old location', () => {
  gSB.buildStage(5);
  gSB.moveAbsolute(1,5,5,5);
  gSB.moveRelative(1,5,5,5);
  expect(gSB.obj3DArray[1].position).toEqual({"x": 10, "y": 10, "z": 10});
});

test('check if move relative moves the object to be moved to the specific location with respect to the old location with negative values', () => {
  gSB.buildStage(5);
  gSB.moveAbsolute(1,5,5,5);
  gSB.moveRelative(1,-5,-5,-5);
  expect(gSB.obj3DArray[1].position).toEqual({"x": 0, "y": 0, "z": 0});
});

test('check if move relative moves the object to be moved to the specific location with respect to the old location with negative values', () => {
  gSB.buildStage(5);
  gSB.moveAbsolute(1,5,5,5);
  gSB.moveRelative(1,-5,-5,-5);
  expect(gSB.obj3DArray[1].position).toEqual({"x": 0, "y": 0, "z": 0});
});

test('check if rotate Absolute rotates object according to given values', () => {
  var radian =  0.0174533;
  gSB.buildStage(5);
  gSB.rotateAbsolute(1,5,5,5);

  expect(gSB.obj3DArray[1].rotation._x).toEqual(radian * 5);
  expect(gSB.obj3DArray[1].rotation._y).toEqual(radian * 5);
  expect(gSB.obj3DArray[1].rotation._z).toEqual(radian * 5);
});


test('check if rotate relative rotates object according to given values with respect to the older positions', () => {
  var radian =  0.0174533;
  gSB.buildStage(5);
  gSB.rotateAbsolute(1,0,0,0);
  gSB.rotateRelative(1,5,5,5);

  expect(gSB.obj3DArray[1].rotation._x).toEqual(radian * 5);
  expect(gSB.obj3DArray[1].rotation._y).toEqual(radian * 5);
  expect(gSB.obj3DArray[1].rotation._z).toEqual(radian * 5);
});
test('test if value of rigid (xyz) to be equal after rigid scale', () => {
  gSB.buildStage(5);
  gSB.scaleRigid(1,2);

  expect(gSB.obj3DArray[1].scale.x).toEqual(2);
  expect(gSB.obj3DArray[1].scale.y).toEqual(2);
  expect(gSB.obj3DArray[1].scale.z).toEqual(2);
});

test('test if value of loose (xyz) to be equal after loose scale', () => {
  gSB.buildStage(5);
  gSB.scaleLoose(1,2,3,4);

  expect(gSB.obj3DArray[1].scale.x).toEqual(2);
  expect(gSB.obj3DArray[1].scale.y).toEqual(3);
  expect(gSB.obj3DArray[1].scale.z).toEqual(4);
});


/*  Builder colors */

test('test is set hex color could change the color of a given object index', () => {
  gSB.buildStage(5);
  gSB.setColorHex(1,0xFF0000);

  expect(gSB.obj3DArray[1].material.color.getHex()).toEqual(0xFF0000);
});

test('test is get hex color could return the color of a given object index', () => {
  gSB.buildStage(5);
  gSB.setColorHex(1,0xFF0000);

  expect(gSB.getColorHex(1)).toEqual(0xFF0000);
});

test('test is set rgb color could change the color of a given object index', () => {
  gSB.buildStage(5);
  gSB.setColorRGB(1,255,0,0);
  var color = new THREE.Color( 255, 0, 0 )
  expect(gSB.obj3DArray[1].material.color).toEqual(color);
});

test('test is get rgb color could return the color of a given object index', () => {
  gSB.buildStage(5);
  gSB.setColorRGB(1,255,0,0);
  var color = new THREE.Color( 255, 0, 0 )
  expect(gSB.getColorRGB(1)).toEqual(color);
});

/** Builder **/
