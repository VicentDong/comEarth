import { Mesh, Points } from 'three';
import material from './material';
import geometry from './geometry';
class mesh {
  constructor() {
    this.vdGeom = new geometry();
    this.vdMaterial = new material();
  }

  createGlobe(size) {
    let vdGeom = this.vdGeom.createGlobeGeom(size);
    let vdMaterial = this.vdMaterial.createGlobeMat();
    return new Points(vdGeom, vdMaterial);
  }
  createGlobeParticles(size, step, img, texture) {
    let vdGeom = this.vdGeom.createGlobeParticlesGeom(size, step, img);
    let vdMaterial = this.vdMaterial.createGlobeParticlesMat(texture);
    return new Points(vdGeom, vdMaterial);
  }
  createBallBox(size) {
    let vdGeom = this.vdGeom.createBallBoxGeom(size);
    let vdMaterial = this.vdMaterial.createBallBoxMat();
    return new Mesh(vdGeom, vdMaterial);
  }
  createShinePoints(geom, shineTexture, count) {
    let vdGeom = this.vdGeom.createShinePointsGeom(geom, count);
    let vdMaterial = this.vdMaterial.createShinePointsMat(shineTexture);
    return new Points(vdGeom, vdMaterial);
  }
}
export default mesh;
