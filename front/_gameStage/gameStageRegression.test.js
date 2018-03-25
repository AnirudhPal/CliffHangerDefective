var THREE = require('three');
const gSG = require('./_frontGlobal.js');
const gSM = require('./_frontMain.js');
const gSB = require('./_frontBuilder.js');
/** Global **/

test('Test if Screen Width and Height are correctly obtained.', () =>{
  expect(gSG.screen.width).not.toBe(gSG.screen.height);
});

test('Test if Camera has right Aspect Ratio and not 1.', () =>{
  expect(gSG.cam.aspect).not.toBe(1);
});

test('Test if Camera FOV is resonable', () =>{
  expect(gSG.cam.fov).toBeGreaterThan(30);
  expect(gSG.cam.fov).toBeLessThan(100);
});

test('Test if Camera Far Plane is resonable', () =>{
  expect(gSG.cam.far).toBeGreaterThan(200);
});

test('Test if Camera Near Plane is resonable', () =>{
  expect(gSG.cam.near).toBeLessThan(10);
});

test('Test if Ambient Light has Color that is Not Default', () => {
  expect(gSG.ambLight.color.getHex()).not.toBe(0xFFFFFF);
});

test('Test if Point Light has Color that is Not Default', () => {
  expect(gSG.pointLight.color.getHex()).not.toBe(0xFFFFFF);
});

test('Test if Material has Color that is Not Default', () => {
  expect(gSG.lambert.color.getHex()).not.toBe(0xFFFFFF);
});

test('Test if Geometry Size is resonable Large', () => {
  expect(gSG.plateGeom.parameters.width).toBeGreaterThan(1);
  expect(gSG.plateGeom.parameters.height).toBeGreaterThan(1);
  expect(gSG.plateGeom.parameters.depth).toBeGreaterThan(0.5);
});

test('Test if Geometry Size is resonable Small', () => {
  expect(gSG.plateGeom.parameters.width).toBeLessThan(30);
  expect(gSG.plateGeom.parameters.height).toBeLessThan(30);
  expect(gSG.plateGeom.parameters.depth).toBeLessThan(30);
});

/** Builder **/

/*     builder Initialization      */
test('Test if The 3dArray is defined', () => {
    expect(gSG.obj3DArray).not.toEqual('undefined');
});

test('Test if The Minimum plates have been created', () => {
  gSB.buildStage(5);
  expect(gSG.obj3DArray.length).toBeGreaterThan(16);
});

test('Test if The colors were set according to global declaration of color lambert', () => {
  for (var i = 0; i < 16; i++) {
  expect(gSB.getColorHex(i)).not.toEqual(0xFFFFFF);
  }
});

test('Test Camera is defined across the builder', () => {
  gSB.initScreen();
  expect(gSG.cam).not.toEqual('undefined');
});

test('camera is defined at a reasnoble FOV', () => {
  gSB.initScreen();
  expect(gSB.cam.position.x).toBeGreaterThan(-500);
  expect(gSB.cam.position.y).toBeGreaterThan(-500);
  expect(gSB.cam.position.z).toBeGreaterThan(-500);
  expect(gSB.cam.position.x).toBeLessThan(500);
  expect(gSB.cam.position.y).toBeLessThan(500);
  expect(gSB.cam.position.z).toBeLessThan(500);

});
/*     builder movement      */

test('tests if move Absolute have moved the object given that the new location is not the same as the old one', () => {
  gSB.buildStage(5);
  let oldPos = Object.assign({}, gSB.obj3DArray[1].position);
  expect(oldPos).not.toEqual('undefined');
  gSB.moveAbsolute(1,-5,-5,-5);
  expect(gSB.obj3DArray[1].position).not.toEqual(oldPos);
});
test('tests if move Relative have moved the object given that the new location is not the same as the old one', () => {
  gSB.buildStage(5);
  let oldPos = Object.assign({}, gSB.obj3DArray[1].position);
  expect(oldPos).not.toEqual('undefined');
  gSB.moveRelative(1,5,5,5);
  expect(gSB.obj3DArray[1].position).not.toEqual(oldPos);
});


test('test if Absolute  rotation changes the rotation values of an object', () => {
  gSB.buildStage(5);
  let oldPos = Object.assign({}, gSB.obj3DArray[1].rotation);
  gSB.rotateAbsolute(1,5,5,5);
  expect(gSB.obj3DArray[1].rotation).not.toEqual('undefined');
  expect(oldPos).not.toEqual('undefined');
  expect(gSB.obj3DArray[1].rotation._x).not.toEqual(oldPos._x);
  expect(gSB.obj3DArray[1].rotation._y).not.toEqual(oldPos._y);
  expect(gSB.obj3DArray[1].rotation._z).not.toEqual(oldPos._z);
});


test('test if relative  rotation changes the rotation values of an object', () => {
  gSB.buildStage(5);
  let oldPos = Object.assign({}, gSB.obj3DArray[1].rotation);
  gSB.rotateRelative(1,5,5,5);
  expect(gSB.obj3DArray[1].rotation).not.toEqual('undefined');
  expect(oldPos).not.toEqual('undefined');
  expect(gSB.obj3DArray[1].rotation._x).not.toEqual(oldPos._x);
  expect(gSB.obj3DArray[1].rotation._y).not.toEqual(oldPos._y);
  expect(gSB.obj3DArray[1].rotation._z).not.toEqual(oldPos._z);
});
test('test if values of rigid (xyz) to be equal to each other after a scale change', () => {
  gSB.buildStage(5);
  gSB.scaleRigid(1,2);
  expect(gSB.obj3DArray[1].scale.x).not.toEqual('undefined');
  expect(gSB.obj3DArray[1].scale.x).toEqual(gSB.obj3DArray[1].scale.y);
  expect(gSB.obj3DArray[1].scale.y).toEqual(gSB.obj3DArray[1].scale.z);
});

test('test if value of loose (xyz) have changes after the function call with a change to each of x ,y ,and z', () => {
  gSB.buildStage(5);
  gSB.scaleLoose(1,2,3,4);
  let oldScale = Object.assign({}, gSB.obj3DArray[1].rotation);
  expect(oldScale).not.toEqual('undefined');
  expect(gSB.obj3DArray[1].scale.x).not.toEqual(oldScale.x);
  expect(gSB.obj3DArray[1].scale.y).not.toEqual(oldScale.y);
  expect(gSB.obj3DArray[1].scale.z).not.toEqual(oldScale.z);

});


/*  Builder colors */

test('test is set hex color could change the color of a given object index', () => {
  gSB.buildStage(5);

  let oldCol = Object.assign({}, gSB.obj3DArray[1].material);
  expect(oldCol).not.toEqual('undefined');
  gSB.setColorHex(1,0xFF0000);
  expect(gSB.obj3DArray[1].material.color.getHex()).not.toEqual(oldCol.color);
});

test('test is set rgb color could change the color of a given object index', () => {
  gSB.buildStage(5);

  var oldCol = new THREE.Color();
  oldCol.copy(gSB.obj3DArray[1].material.color);
  gSB.setColorRGB(1,255,255,0);
  expect(oldCol).not.toEqual('undefined');
  expect(gSB.obj3DArray[1].material.color.getHex()).not.toEqual(oldCol.getHex());
});


/** Builder **/
