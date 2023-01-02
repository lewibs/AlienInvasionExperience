import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { meta } from "../meta";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class Viewer {
    //three
    scene;
    camera;
    canvas;
    renderer;
    controls;

    //play
    drawing = false;

    constructor({
        canvas, //required
        scene,
        camera,
        renderer,
        controls,
    }) {
        if (!canvas) {
            throw new Error("need canvas");
        } else {
            this.canvas = canvas;
        }

        this.init({
            camera,
            scene,
            renderer,
            controls,
        });

        this.animate();
    }

    animate() {
        this.drawing = true

        const animateHelper = (t) => {
            if (this.drawing) {
                TWEEN.update(t);
                requestAnimationFrame( animateHelper );
                this.renderer.render( this.scene, this.camera );
            }
        }
        requestAnimationFrame( animateHelper );
    }

    freeze() {
        this.drawing = false;
    }

    init({
        camera,
        scene,
        renderer,
        //controls,
    }) {
        this.initScene(scene);
        this.initCamera(camera);
        this.initRenderer(renderer);
        //this.initControls(controls);
    }

    initControls(controls) {
        this.controls = controls || new OrbitControls( this.camera, this.canvas );
    }

    initCamera(camera) {
        if (camera) {
            this.camera = camera;
        } else {
            this.camera = new THREE.PerspectiveCamera( meta.camera.fov, this.canvas.width / this.canvas.height, meta.camera.near, meta.camera.far );
            this.camera.position.set(meta.camera.position.x, meta.camera.position.y, meta.camera.position.z);
            this.camera.lookAt(meta.camera.lookAt.x, meta.camera.lookAt.y, meta.camera.lookAt.z);
        }
    }

    initScene(scene) {
        this.scene = scene || new THREE.Scene(); 
        this.scene.background = meta.scene.background
        this.initLighting();
        this.scene.fog = new THREE.FogExp2( 0x000000, 0.00000025 );
    }

    initLighting() {
        this.scene.add(new THREE.AmbientLight( meta.scene.light.color, meta.scene.light.intensity ));
    }

    initRenderer(renderer) {
        this.renderer = renderer || new THREE.WebGLRenderer({canvas:this.canvas});
        this.renderer.setSize(this.canvas.width, this.canvas.height);
    }
}