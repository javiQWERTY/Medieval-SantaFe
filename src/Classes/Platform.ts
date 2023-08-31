import { Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "../utils/IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Platform extends PhysicsContainer implements IHitbox{

    hitbox: Graphics;

    constructor(){
        super();

        //Plataforma 1
        const bigPlatform = Sprite.from("./VillageProps/bigwoodenplatform.png");
        bigPlatform.scale.set(2);

        /*
        //Soportes de la Plataforma
        const woodSupp = Sprite.from("./VillageProps/woodensupp.png");
        woodSupp.scale.set(2.5, 2);
        woodSupp.position.set(513, 510);
        const woodSupp2 = Sprite.from("./VillageProps/woodensupp.png");
        woodSupp2.scale.set(2.5, 2);
        woodSupp2.position.set(625, 510);*/

        //Hitbox de la plataforma       
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF0000, 0.3);
        this.hitbox.drawRect(0, 0, 148, 20);
        this.hitbox.endFill();

        //this.addChild(woodSupp, woodSupp2);
        this.addChild(bigPlatform);
        this.addChild(this.hitbox);
    }

    public getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
}