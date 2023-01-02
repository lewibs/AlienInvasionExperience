import { Vector3 } from "three";
import { applyTexture } from "../../../functions/applyTexture";
import { meta } from "../../meta";
import { loader } from "../../three/Loader";
import { Ship } from "./Ship";
import { Weapon } from "./Weapon";

function texture() {
    return loader.get( meta.ships.fighter.textures.diffuse ); //loader.get( meta.ships.fighter.textures.diffuse )
}

function fighterMesh() {
    return loader.get(meta.ships.fighter.geometry);
}

export class Fighter extends Ship {
    weapons = {
        left: {},
        right: {}
    };

    constructor() {
        const ship = fighterMesh();
        applyTexture(ship, texture());
        super({
            ship,
            velocity: meta.ships.fighter.velocity,
        });

        this.weapons.left = new Weapon(meta.weapons.lazers);
        //this.weapons.right = new Weapon(meta.weapons.lazers);
        this.add(this.weapons.left);
        //this.add(this.weapons.right);
    }

    fire(obj) {
        //this.weapons.right.fire(obj)
        this.weapons.left.fire(obj);
    }
} 