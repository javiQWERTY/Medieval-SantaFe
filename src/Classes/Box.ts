import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "../utils/IHitbox";

export class Box extends Container implements IHitbox{

    hitbox: Graphics;

    constructor(){
        super();

        //lilBox
        const lilBox = Sprite.from("./VillageProps/lilbox.png");
        lilBox.scale.set(2);
        lilBox.position.set(300, 610);
        this.addChild(lilBox);
        //mediumBox
        const mediumBox = Sprite.from("./VillageProps/mediumbox.png");
        mediumBox.scale.set(2);
        mediumBox.position.set(370, 590);
        //Hitbox de la mediumBox        
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF0000, 0.3);
        this.hitbox.drawRect(0, 0, 90, 94);
        this.hitbox.endFill();
        this.hitbox.position.set(370, 590);
        this.addChild(mediumBox, this.hitbox);
    }

    public getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
}