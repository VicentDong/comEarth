import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  AmbientLight,
  Group,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import _ from 'lodash';
import model from './model';
import markers from './markers';
import './images/world.jpg';
import './images/dot.png';
import './images/shine.png';
import './images/fire.png';

// 初始化渲染器
function initRenderer() {
  this.renderer = new WebGLRenderer({ antialias: true });
  this.renderer.setSize(this.contentWidth, this.contentHeight);
  this.options.container.appendChild(this.renderer.domElement);
}

// 初始化照相机
function initCamera() {
  this.camera = new PerspectiveCamera(
    50,
    this.contentWidth / this.contentHeight,
    1,
    2000
  );
  this.camera.up.x = 0;
  this.camera.up.y = 1;
  this.camera.up.z = 0;
  this.camera.position.x = 0;
  this.camera.position.y = 0;
  this.camera.position.z = 1000;
  this.camera.lookAt(0, 0, 0);
}

// 初始化灯光
function initLight() {
  // 自然光
  this.scene.add(new AmbientLight(0xffffff));
}

// 初始化场景
function initScene() {
  this.scene = new Scene();
}

// 实时更新
function animate() {
  //更新控制器
  this.controls.update();
  render.call(this);
  // 地球自转
  this.baseGroup.rotation.y -= 0.002;
  requestAnimationFrame(animate.bind(this));
}

// 渲染
function render() {
  this.renderer.render(this.scene, this.camera);
}

// 盘旋控制器
function initControls() {
  this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  // 使动画循环使用时阻尼或自转 意思是否有惯性
  this.controls.enableDamping = true;
  //是否可以缩放
  this.controls.enableZoom = true;
  //是否自动旋转
  this.controls.autoRotate = false;
  //是否允许旋转
  this.controls.enableRotate = true;
  //设置相机距离原点的最近距离
  this.controls.minDistance = 20;
  //设置相机距离原点的最远距离
  this.controls.maxDistance = 1000;
  //是否开启右键拖拽
  this.controls.enablePan = false;
}

// 创建对象
function initObj() {
  let self = this;
  // 创建地球模型组
  this.baseGroup = new Group();
  // 球体
  let globelParticles = new model().createGlobeParticles(
    200, // 半径
    250, // 分割数
    this.earthImg,
    this.dotTexture
  );
  this.baseGroup.add(globelParticles);

  // 外球体
  let ballBox = new model().createBallBox(250);
  this.baseGroup.add(ballBox);

  // 外球亮点
  let shinePoints = new model().createShinePoints(
    ballBox.geometry,
    this.shineTexture,
    30
  );
  this.baseGroup.add(shinePoints);

  // 标注组
  this.markerGroup = new Group();
  // 标注
  let myMarkers = new markers();

  myMarkers.addImgMarkers(
    self.markerGroup,
    self.markerTextrue,
    self.options.markerData,
    // 标注大小
    10,
    // 标注半径
    200
  );

  this.baseGroup.add(this.markerGroup);
  this.scene.add(this.baseGroup);
}

function computeImgData(ele) {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = ele.width;
  canvas.height = ele.height;
  ctx.drawImage(ele, 0, 0, ele.width, ele.height);
  // 图片高度
  this.earthImg = ctx.getImageData(0, 0, ele.width, ele.height);
}
class ComEarth {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.textrue = null;
    this.font = null;
    this.light = null;
    this.controls = null;
    this.contentWidth = 0;
    this.contentHeight = 0;
    this.positions = [];
    this.sizes = [];
    this.earthImgPath = './images/world.jpg';
    this.dotTexture = new TextureLoader().load('./images/dot.png');
    this.shineTexture = new TextureLoader().load('./images/shine.png');
    this.markerTextrue = new TextureLoader().load('./images/fire.png');
    this.options = {
      container: document.querySelector('#vdEarth'),
      markerData: [],
    };
  }
  init(opt = {}) {
    _.merge(this.options, opt);

    var self = this;
    // 内容高度
    this.contentWidth = this.options.container.offsetWidth;
    this.contentHeight = this.options.container.offsetHeight;

    var earthSrcImgEle = document.createElement('img');
    earthSrcImgEle.src = this.earthImgPath;
    earthSrcImgEle.onload = () => {
      computeImgData.call(self, earthSrcImgEle);
      initRenderer.call(self);
      initScene.call(self);
      initCamera.call(self);
      initLight.call(self);
      initControls.call(self);
      initObj.call(self);
      animate.call(self);
    };
  }
}

export default ComEarth;
