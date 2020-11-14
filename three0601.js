//
// 応用プログラミング 課題8 (three0601.js)
// $Id$
//
"use strict"; // 厳格モード

// ライブラリをモジュールとして読み込む
import * as THREE from "./js/three.module.js";
import * as dat from "./js/dat.gui.module.js";
import { GLTFLoader } from "./js/GLTFloader.js";

// ３Ｄページ作成関数の定義
function init() {
  // 制御変数の定義
  const controls = {
    fov: 60, // 視野角
    x: 3,
    y: 4,
    z: 1,
  };

  // シーン作成
  const scene = new THREE.Scene();

  // カメラの作成
  const camera = new THREE.PerspectiveCamera(
    controls.fov, window.innerWidth/window.innerHeight, 0.1, 1000);
  // カメラ設定関数
  function cameraUpdate() {
    camera.fov = controls.fov;
    camera.position.set(controls.x, controls.y, controls.z);
    camera.updateProjectionMatrix();
    camera.lookAt(0, 4, 0);
  }

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x204060);
  renderer.shadowMap.enabled = true;
  document.getElementById("WebGL-output")
    .appendChild(renderer.domElement);

  // 建物群の作成

  // 平面の作成
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100,100),
    new THREE.MeshLambertMaterial({color: 0x404040}));
    plane.rotation.x = -Math.PI/2;
    plane.receiveShadow = true;
  scene.add(plane);

  // 光源の設定
  const light = new THREE.PointLight();
  light.castShadow = true;
  light.position.set(30, 50, 20);
  scene.add(light);

  // GUIコントローラ
  const gui = new dat.GUI();
  gui.add(controls, "fov", 10, 100).onChange(cameraUpdate);
  gui.add(controls, "x", -100, 100).onChange(cameraUpdate);
  gui.add(controls, "y", 0, 100).onChange(cameraUpdate);
  gui.add(controls, "z", -100, 100).onChange(cameraUpdate);

  // 3Dモデル(GLTF形式)の読み込み

  // 自動操縦コースの設定

  // 描画更新関数の定義
  function update(time) {
    renderer.render(scene, camera);
    requestAnimationFrame(update);
  }
  // 描画
  cameraUpdate();
  requestAnimationFrame(update);
}

document.onload = init();
