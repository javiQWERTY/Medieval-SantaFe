import { AnimatedSprite, Container, Graphics, Texture } from "pixi.js";
import { IScene } from "../utils/IScene";
import { PhysicsContainer } from "../Classes/PhysicsContainer";
import { Manager } from "../utils/Manager";

export class TickerScene extends Container implements IScene{

    private runAnimated: AnimatedSprite;
    private physPlayer: PhysicsContainer;

    constructor(){
        super();

        //Animated Sprite
        this.runAnimated = new AnimatedSprite([
            Texture.from("./Run/tile000.png"),
            Texture.from("./Run/tile001.png"),
            Texture.from("./Run/tile002.png"),
            Texture.from("./Run/tile003.png"),
            Texture.from("./Run/tile004.png"),
            Texture.from("./Run/tile005.png"),
            Texture.from("./Run/tile006.png"),
            Texture.from("./Run/tile007.png"),
        ],
        false
        );
        this.runAnimated.play();
        this.runAnimated.anchor.set(0.5, 1)
        this.runAnimated.animationSpeed = 0.25;
        this.scale.set(5);
        this.position.x = 1;
        this.position.y = 1;
        this.addChild(this.runAnimated);

        this.physPlayer = new PhysicsContainer();
        this.physPlayer.speed.x = 50;
        this.physPlayer.speed.y = 50;
        this.addChild(this.physPlayer);
        this.physPlayer.addChild(this.runAnimated);

        const auxZero = new Graphics();
        auxZero.beginFill(0xFF0000)
        auxZero.drawCircle(0, 0, 1);
        auxZero.endFill();

        this.physPlayer.addChild(this.runAnimated);
        this.physPlayer.addChild(auxZero);
    }
    public update(deltaTime: number,deltaFrame: number){

        this.runAnimated.update(deltaFrame);

        const dt = deltaTime / 1000;
        this.physPlayer.update(dt);

        if(this.physPlayer.x > this.width){

            this.physPlayer.x = this.width;
            this.physPlayer.speed.x = Math.abs(this.physPlayer.speed.x) * - 1;
            console.log("Tocó el borde derecho!");
            this.physPlayer.scale.x = - 1; 
        }else if(this.physPlayer.x < 0){

            this.physPlayer.x = 0;
            this.physPlayer.speed.x = Math.abs(-this.physPlayer.speed.x);
            this.physPlayer.scale.x = 1;
        }

        if(this.physPlayer.y > Manager.height - 610){

            this.physPlayer.y = Manager.height - 610;
            console.log("Tocó el borde inferior!");
        }
        
    }
}