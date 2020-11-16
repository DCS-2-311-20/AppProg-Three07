//
// 応用プログラミング 課題10 (three0701.js)
// $Id$
//
"use strict"; // 厳格モード

// ライブラリをモジュールとして読み込む
import * as THREE from "./js/three.module.js";
import * as dat from "./js/dat.gui.module.js";

// ３Ｄページ作成関数の定義
function init() {
  // 制御変数の定義
  const controls = {
    VirticalCamera: true,
  };
  const lifeMark = "🟢";

  // シーン作成
  const scene = new THREE.Scene();

  // カメラの作成
  // 垂直カメラ
  const verticalCamera = new THREE.PerspectiveCamera(
    60, window.innerWidth/window.innerHeight, 0.1, 1000);
  {
    verticalCamera.position.set(0, 22, 11);
    verticalCamera.lookAt(0, 0, 0);
  }
  // 水平カメラ
  const horizontalCamera = new THREE.PerspectiveCamera(
    50, window.innerWidth/window.innerHeight, 0.1, 1000);
  {
    horizontalCamera.position.set(0, 8.5, 20);
    horizontalCamera.lookAt(0, 0, 0);
  }
  // 垂直カメラを初期値とする
  let camera = verticalCamera;

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x204060);
    document.getElementById("WebGL-output").appendChild(renderer.domElement);
  }

  // 光源の設定
  { // 環境ライト
    const light = new THREE.AmbientLight();
    light.intensity = 0.3;
    light.position.set(0, 0, 0);
    scene.add(light);
  }
  { // ポイントライト
    const light = new THREE.PointLight();
    light.position.set(6, 10, 13);
    scene.add(light);
  }

  // GUIコントローラ
  const gui = new dat.GUI();
  {
    gui.add(controls, "VirticalCamera").onChange((vh) => {
      camera = (vh)?verticalCamera:horizontalCamera;});
  }

  // 3D物体
  // 枠
  {
    // 上の枠
    const top = new THREE.Mesh(
      new THREE.BoxGeometry(13, 2, 1),
      new THREE.MeshPhongMaterial({color: 0x333333})
    );
    top.position.z = -10.75;
    scene.add(top);
    // 下の枠
    const bottom = top.clone();
    bottom.position.z = 10.75;
    scene.add(bottom);
    // 左の枠

    // 右の枠

  }

  // ブロック
  const bricks = new THREE.Group();
  let nblick = 0;
  // ブロックの生成
  {
    const color = ["white", "red", "yellow", "blue", "purple", "green" ];
    const param = {w:1.2, h:0.8, d:0.4, nRow:6, nCol:9, gapX:0.1, gapZ:0.3};
    for ( let r = 0; r < param.nRow; r += 1 ) {
      for ( let c = 0; c < param.nCol; c += 1 ) {
        const brick = new THREE.Mesh(
        );
        brick.position.set(
          (param.w+param.gapX)*(c-(param.nCol-1)/2),
          0, -(param.d+param.gapZ)*r);
        bricks.add(brick);
        nblick++;
      }
    }
    bricks.position.z = -3.5;
  }
  // ブロックの再表示
  function resetBlick() {
  }

  // ボール
  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 24, 24),
    new THREE.MeshPhongMaterial({color: 0x808080, specular: 0xa0a0a0})
  );
  {
    scene.add(ball);
  }
  // ボールの死活

  // パドル
  const paddle = new THREE.Group();
  {
    // パドル中央
    const center = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.25, 1, 16),
      new THREE.MeshPhongMaterial({color: 0x333333, specular: 0x808080})
    )
    center.rotation.z = Math.PI/2;
    paddle.add(center);
    // パドル左端
    const left = new THREE.Mesh(
    )
    // パドル右端
    const right = left.clone();
    paddle.add(right);
  }
  // パドル操作

  // スコアボードの作成


  // スコアボードの更新
  function updateScore() {
  }

  // ゲームオーバー
  // 3D文字列の生成

  // ゲームオーバー表示
  function gameOver() {
  }

  // ゲームの再開
  function restartGame() {
  }

  // 枠の衝突検出
  function borderCheck() {
  }

  // パドルの衝突検出
  function paddleCheck(sphere, delta) {
  }

  // ブロックの衝突検出
  function blickCheck(sphere) {
  }

  // 描画更新
  const clock = new THREE.Clock();
  function update(time) {
    const delta = clock.getDelta();
    renderer.render(scene, camera);
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

document.onload = init();
