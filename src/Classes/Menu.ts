import { Container, Sprite} from "pixi.js";
import { Buttons } from "../UI/Buttons";

export class Menu extends Container{

    constructor (){
        super();

        const MenuBackground: Sprite = Sprite.from("./panel_blue.png");
        this.scale.x = 5;
        this.scale.y = 7;
        this.position.x = 310;
        this.position.y = 10;
        this.addChild(MenuBackground);
        
        const buttons = new Buttons;
        this.addChild(buttons);
    }
}