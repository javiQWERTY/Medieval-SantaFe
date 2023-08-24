import { Container, Sprite } from "pixi.js";

export class Platform extends Container{

    constructor(){
        super();

        const platformSprite = Sprite.from("./VillageProps/bigwoodenplatform.png");
        platformSprite.scale.set(2);
        this.addChild(platformSprite);
    }
}