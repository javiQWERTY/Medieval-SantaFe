import { Graphics, Rectangle, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { StateAnimation } from "./StateAnimation";
import { Manager } from "../utils/Manager";
import { IHitbox } from "../utils/IHitbox";
import { Player } from "./Player";

export class Enemy extends PhysicsContainer implements IHitbox {

    private enemy: StateAnimation;
    
    public player: Player;

    private hitbox: Graphics

    private static readonly GRAVITY = 600;

    constructor() {
        super();

        this.player = new Player();
        this.enemy = new StateAnimation();
        //Enemy States Animations
        //Walk State
        this.enemy.addState("walk", [
            Texture.from("AbiponAsset/AbiponWalk/AbiponWalk 48x48.png"),
            Texture.from("AbiponAsset/AbiponWalk/AbiponWalk 48x49.png"),
            Texture.from("AbiponAsset/AbiponWalk/AbiponWalk 48x50.png"),
            Texture.from("AbiponAsset/AbiponWalk/AbiponWalk 48x51.png"),
            Texture.from("AbiponAsset/AbiponWalk/AbiponWalk 48x52.png"),
            Texture.from("AbiponAsset/AbiponWalk/AbiponWalk 48x53.png"),
            Texture.from("AbiponAsset/AbiponWalk/AbiponWalk 48x54.png"),
            Texture.from("AbiponAsset/AbiponWalk/AbiponWalk 48x55.png"),
        ], 0.15);
        //Run State
        this.enemy.addState("run", [
            "AbiponAsset/SpearmanRun/SpearManRun48x48.png",
            "AbiponAsset/SpearmanRun/SpearManRun48x49.png",
            "AbiponAsset/SpearmanRun/SpearManRun48x50.png",
            "AbiponAsset/SpearmanRun/SpearManRun48x51.png",
            "AbiponAsset/SpearmanRun/SpearManRun48x52.png",
            "AbiponAsset/SpearmanRun/SpearManRun48x53.png",
            "AbiponAsset/SpearmanRun/SpearManRun48x54.png",
            "AbiponAsset/SpearmanRun/SpearManRun48x55.png",
        ]);
        //Atributos de Posicion, Escala, Velocidad y Aceleracion.
        this.scale.set(5);
        this.position.set(600, 700);
        this.acceleration.y = Enemy.GRAVITY;
        this.speed.x = 70;
        //Creacion de la Hitbox
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.3);
        this.hitbox.drawRect(0, 0, 80, 32.5);
        this.hitbox.endFill();
        this.hitbox.x = -10;
        this.hitbox.y = -40;
        //Se agregan los hijos.
        this.addChild(this.hitbox);
        this.addChild(this.enemy);
    }

    public getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

    public override update(deltaMS: number): void {
        super.update(deltaMS / 1000);
        this.enemy.playState("run");

        //Movimiento Horizontal
        this.x += this.speed.x * (deltaMS / 1000);
        //limit right
        if (this.x > Manager.width) {

            this.x = Manager.width;
            this.speed.x = - this.speed.x;
            this.scale.x = -5;
        }//limit left
        else if (this.x < 0) {

            this.x = 0;
            this.speed.x = - this.speed.x;
            this.scale.x = 5;
        }

        //limit vertical
        if (this.y > Manager.height) {

            this.y = Manager.height;
            this.speed.y = 0;
        }
    }
}