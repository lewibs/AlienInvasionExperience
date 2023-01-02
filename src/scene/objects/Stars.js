import { Object3D } from "three";
import * as THREE from "three";
import { EU, meta } from "../meta";

export class Stars extends Object3D {
    constructor() {
        super();
        for(let i = 0; i < meta.stars.density; i++) {
            this.addStars();
        }
    }

    //I dont care to understand this but this class could absolutely be made better
    addStars() {
        const r = EU, starsGeometry = [ new THREE.BufferGeometry(), new THREE.BufferGeometry() ];

        const vertices1 = [];
        const vertices2 = [];

        const vertex = new THREE.Vector3();

        for ( let i = 0; i < 250; i ++ ) {

            vertex.x = Math.random() * 2 - 1;
            vertex.y = Math.random() * 2 - 1;
            vertex.z = Math.random() * 2 - 1;
            vertex.multiplyScalar( r );

            vertices1.push( vertex.x, vertex.y, vertex.z );

        }

        for ( let i = 0; i < 1500; i ++ ) {

            vertex.x = Math.random() * 2 - 1;
            vertex.y = Math.random() * 2 - 1;
            vertex.z = Math.random() * 2 - 1;
            vertex.multiplyScalar( r );

            vertices2.push( vertex.x, vertex.y, vertex.z );

        }

        starsGeometry[ 0 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices1, 3 ) );
        starsGeometry[ 1 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices2, 3 ) );

        const starsMaterials = [
            new THREE.PointsMaterial( { color: 0x555555, size: 2, sizeAttenuation: false } ),
            new THREE.PointsMaterial( { color: 0x555555, size: 1, sizeAttenuation: false } ),
            new THREE.PointsMaterial( { color: 0x333333, size: 2, sizeAttenuation: false } ),
            new THREE.PointsMaterial( { color: 0x3a3a3a, size: 1, sizeAttenuation: false } ),
            new THREE.PointsMaterial( { color: 0x1a1a1a, size: 2, sizeAttenuation: false } ),
            new THREE.PointsMaterial( { color: 0x1a1a1a, size: 1, sizeAttenuation: false } )
        ];

        for ( let i = 10; i < 30; i ++ ) {

            const stars = new THREE.Points( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );

            stars.rotation.x = Math.random() * 6;
            stars.rotation.y = Math.random() * 6;
            stars.rotation.z = Math.random() * 6;
            stars.scale.setScalar( i * 10 );

            stars.matrixAutoUpdate = false;
            stars.updateMatrix();

            this.add( stars );

        }

    }

}