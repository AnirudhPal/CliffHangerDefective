/**
* Description: TODO
**/


/** Animation Sequence **/
// Simple
// NOT TESTABLE
if (!TESTING) {
  function animate() {
    // Efficient FPS Call
    requestAnimationFrame(animate);

    // Put Ray
    // ray.setFromCamera( mouse, cam );

    // Get Intersection
    var intersects = ray.intersectObjects(scene.children);

    // Set Intersection
    // if(intersects.length >= 1)
      // intersects[0].object.material.color.set( 0xff0000 );

    // Update based on Orbital Controls
    controls.update();
    pointLight.position.copy(cam.position);

    // Render Scene
    draw.render(scene, cam);
  }
}
