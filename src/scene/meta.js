import { Lazer } from "./objects/Lazer";
import { Missile } from "./objects/Missile";

export const EU = 10000;

export const meta = {
    src: "https://github.com/lewibs/AlienInvasionExperience",
    camera:{
        fov: 25,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 1e7,
        aspect: undefined,
        position: {
            x: 20284.781004243814, 
            y: 5087.517581153366, 
            z: 17724.293967561516
        },
        lookAt: {
            x: 10000,
            y: 5000,
            z: 12000,
        }
    },
    scene: {
        background: 0x888888,
        light: {
            color: 0x404040,
            intensity: 1,
        }
    },
    earth: {
        radius: EU,
        rotation: 90000000,
        tilt: 0,
        atmosphere: {
            height: EU + 200,
            speed: 90000000,
        },
        textures: {
            specular: 0x333333,
            shininess: 15,
            map: 'https://raw.githubusercontent.com/lewibs/lewibs.com/develop/data/3d/planets/earth/Earth_Diffuse.jpg',
            specularMap: 'https://raw.githubusercontent.com/lewibs/lewibs.com/develop/data/3d/planets/earth/earth_specular_2048.jpg',
            normalMap: 'https://raw.githubusercontent.com/lewibs/lewibs.com/develop/data/3d/planets/earth/earth_normal_2048.jpg',
            normalScale: [0.85, -0.85],
            clouds: 'https://raw.githubusercontent.com/lewibs/lewibs.com/develop/data/3d/planets/earth/earth_clouds_2048.png',
        },
        launchZones: [
            {x: 2394.5361395680757, y: 5224.882055007095, z: 7971.476126865361},
            {x: 3665.9221963463324, y: 5960.2516617185165, z: 6900.292894720776},
            {x: 4606.580511169704, y: 2875.247436002494, z: 8190.8482850977925},
            {x: 3502.453356874691, y: 3277.867070322164, z: 8577.064498173702},
        ]
    },
    stars: {
        density: 1,
    },
    sun: {
        radius: EU * 10,
        color: 0xfdb813,
        light: {
            color: 0xaaaaaa,
            intensity: 1,
        },
        position: {
            x: EU * 100,
            y: EU * 10,
            z: EU * 110,
        }
    },
    exhaust: {
        density: 1,
        bokeh:{
            fade: 3000,
            colors: [0xB22222, 0xFF7A00, 0xFFF347, 0xFDFFA5, 0x939393, 0xc4c4c4],
        }
    },
    explosion: {
        radius: 200,
        density: 6,
        time: 200,
        bokeh: {
            burn: 200,
            fade: 3000,
            colors: [0xB22222, 0xFF7A00, 0xFFF347, 0xFDFFA5, 0x939393, 0x111111],
        }
    },
    missile: {
        scale: 10,
        radius: 10,
        velocity: 1,
        texture: "https://raw.githubusercontent.com/lewibs/lewibs.com/develop/data/3d/missile/AIM120-t.png",
        geometry: "https://raw.githubusercontent.com/lewibs/lewibs.com/develop/data/3d/missile/Files/AIM120D.obj",
    },
    lazer: {
        radius: 1,
        velocity: 3,
        density: 1,
        bokeh: {
            radius: 40,
            burn: 1000,
            fade: 1000,
            colors: [0xB22222, 0xE30022, 0x9F1D35],
        }
    },
    bokeh: {
        burn: 1000,
        fade: 1000,
        radius: 10,
        colors: [0xfe9ee3, 0x407255, 0xba726e, 0xf3df08, 0x13eceb, 0xbe46b8, 0xbe46b8, 0xb62304, 0x24f2f9],
    },
    weapons: {
        missiles: {
            projectile: Missile,
            accuracy: 1,
            rateOfFire: 5000,
        },
        lazers: {
            projectile: Lazer,
            accuracy: 1,
            rateOfFire: 2000,
        }
    },
    ships: {
        default: {
            velocity: 10,
        },
        fighter: {
            velocity: 1,
            geometry: "https://raw.githubusercontent.com/lewibs/lewibs.com/develop/data/3d/ships/Free_SciFi-Fighter/SciFi_Fighter_AK5.obj",
            textures: {
                specular: 0x333333,
                shininess: 15,
                normalScale: [0.85, -0.85],
                light: "https://raw.githubusercontent.com/lewibs/lewibs.com/develop/data/3d/ships/Free_SciFi-Fighter/SciFi_Fighter_AK5-Lights.jpg",
                map: "https://raw.githubusercontent.com/lewibs/lewibs.com/develop/data/3d/ships/Free_SciFi-Fighter/SciFi_Fighter_AK5-Normal_Map.jpg",
                diffuse: "https://raw.githubusercontent.com/lewibs/lewibs.com/develop/data/3d/ships/Free_SciFi-Fighter/SciFi_Fighter_AK5-diffuse.jpg"
            },
            end: {x: 4168.694003462668, y: 6362.605121389698, z: 9365.604362898332},
            start: {x: 10268.43198983676, y: 8460.51733913214, z: 10518.332013914058}
        },
        rocket: {
            start: {x:0,y:0,z:0},
            end:  {x: 12091.068833189702, y: 32269.835239847762, z: 51884.2410070035},
            velocity: 10,
            geometry: "https://raw.githubusercontent.com/lewibs/lewibs.com/develop/data/3d/ships/rocket/uploads_files_872478_shuttle_rockets_and_fuel_tank_exp_obj.obj",
            texture: "https://raw.githubusercontent.com/lewibs/lewibs.com/develop/data/3d/ships/rocket/uploads_files_872478_shuttle_rockets_and_fuel_tank_exp_obj.mtl",
        },
    }
}