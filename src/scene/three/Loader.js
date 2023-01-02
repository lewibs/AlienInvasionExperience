import { LoadingManager, TextureLoader } from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export const LoadTypes = {
    texture: "texture",
    obj: "obj",
    gltf: "gltf",
    fbx: "fbx",
}

function loadMsg(resource, percent) {
    if (percent >= 100) {
        percent = 100;
    }

    console.log (resource + ": " + percent + "% loaded");
}

export class Loader {
    manager;
    loaders;
    library;

    constructor(
        onLoad=()=>{},
        onProgress=()=>{},
        onError=()=>{},
        onStart=()=>{},
    ) {
        {//managers
            //could have done this in the constructor but that would hide the use of the getters and setters
            this.manager = new LoadingManager();
            this.onLoad = onLoad;
            this.onProgress = onProgress;
            this.onError = onError;
            this.onStart = onStart;
        }

        {//set loaders
            this.loaders = {
                texture: new TextureLoader(this.manager),
                obj: new OBJLoader(this.manager),
                gltf: new GLTFLoader(this.manager),
                fbx: new FBXLoader(this.manager),
            }
        }

        {//set library
            this.library = new Map();
        }
    }

    set onStart(onStart) {
        this.manager.onStart = onStart;
    }

    get onStart() {
        return this.manager.onStart;
    }

    set onLoad(onLoad) {
        this.manager.onLoad = onLoad;
    }

    get onLoad() {
        return this.manager.onLoad;
    }

    set onProgress(onProgress) {
        this.manager.onProgress = onProgress;
    }

    get onProgress() {
        return this.manager.onProgress;
    }

    set onError(onError) {
        this.manager.onError = onError;
    }

    get onError() {
        return this.manager.onError;
    }

    load(type, url, onDone=()=>{}, onUpdate=()=>{}, onError) {
        if (this.library.get(url) === undefined) {
            //this is used for the update callback
            let resource = url.split("/");
            resource = resource[resource.length - 1];

            this.loaders[type].load(
                url,
                (res)=>{
                    this.set(url, res);

                    if (type === LoadTypes.texture) {
                        loadMsg(resource, 100);
                    }

                    onDone(res);
                },
                (xhr)=>{
                    loadMsg(resource, xhr.loaded / xhr.total * 100);
                    onUpdate(xhr);
                },
                (err)=>{
                    if (onError) {
                        onError(err)
                    } else {
                        throw err;
                    }
                },
            )
        }
    }

    set(url, resource) {
        this.library.set(url, resource);
    }

    get(url) {
        const resource = this.library.get(url);

        if (resource) {
            return resource;
        } else {
            throw new Error("failed to fetch " + url + " please make sure that resource is loaded in berfore it is requested");
        }
    }

    delete(url) {
        this.library.delete(url);
    }
}

export const loader = new Loader(); 