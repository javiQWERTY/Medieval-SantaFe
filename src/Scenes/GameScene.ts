import { Container } from "pixi.js";
import { IScene } from "../utils/IScene";

export class GameScene extends Container implements IScene{

    constructor(){
        super();
    }

    update(_framesPassed: number): void {
        // update
    }
}