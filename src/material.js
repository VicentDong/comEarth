import {
  MeshBasicMaterial,
  PointsMaterial,
  FrontSide,
  DoubleSide,
  AdditiveBlending,
} from 'three';
class material {
  constructor() {}
  createGlobeMat() {
    let mat = new MeshBasicMaterial({
      color: 0x8e8e8e,
    });
    return mat;
  }
  createGlobeParticlesMat(texture) {
    let mat = new PointsMaterial({
      size: 5,
      color: 0x208be6,
      map: texture,
      depthWrite: false,
      transparent: true,
      opacity: 1,
      side: FrontSide,
      blending: AdditiveBlending,
    });
    return mat;
  }
  createBallBoxMat() {
    let mat = new MeshBasicMaterial({
      wireframe: true,
      transparent: true,
      depthTest: false,
      color: 0x268de4,
      opacity: 0.3,
    });
    return mat;
  }
  createNameMarkerMat() {
    var nameMarkerMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
    });
    return nameMarkerMaterial;
  }
  createShinePointsMat(texture) {
    var material = new PointsMaterial({
      color: 0x268de4,
      size: 40,
      map: texture,
      depthWrite: false,
      transparent: true,
      opacity: 1,
      side: FrontSide,
      blending: AdditiveBlending,
    });
    return material;
  }
  createImgMarkerMat(texture) {
    var material = new MeshBasicMaterial({
      map: texture,
      side: DoubleSide,
    });
    return material;
  }
}

export default material;
