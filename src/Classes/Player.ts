import { AnimatedSprite, Graphics, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { KeyBoard } from "../utils/Keyboard";

export class Player extends PhysicsContainer{
    
    private runAnimated: AnimatedSprite;
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
        
        const auxZero = new Graphics();
        auxZero.beginFill(0xFF0000)
        auxZero.drawCircle(0, 0, 1);
        auxZero.endFill();

        this.addChild(this.runAnimated);
        this.addChild(auxZero);
        
        this.acceleration.y = Player.GRAVITY;   
    }

    public override update(deltaMS: number){

        super.update(deltaMS / 1000);
        this.runAnimated.update(deltaMS / (1000/60));

        //MOVIMIENTO POR TECLADO
        //movimiento a la derecha.
        if(KeyBoard.state.get("ArrowRight")){

            this.speed.x = Player.MOVE_SPEED;
            //movimiento a la izquierda.
        }else if(KeyBoard.state.get ("ArrowLeft")){

            this.speed.x = -Player.MOVE_SPEED;
        }else{
            this.speed.x = 0;
        }
    }
}