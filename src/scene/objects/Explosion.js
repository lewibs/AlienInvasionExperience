import { Easing, Tween } from "@tweenjs/tween.js";
import { Object3D, Vector3 } from "three";
import { randFloatSpread } from "three/src/math/MathUtils";
import { meta } from "../meta";
import { Bokeh } from "./Bokeh";

export class Explosion extends Object3D {
    radius;
    density;
    time;
    onDone;

    constructor(props={
        radius:meta.explosion.radius,
        density:meta.explosion.density,
        time: meta.explosion.time,
        onDone: ()=>{},
    }) {
        super();
        this.radius = props.radius || meta.explosion.radius;
        this.density = props.density || meta.explosion.density;
        this.time = props.time || meta.explosion.time;
        this.onDone = props.onDone || function(){};

        this.boom();
    }

    boom() {
        const that = this;
        new Tween({radius: 0})
        .to({radius: this.radius}, that.time)
        .onUpdate(({radius})=>{
            for (let i = 0; i < that.density; i++) {
                that.addExhaust(radius);
            }
        })
        .easing(Easing.Cubic.Out)
        .start()
        .onComplete(()=>{
            setTimeout(()=>{
                that.removeFromParent();
                that.onDone(this);
            }, meta.explosion.bokeh.fade);
        })
    }

    addExhaust(radius) {
        const bokeh = new Bokeh(meta.explosion.bokeh);
        const vec = new Vector3(0,0,0);

        do {
            vec.x = randFloatSpread(2 * radius);
            vec.y = randFloatSpread(2 * radius);
            vec.z = randFloatSpread(2 * radius);
        } while (vec.length() >= radius);

        bokeh.position.set(
            vec.x + this.position.x,
            vec.y + this.position.y,
            vec.z + this.position.z
        );

        this.add(bokeh);
    }
}