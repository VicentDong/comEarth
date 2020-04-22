import {
  SphereGeometry,
  Geometry,
  Vector3,
  Math,
  ShapeGeometry,
  BoxGeometry,
  PlaneGeometry,
  TextGeometry,
  Matrix4,
  ImageBitmapLoader,
} from 'three';

class vdGeom {
  constructor() {}
  createGlobeGeom(size) {
    let geom = new SphereGeometry(size, 200, 200);
    return geom;
  }
  createBallBoxGeom(size){
    let geom = new SphereGeometry(size,10,10);
    return geom
  }
  createNameMarkerGeom(name, font) {;
    let textGeo = new TextGeometry(name, {
      font: font,
      size: 4,
      height: 0.5,
      curveSegments: 0.1,
      bevelEnabled: false,
    });
    // 文字居中
    textGeo.center();
    return textGeo;
  }
}
export default vdGeom;
