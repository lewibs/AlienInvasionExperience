import * as THREE from "three";

export function applyTexture(object, texture) {
    object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            child.material.map = texture;
        }
    } );
}