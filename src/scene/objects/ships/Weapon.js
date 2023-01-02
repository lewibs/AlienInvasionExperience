import { Tween } from "@tweenjs/tween.js";
import { Object3D, Vector3 } from "three";
import { randFloat, randFloatSpread } from "three/src/math/MathUtils";

export class Weapon extends Object3D {
    projectile;
    burst;
    target;

    animation;

    constructor({
        projectile,
        accuracy,
        rateOfFire,
    }) {
        if (!projectile) throw new Error("must include projectile");
        if (!accuracy) throw new Error("must include accuracy");
        if (!rateOfFire) throw new Error("must include rate of fire");
        super();

        if (accuracy > 1) {
            accuracy = accuracy / 100;
        }

        this.projectile = projectile;
        this.animation = new Tween({x:0})
        .to({x:1}, rateOfFire)
        .onRepeat(()=>{
            let vector = this.target.position.clone();
            vector = this.worldToLocal(vector);
            this.add(new this.projectile({
                start: this.position.clone(),
                end: new Vector3(vector.x,vector.y,vector.z),
            }));
        })
        .repeat(Infinity);
    }

    fire(obj) {
        this.target = obj;
        this.animation.start();
    }

    stop() {
        this.animation.stop();
    }
}