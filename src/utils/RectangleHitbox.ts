import { Rectangle } from "pixi.js";
import { IHitbox } from "./IHitbox";

export class RectangleHitbox implements IHitbox{

    constructor(public hitbox: Rectangle){}
    
        getHitbox(): Rectangle{

            return this.hitbox;
        }
}