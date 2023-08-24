import { AnimatedSprite, Graphics, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { Keyboard } from "../utils/Keyboard";

export class Player extends PhysicsContainer{
    
    private runAnimated: AnimatedSprite;

    private hitbox: Graphics;

    private static readonly GRAVITY = 350;
    private static readonly MOVE_SPEED = 350;

    public canJump = true;

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
        this.position.set(1);
        this.addChild(this.runAnimated);
        
        const auxZero = new Graphics();
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(0, 0, 1);
        auxZero.endFill();

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.3);
        this.hitbox.drawRect(0, 0, 20, 35);
        this.hitbox.endFill();
        this.hitbox.x = -10;
        this.hitbox.y = -40;

        this.acceleration.y = Player.GRAVITY;

        Keyboard.down.on("ArrowUp", this.jump, this);

        this.addChild(this.runAnimated);
        this.addChild(auxZero);
        this.addChild(this.hitbox);        
    }

    public override destroy(options:any){
        super.destroy(options);
        Keyboard.down.off("ArrowUp", this.jump);        
    }

    public override update(deltaMS: number):void{

        super.update(deltaMS / 1000);
        this.runAnimated.update(deltaMS / (1000/60));
        //MOVIMIENTO POR TECLADO
        //Movimiento a la Derecha.
        if (Keyboard.state.get("ArrowRight")) {

            this.speed.x = Player.MOVE_SPEED;
            this.runAnimated.scale.x = 1;
            //Movimiento a la Izquierda.
        }else if (Keyboard.state.get("ArrowLeft")){

            this.speed.x = - Player.MOVE_SPEED;
            this.runAnimated.scale.x = -1;
            //Idle.
        }else{
            this.speed.x = 0;
        }

        if(Keyboard.state.get("ArrowUp")){

            this.jump();
        }
    }

    private jump(){
        if(this.canJump){

            this.canJump = false;
            this.speed.y = -350;
        }
    }
}