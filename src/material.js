import {
  MeshStandardMaterial,
  PointsMaterial,
  MeshPhongMaterial,
  DoubleSide,
  MeshBasicMaterial,
} from 'three';
class material {
  constructor() {}
  createGlobeMat(texture) {
    let mat = new MeshStandardMaterial({
      map: texture,
    });
    return mat;
  }
  createBallBoxMat(){
    let mat = new MeshBasicMaterial({
      wireframe:true,
      transparent:true,
      color:0x356dea
    });
    return mat;
  }
  createNameMarkerMat() {
    var nameMarkerMaterial = new MeshBasicMaterial({
      color: '#fff',
      transparent: true, 
    });
    return nameMarkerMaterial;
  }
}

export default material;
