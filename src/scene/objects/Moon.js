import { Mesh, MeshPhongMaterial, SphereGeometry } from "three"
import { meta } from "../meta";
import { loader } from "../three/Loader";

export class Moon extends Mesh {
    constructor() {
        const geo = new SphereGeometry(meta.moon.radius, 100, 50);
        const tex = new MeshPhongMaterial( {
            map: loader.get(meta.moon.texture),
        } );
        super(geo, tex);
    }
}