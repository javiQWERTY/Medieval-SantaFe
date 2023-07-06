import { Container, Sprite} from "pixi.js";
import { Buttons } from "../UI/Buttons";
import { IScene } from "../utils/IScene";

export class Menu extends Container implements IScene{

    constructor (){
        super();

        const MenuBackground: Sprite = Sprite.from("./panel_blue.png");
        this.scale.x = 5;
        this.scale.y = 7;
        this.position.x = 400;
        this.position.y = 10;
        this.addChild(MenuBackground);
        
        const buttons = new Buttons;
        this.addChild(buttons);
    }

    public update(_framesPassed: number): void {
        // To be a scene we must have the update method even if we don't use it.
    }
}