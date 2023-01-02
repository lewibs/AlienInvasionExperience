import { Tween } from "@tweenjs/tween.js";
import { Object3D } from "three";
import { meta } from "../meta";
import { Exhaust } from "./Exhaust";
import { Explosion } from "./Explosion";

export class Lazer extends Object3D {
    //parts
    exhaust;

    //path
    start;
    end;
    velocity = meta.lazer.velocity;

    constructor({
        start,
        end,
        fire = true,
        velocity,
    }) {
        super()

        if (!start && start.isVector3) {
            throw new Error("Must have start");
        }   else {
            this.start = start;
        }

        if (!end && end.isVector3) {
            throw new Error("Must have end");
        } else {
            this.end = end;
        }

        if (velocity) {
            this.velocity = velocity;
        }

        if (fire) {
            this.fire();
        }

    }

    fire() {
        this.exhaust = new Exhaust({
            bokeh: meta.lazer.bokeh,
            radius: meta.lazer.radius,
            density: meta.lazer.density,
            target: this.parent,
        });
        this.add(this.exhaust);

        const dist = Math.abs((this.start.distanceTo(this.end)));
        const timeTo = dist / this.velocity;

        const that = this;
        new Tween(this.start)
        .to(this.end, timeTo)
        .onUpdate((location)=>{
            that.position.x = location.x;
            that.position.y = location.y;
            that.position.z = location.z;
        }).onComplete(()=>{
            that.exhaust.stop();
            that.remove(this.exhaust);
            that.exhaust = undefined;
            that.add(new Explosion({
                onDone: ()=>{
                    that.removeFromParent();
                }
            }));
        }).start();
    }
}