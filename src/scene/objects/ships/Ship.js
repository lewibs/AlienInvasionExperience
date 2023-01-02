import { Easing, Tween } from "@tweenjs/tween.js";
import { Object3D } from "three";
import { meta } from "../../meta";

export class Ship extends Object3D {
    ship;
    velocity;

    constructor({
        ship,
        velocity,
    }) {
        super();
        if (!ship) { 
            throw new Error("Ship must be defined");
        }

        this.ship = ship
        this.velocity = velocity || meta.ships.default.velocity;
        this.add(ship)
    }

    goto(vector) {
        this.lookAt(vector.x, vector.y, vector.z);
        const time = this.position.distanceTo(vector) / this.velocity;
        new Tween(this.position)
        .easing(Easing.Exponential.Out)
        .to(vector, 100000)
        .start();
    }
}