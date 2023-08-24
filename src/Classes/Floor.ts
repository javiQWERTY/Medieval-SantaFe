import { Container, Sprite } from "pixi.js";

export class Floor extends Container{

    constructor(){
        super();

        const floor = Sprite.from("./Floor/bigtiledfloor.png");
        floor.scale.set(1, 1);
        floor.position.set(1, 680);

        const floor2 = Sprite.from("./Floor/bigtiledfloor.png");
        floor2.scale.set(1, 1);
        floor2.position.set(90, 680);
        
        const floor3 = Sprite.from("./Floor/bigtiledfloor.png");
        floor3.scale.set(1, 1);
        floor3.position.set(180, 680);

        const floor4 = Sprite.from("./Floor/bigtiledfloor.png");
        floor4.scale.set(1, 1);
        floor4.position.set(270, 680);

        const floor5 = Sprite.from("./Floor/bigtiledfloor.png");
        floor5.scale.set(1, 1);
        floor5.position.set(360, 680);

        const floor6 = Sprite.from("./Floor/bigtiledfloor.png");
        floor6.scale.set(1, 1);
        floor6.position.set(450, 680);

        const floor7 = Sprite.from("./Floor/bigtiledfloor.png");
        floor7.scale.set(1, 1);
        floor7.position.set(540, 680);

        const floor8 = Sprite.from("./Floor/bigtiledfloor.png");
        floor8.scale.set(1, 1);
        floor8.position.set(630, 680);

        const floor9 = Sprite.from("./Floor/bigtiledfloor.png");
        floor9.scale.set(1, 1);
        floor9.position.set(720, 680);

        const floor10 = Sprite.from("./Floor/bigtiledfloor.png");
        floor10.scale.set(1, 1);
        floor10.position.set(810, 680);

        const floor11 = Sprite.from("./Floor/bigtiledfloor.png");
        floor11.scale.set(1, 1);
        floor11.position.set(900, 680);

        const floor12 = Sprite.from("./Floor/bigtiledfloor.png");
        floor12.scale.set(1, 1);
        floor12.position.set(990, 680);

        const floor13 = Sprite.from("./Floor/bigtiledfloor.png");
        floor13.scale.set(1, 1);
        floor13.position.set(1080, 680);
        
        this.addChild(floor);
        this.addChild(floor2);
        this.addChild(floor3);
        this.addChild(floor4);
        this.addChild(floor5);
        this.addChild(floor6);
        this.addChild(floor7);
        this.addChild(floor8);
        this.addChild(floor9);
        this.addChild(floor10);
        this.addChild(floor11);
        this.addChild(floor12);
    }
}