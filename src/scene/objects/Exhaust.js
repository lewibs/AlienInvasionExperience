import * as THREE from "three";
import { meta } from "../meta";
import * as TWEEN from "@tweenjs/tween.js";
import { randFloatSpread } from "three/src/math/MathUtils";
import { Vector3 } from "three";
import { Bokeh } from "./Bokeh";

export class Exhaust extends THREE.Object3D {
    radius;
    //the ticker
    itterator;
    //the ammount of bokeh to add per tick
    density = meta.exhaust.density;
    //the scene or object which the exaust should be added too. Usually the parent of the object using this.
    target;

    bokeh = meta.exhaust.bokeh;

    constructor({radius, density, target, bokeh}) {
        super();

        if (!radius) {
            throw new Error("Exhaust must have radius");
        } else {
            this.radius = radius;
        }

        if (density) {
            this.density = density;
        }

        if (target) {
            this.target = target;
        }

        if (bokeh) {
            this.bokeh = bokeh;
        }
        
        this.start();
    }

    getTarget() {
        if (this.target) {
            return this.target;
        }

        return this.parent;
    }

    start() {
        //does this with tween rather then set interval to avoid race issues and also makes density make more sense
        const that = this;
        if (!this.itterator) {
            this.itterator = new TWEEN.Tween({x:0})
            .to({x:1})
            .repeat(Infinity)
            .onUpdate(()=>{
                for (let i = 0; i < this.density; i++ ) {
                    that.addExhaust();
                }
            })
            .start();
        }
    }

    stop() {
        this.itterator.stop();
        this.itterator = undefined;
    }

    addExhaust() {
        const bokeh = new Bokeh(this.bokeh);
        const vec = new Vector3(0,0,0);

        do {
            vec.x = randFloatSpread(2 * this.radius);
            vec.y = randFloatSpread(2 * this.radius);
            vec.z = randFloatSpread(2 * this.radius);
        } while (vec.length() >= this.radius);

        bokeh.position.set(
            vec.x + this.getTarget().position.x,
            vec.y + this.getTarget().position.y,
            vec.z + this.getTarget().position.z
        );

        this.getTarget().parent.add(bokeh);
    }
}