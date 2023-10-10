import { Container, Texture, TilingSprite } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import { Player } from "../Classes/Player";
import { Floor } from "../Classes/Floor";
import { Enemy } from "../Classes/Enemy";
import { checkCollision } from "../utils/IHitbox";
import { RectangleHitbox } from "../utils/RectangleHitbox";

export class TickerScene extends Container implements IScene {

    private bg: TilingSprite;
    private bg2: TilingSprite;

    private player: Player;
    private enemy: Enemy;

    private tiledFloor: Floor;

    private world: Container;

    private gameSpeed: number = 200;

    constructor() {
        super();

        this.world = new Container();

        this.bg = new TilingSprite(Texture.from("./Backgrounds/Background_1.png"), Manager._width, Manager._height);
        this.bg2 = new TilingSprite(Texture.from("./Backgrounds/Background_2.png"), Manager._width, Manager._height);
        this.addChild(this.bg2);
        this.addChild(this.bg);

        this.player = new Player();
        this.enemy = new Enemy();
        this.tiledFloor = new Floor();
        this.world.addChild(this.tiledFloor);
        this.world.addChild(this.enemy);
        this.world.addChild(this.player);
        this.addChild(this.world);

        console.log("Nueva Escena!");
    }
    /*
        El método para que el enemigo detecte al jugador se puede dividir en los siguientes pasos:
 
        Obtener la hitbox del jugador.
        Obtener la hitbox del enemigo.
        Verificar si las dos hitbox se intersectan.
    */
    public detectPlayer(): boolean {

        const enemyHitbox = new RectangleHitbox(this.enemy.getHitbox());
        const playerHitbox = new RectangleHitbox(this.player.getHitbox());
        const collision = checkCollision(enemyHitbox, playerHitbox);

        if (collision) {

            //El enemigo detecto al jugador
            console.log("!!! - STOP RIGHT THERE - !!!");
            //Hacemos que el enemigo vaya al jugador
            this.enemy.speed.x = (this.player.x - this.enemy.x) * 0.5;
            //Hacemos que el enemigo mire al jugador
            if (this.enemy.x < this.player.x) {

                this.enemy.scale.x = 5;
            } else {

                this.enemy.scale.x = -5;
            }
            //Ataque
            this.enemy.attackToPlayer();
            return true;
        } else {

            console.log("It must be the wind");
            this.enemy.enemyIdleRun();
            this.enemy.speed.x = this.enemy.speed.x;
            return false;
        }
    }
    
    public update(deltaTime: number, deltaFrame: number): void {

        //Detect Player
        this.detectPlayer();
        this.player.update(deltaTime);
        this.player.attack();
        this.enemy.update(deltaTime);


        this.bg.tilePosition.x -= this.gameSpeed * (deltaFrame / 1000);

        /*
        //limit horizontal.
        if(this.player.x > Manager.width){
            //limit right
            this.player.x = Manager.width;
        }else if(this.player.x < 0){
            //limit left.
            this.player.x = 0;
        }
        */
        //limit vertical
        if (this.player.y > Manager.height) {

            this.player.y = Manager.height;
            this.player.speed.y = 0;
            this.player.canJump = true;
        }
    }
}