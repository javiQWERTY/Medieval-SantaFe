import { AnimatedSprite, Graphics, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { Keyboard } from "../utils/Keyboard";
import { IHitbox } from "../utils/IHitbox";

export class Player extends PhysicsContainer implements IHitbox{
    
    private runAnimated: AnimatedSprite;

    private hitbox: Graphics;

    private static readonly GRAVITY = 600;
    private static readonly MOVE_SPEED = 350;
    private static readonly JUMP_SPEED = 450;

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
        this.hitbox.drawRect(0, 0, 20, 32.5);
        this.hitbox.endFill();
        this.hitbox.x = -10;
        this.hitbox.y = -40;

        this.acceleration.y = Player.GRAVITY;

        Keyboard.down.on("ArrowUp", this.jump, this);

        this.addChild(this.runAnimated);
        this.addChild(auxZero);
        this.addChild(this.hitbox);        
    }

    public getHitbox(): Rectangle {
        return this.hitbox.getBounds();
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

        if(Keyboard.state.get("ArrowDown")){

            this.acceleration.y = Player.GRAVITY * 2;
        }else{

            this.acceleration.y = Player.GRAVITY;
        }
    }

    private jump(){
        if(this.canJump){

            this.canJump = false;
            this.speed.y = -Player.JUMP_SPEED;
        }
    }

    
    separate(overlap: Rectangle, platform: ObservablePoint<any>) {
        if(overlap.width < overlap.height){

            if(this.x > platform.x){

                this.x += overlap.width;
            }else if(this.x < platform.x){

                this.x -= overlap.width;
            }

        }else{
            
            if(this.y < platform.y){

                this.y += overlap.height;
                this.speed.y = 0;
                this.canJump = true;
            }else if(this.y > platform.y){

                this.y -= overlap.height;
                this.speed.y = 0;
                this.canJump = true;
            }
        }
    }
}