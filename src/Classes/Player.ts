import { Graphics, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { Keyboard } from "../utils/Keyboard";
import { IHitbox } from "../utils/IHitbox";
import { StateAnimation } from "./StateAnimation";

export class Player extends PhysicsContainer implements IHitbox{
    
    private player: StateAnimation;

    private hitbox: Graphics;

    private static readonly GRAVITY = 600;
    private static readonly MOVE_SPEED = 350;
    private static readonly JUMP_SPEED = 450;

    public canJump = true;

    constructor(){
        super();
        this.player = new StateAnimation();
        //States Animations
        //Run State Animation
        this.player.addState("run",[
            Texture.from("Character/Run/0.png"),
            Texture.from("Character/Run/1.png"),
            Texture.from("Character/Run/2.png"),
            Texture.from("Character/Run/3.png"),
            Texture.from("Character/Run/4.png"),
            Texture.from("Character/Run/5.png"),
            Texture.from("Character/Run/6.png"),
            Texture.from("Character/Run/7.png"),
        ], 0.12, true);
        //Jump State Animation
        this.player.addState("jump", [
            "Character/Jump/0.png",
            "Character/Jump/1.png",
            "Character/Jump/2.png"
        ], 0.12, true);
        //Idle State Animation
        this.player.addState("idle", [
            "Character/Idle/00.png",
            "Character/Idle/01.png",
            "Character/Idle/02.png",
            "Character/Idle/03.png",
            "Character/Idle/04.png",
            "Character/Idle/05.png",
            "Character/Idle/06.png",
            "Character/Idle/07.png",
            "Character/Idle/08.png",
            "Character/Idle/09.png",
        ], 0.12, true);
        this.scale.set(5);
        this.position.set(100, 700);
        this.addChild(this.player);
        
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

        this.addChild(this.player);
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
        this.player.update((deltaMS / (1000/60)));
        //MOVIMIENTO POR TECLADO
        //Movimiento a la Derecha.
        if (Keyboard.state.get("ArrowRight")) {

            this.player.playState("run", true);
            this.speed.x = Player.MOVE_SPEED;
            this.player.scale.x = 1;
            //Movimiento a la Izquierda.
        }else if (Keyboard.state.get("ArrowLeft")){

            this.player.playState("run", true);
            this.speed.x = - Player.MOVE_SPEED;
            this.player.scale.x = -1;
            //Idle.
        }else{

            this.player.playState("idle", true);
            this.speed.x = 0;
        }

        if(Keyboard.state.get("ArrowUp")){
            
            this.player.playState("jump", true);
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