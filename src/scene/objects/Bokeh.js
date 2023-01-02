import * as THREE from "three";
import { meta } from "../meta";
import * as TWEEN from "@tweenjs/tween.js";
import { randInt } from "three/src/math/MathUtils";

export class Bokeh extends THREE.Mesh {
    colors;

    constructor({
        burn = meta.bokeh.burn,
        fade = meta.bokeh.fade,
        radius = meta.bokeh.radius,
        colors = meta.bokeh.colors,
    }) {
        const geometry = new THREE.SphereGeometry(radius, 100, 50);
        const material = new THREE.MeshBasicMaterial({transparent: true});
        super(geometry, material);

        this.colors = colors;

        this.burn(burn);
        this.fade(fade);
    }

    burn(time) {
        let current = 0;
        const that = this;
        return new TWEEN.Tween({ color: randInt(0, 2) })
        .to({ color: that.colors.length }, time)
        .onUpdate(function ({color}) {
            color = that.colors[Math.floor(color)];
            if (color !== current) {
                current = color;
                if (color) {
                    that.material.color.setHex(color);
                }
            }
        })
        .start()
    }
    
    fade(time) {
        const that = this;
        return new TWEEN.Tween({opacity: that.material.opacity})
        .to({ opacity: 0 }, time)
        .onUpdate(function ({opacity}) {
            that.material.opacity = opacity;
        })
        .onComplete(()=>{
            that.parent.remove(that);
        })
        .start()
    }
}