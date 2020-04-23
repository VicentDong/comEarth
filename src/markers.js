import { Shape, Mesh, Math, Vector3, CanvasTexture } from 'three';
import geometry from './geometry';
import material from './material';
import { getPosition, minSize } from './utils';
import _ from 'lodash';

class marker {
  constructor() {
    this.vdGeom = new geometry();
    this.vdMaterial = new material();
  }

  addImgMarkers(group, texture, items, size, radius) {
    let markerGeom = this.vdGeom.createImgMarkerGeom(size);
    let markerMat = this.vdMaterial.createImgMarkerMat(texture);

    for (let i = 0; i < items.length; i++) {
      let imgMarker = new Mesh(markerGeom, markerMat);
      // 定位
      let position = getPosition(items[i].lng, items[i].lat, radius);
      imgMarker.position.set(position.x, position.y, position.z);

      // 标记垂直于圆心
      imgMarker.lookAt(new Vector3(0, 0, 0));
      group.add(imgMarker);
    }
  }
  addNameMarkers(group, radius, items, font) {
    for (let i = 0; i < items.length; i++) {
      let nameMarker = _.find(group.children, (model) => {
        return (
          model.userData.type == 'name' && model.userData.name == items[i].name
        );
      });
      if (!nameMarker) {
        let geometry = this.vdGeom.createNameMarkerGeom(
          items[i].name + ':' + items[i].total,
          font
        );
        let material = this.vdMaterial.createNameMarkerMat();
        nameMarker = new Mesh(geometry, material);
        // 定位
        let position = getPosition(
          parseFloat(items[i].lng),
          parseFloat(items[i].lat),
          radius + window.Math.log2(items[i].total) * 5
        );
        nameMarker.position.set(position.x, position.y, position.z);
        // 标记垂直于圆心
        nameMarker.lookAt(
          new Vector3(position.x * 1.1, position.y * 1.1, position.z * 1.1)
        );
        group.add(nameMarker);
      }
      nameMarker.visible = false;
      nameMarker.userData = Object.assign({ type: 'name' }, items[i]);
    }
  }
}
export default marker;
