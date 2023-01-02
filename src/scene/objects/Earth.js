import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { meta } from "../meta";
import { loader } from "../three/Loader";

function earthMaterialMap() {
    return new THREE.MeshPhongMaterial( {
        specular: meta.earth.textures.specular,
        shininess: meta.earth.textures.shininess,
        map: loader.get( meta.earth.textures.map ),
        specularMap: loader.get( meta.earth.textures.normalMap ),
        normalMap: loader.get( meta.earth.textures.normalMap ),
        // y scale is negated to compensate for normal map handedness.
        normalScale: new THREE.Vector2( ...meta.earth.textures.normalScale )
    } );
}

function cloudTexture() {
    return  loader.get( meta.earth.textures.clouds );
}

export class Earth extends THREE.Mesh {
    constructor() {
        const earthGeo = new THREE.SphereGeometry( meta.earth.radius, 100, 50 );
        super(earthGeo, earthMaterialMap());

        {
            const materialClouds = new THREE.MeshLambertMaterial( {
                map: cloudTexture(),
                transparent: true
            } );

            const cloudGeo = new THREE.SphereGeometry( meta.earth.atmosphere.height, 100, 50 );
            const meshClouds = new THREE.Mesh( cloudGeo, materialClouds );
            meshClouds.name = "clouds";
            this.add(meshClouds);
        }

        this.rotation.x = meta.earth.tilt;

        this.rotate();
    }

    rotate(rotation=meta.earth.rotation) {
        const that = this;
        // new TWEEN.Tween({ rotation: 0 })
        // .to({ rotation: 360 }, rotation)
        // .repeat(Infinity)
        // .onUpdate(function ({rotation}) {
        //     that.rotation.y = rotation;
        // })
        // .start();

        const clouds = this.children.find(el=>el.name==="clouds");
        new TWEEN.Tween({rotation: 0})
        .to({rotation: 360}, meta.earth.atmosphere.speed)
        .repeat(Infinity)
        .onUpdate(function ({rotation}) {
            clouds.rotation.y = rotation;
        })
        .start();
    }
}