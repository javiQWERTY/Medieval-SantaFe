//Que te parece mi clase Enemy?
import { Graphics, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { StateAnimation } from "./StateAnimation";
import { Manager } from "../utils/Manager";

export class Enemy extends PhysicsContainer{

    private enemy: StateAnimation;

    private hitbox: Graphics

    private static readonly GRAVITY = 600;

    constructor(){
        super();

        this.enemy = new StateAnimation();
        //Enemy States Animations
        //Run State
        this.enemy.addState("walk",[
            Texture.from("AbiponAsset/AbiponWalk/AbiponWalk 48x48.png"),
            Texture.from("AbiponAsset/AbiponWalk/AbiponWalk 48x49.png"),
            Texture.from("AbiponAsset/AbiponWalk/AbiponWalk 48x50.png"),
            Texture.from("AbiponAsset/AbiponWalk/AbiponWalk 48x51.png"),
            Texture.from("AbiponAsset/AbiponWalk/AbiponWalk 48x52.png"),
            Texture.from("AbiponAsset/AbiponWalk/AbiponWalk 48x53.png"),
            Texture.from("AbiponAsset/AbiponWalk/AbiponWalk 48x54.png"),
            Texture.from("AbiponAsset/AbiponWalk/AbiponWalk 48x55.png"),
        ], 0.15);
        //Atributos de Posicion, Escala, Velocidad y Aceleracion.
        this.scale.set(5);
        this.position.set(600, 700);        
        this.acceleration.y = Enemy.GRAVITY;
        this.speed.x = 70;
        //Creacion de la Hitbox
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.3);
        this.hitbox.drawRect(0, 0, 20, 32.5);
        this.hitbox.endFill();
        this.hitbox.x = -10;
        this.hitbox.y = -40;
        //Se agregan los hijos.
        this.addChild(this.hitbox);
        this.addChild(this.enemy);

    }

    // getHitbox(): Rectangle {
    //     return this.hitbox.getBounds;
    // }

    public override update(deltaMS:number): void {
        super.update(deltaMS/1000);
        this.enemy.playState("walk");

        //Movimiento Horizontal
        this.x += this.speed.x * (deltaMS/1000);
        //limit right
        if (this.x > Manager.width) {

            this.x = Manager.width;
            this.speed.x = - this.speed.x;
            this.scale.x = -5;
        }//limit left
        else if(this.x < 500){

            this.x = 500;
            this.speed.x = - this.speed.x;
            this.scale.x = 5;
        }

        //limit vertical
        if(this.y > Manager.height){

            this.y = Manager.height;
            this.speed.y = 0;
        }
    }
}