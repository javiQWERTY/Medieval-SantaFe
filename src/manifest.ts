import { ResolverManifest } from "pixi.js";

export const manifest : ResolverManifest = {

    bundles: [
        {
            name : "MenuBundle",
            assets : 
            {
                "MenuBackground" : "./panel_blue.png",
                "Button Default" : "./buttonLong_blue.png"
            }
        },
        {            
            name : "CharacterSheet",
            assets :
            {
                "Character" : "./Character/texture.json"
            }
        },
        {
            name : "AbiponSheet",
            assets : 
            {
                "Abipon" : "./Abipon/texture.json"
            }
        }
    ]
}