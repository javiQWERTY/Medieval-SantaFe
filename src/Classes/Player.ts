import { AnimatedSprite, Graphics, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { Keyboard } from "../utils/Keyboard";

export class Player extends PhysicsContainer{
    
    private runAnimated: AnimatedSprite;
    private hitbox: Graphics;

    private static readonly GRAVITY = 100;
    private static readonly MOVE_SPEED = 1000;

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
        
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.0001);
        this.hitbox.drawRect(0, -140, 90, 140);
        this.hitbox.endFill;
        this.hitbox.pivot.x = this.hitbox.width / 2;

        this.addChild(this.runAnimated);
        this.addChild(this.hitbox);
        
        this.acceleration.y = Player.GRAVITY;   
    }

    public override update(deltaTime: number){

        super.update(deltaTime / 1000);
        this.runAnimated.update(deltaTime / (1000/60));
        //MOVIMIENTO POR TECLADO
        //movimiento a la derecha.
        if(Keyboard.state.get("KeyD")){
            this.speed.x = Player.MOVE_SPEED;
        }
    }
}