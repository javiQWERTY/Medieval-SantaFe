import { Container, Sprite } from "pixi.js";
import { IScene } from "../utils/IScene";

export class GameScene extends Container implements IScene{

    constructor(){
        super();

        const gameBackground: Sprite = Sprite.from("./panelset_brown.png");
        this.scale.x = 13;
        this.scale.y = 7;
        this.position.x = 5;
        this.position.y = 10;
        this.addChild(gameBackground);
    }

    update(_framesPassed: number): void {
        // update
    }
}