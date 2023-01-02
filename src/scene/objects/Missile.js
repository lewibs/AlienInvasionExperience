import { Tween } from "@tweenjs/tween.js";
import { Object3D, Vector3 } from "three";
import { meta } from "../meta";
import { Exhaust } from "./Exhaust";
import { loader } from "../three/Loader";
import { applyTexture } from "../../functions/applyTexture";
import { Explosion } from "./Explosion";

export class Missile extends Object3D {
    //parts
    missile;
    exhaust;

    //path
    start;
    end;
    velocity = meta.missile.velocity;

    constructor({
        start,
        end,
        launch = true,
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

        if (launch) {
            this.launch();
        }


        {//make missile
            //load it
            const end = this.localToWorld(this.end.clone());
            this.missile = loader.get(meta.missile.geometry);
            const texture = loader.get(meta.missile.texture);
            applyTexture(this.missile, texture);
            //make bigger
            this.missile.scale.set(meta.missile.scale, meta.missile.scale, meta.missile.scale)
            //align it
            this.missile.rotation.x = 0.958132;
            this.add(this.missile);
        }
    }

    launch() {
        this.exhaust = new Exhaust({
            radius:meta.missile.radius,
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
            that.remove(this.missile);
            that.add(new Explosion({
                onDone: ()=>{
                    that.removeFromParent();
                }
            }));
        }).start();
    }
}