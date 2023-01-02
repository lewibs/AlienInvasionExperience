import { Earth } from "../objects/Earth";
import { Stars } from "../objects/Stars";
import { Sun } from "../objects/Sun";
import { Viewer } from "./Viewer";
import { meta } from "../meta";
import { loader, LoadTypes } from "./Loader";
import { Missile } from "../objects/Missile";
import { Color, Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from "three";
import { EU } from "../meta";
import { Lazer } from "../objects/Lazer";
import { Moon } from "../objects/Moon";
import { Fighter } from "../objects/ships/Fighter";
import { findAllInRenderedTree } from "react-dom/test-utils";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Weapon } from "../objects/ships/Weapon";

export class Manager {
    viewer;
    loader = loader;
    alien;
    earth;
    moon;
    sun;
    
    constructor({
        canvas
    }) {
        this.viewer = new Viewer({canvas});
        window.viewer = this.viewer;

        const that = this;

        this.loader.onLoad = ()=>{
            that.decorateScene();
        }

        this.loadResources();
    }

    async loadResources() {
        this.loader.load(LoadTypes.texture, meta.earth.textures.map);
        this.loader.load(LoadTypes.texture, meta.earth.textures.normalMap);
        this.loader.load(LoadTypes.texture, meta.earth.textures.specularMap);
        this.loader.load(LoadTypes.texture, meta.earth.textures.clouds);
        
        this.loader.load(LoadTypes.texture, meta.missile.texture);
        this.loader.load(LoadTypes.obj, meta.missile.geometry);

        this.loader.load(LoadTypes.obj, meta.ships.fighter.geometry);
        this.loader.load(LoadTypes.texture, meta.ships.fighter.textures.light);
        this.loader.load(LoadTypes.texture, meta.ships.fighter.textures.map);
        this.loader.load(LoadTypes.texture, meta.ships.fighter.textures.diffuse);  
    }

    async decorateScene() {
        {//earth
            this.earth = new Earth();
            this.earth.rotation.y = Math.PI;
            this.viewer.scene.add(this.earth);
        }

        { //stars
            this.stars = new Stars();
            this.viewer.scene.add(this.stars);
        }

        {//sun
            this.sun = new Sun();
            this.sun.position.set(meta.sun.position.x, meta.sun.position.y, meta.sun.position.z);
            this.viewer.scene.add(this.sun);
        }

        { //alien
            this.alien = new Fighter();
            this.alien.position.set(meta.ships.fighter.start.x, meta.ships.fighter.start.y, meta.ships.fighter.start.z)
            this.viewer.scene.add(this.alien);
            this.alien.goto(meta.ships.fighter.end);
            this.alien.fire(this.earth);
        }

        {
            const start = new Vector3(
                meta.ships.rocket.start.x,
                meta.ships.rocket.start.y,
                meta.ships.rocket.start.z,
            );
            const end = new Vector3(
                meta.ships.rocket.end.x,
                meta.ships.rocket.end.y,
                meta.ships.rocket.end.z,
            );
            this.viewer.scene.add(new Missile({
                start: start,
                end: end,
            }));
        }
    }
}