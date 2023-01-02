import { Mesh, MeshBasicMaterial, IcosahedronGeometry, PointLight } from "three";
import { meta } from "../meta";

export class Sun extends Mesh {
    constructor() {
        const geometry = new IcosahedronGeometry(meta.sun.radius, 50)
        const material = new MeshBasicMaterial({
            color: meta.sun.color,
        })
        super(geometry, material);

        {//let there be light
            const dirLight = new PointLight( meta.sun.light.color, meta.sun.light.intensity);
            this.add( dirLight );
        }//and behold it was good
    }
}