import { Mesh, Points } from 'three';
import material from './material';
import geometry from './geometry';
class mesh {
  constructor() {
    this.vdGeom = new geometry();
    this.vdMaterial = new material();
  }
  createGlobe(size,textrue) {
    let vdGeom = this.vdGeom.createGlobeGeom(size);
    let vdMaterial = this.vdMaterial.createGlobeMat(textrue);
    return new Mesh(vdGeom, vdMaterial);
  }
  createBallBox(size){
    let vdGeom = this.vdGeom.createBallBoxGeom(size);
    let vdMaterial = this.vdMaterial.createBallBoxMat();
    return new Mesh(vdGeom,vdMaterial);
  }
}
export default mesh;
