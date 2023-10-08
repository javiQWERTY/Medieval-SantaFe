//Que te parece mi clase Enemy?
import { Graphics, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { StateAnimation } from "./StateAnimation";
import { Manager } from "../utils/Manager";

export class Enemy extends PhysicsContainer{

    private enemy: StateAnimation;

    private hitbox: Graphics

    private static readonly MOVE_SPEED = 10;

    constructor(){
        super();

        this.enemy = new StateAnimation();
        //Enemy States Animations
        //Run State
        this.enemy.addState("run",[
            Texture.from("Character/Run/0.png"),
            Texture.from("Character/Run/1.png"),
            Texture.from("Character/Run/2.png"),
            Texture.from("Character/Run/3.png"),
            Texture.from("Character/Run/4.png"),
            Texture.from("Character/Run/5.png"),
            Texture.from("Character/Run/6.png"),
            Texture.from("Character/Run/7.png"),
        ]);
        //Idle State
        this.enemy.addState("idle",[
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
        ]);
        //Atributos de Posicion y Escala
        this.scale.set(5);
        this.position.set(500, 700);
        //Creacion de la Hitbox
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.3);
        this.hitbox.drawRect(0, 0, 20, 32.5);
        this.hitbox.endFill();
        this.hitbox.x = -10;
        this.hitbox.y = -40;
        //Se agregan los hijos.
        this.addChild(this.enemy);
        this.addChild(this.hitbox);

    }

    // getHitbox(): Rectangle {
    //     return this.hitbox.getBounds;
    // }

    public override update(deltaMS: number): void {
        super.update(deltaMS/1000);
        this.enemy.playState("run");

        //Movimiento Horizontal y Limite Horizontal
        this.x += Enemy.MOVE_SPEED;
        if (this.x > Manager.width) {

            this.x = Manager.width;
            this.x = - Enemy.MOVE_SPEED;
            this.scale.x = -1;
        }else if(this.x < 0){

            this.x = 0;
            this.x += Enemy.MOVE_SPEED; 
            this.scale.x = 1;
        }

        //limit vertical
        if(this.y > Manager.height){

            this.y = Manager.height;
            this.y = 0;
        }
    }
}