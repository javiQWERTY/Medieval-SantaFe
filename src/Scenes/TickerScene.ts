import {  Container, Texture, TilingSprite  } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import { Player } from "../Classes/Player";
//import { Platform } from "../Classes/Platform";
import { Floor } from "../Classes/Floor";
//import { checkCollision } from "../utils/IHitbox";

export class TickerScene extends Container implements IScene{

    private bg: TilingSprite;
    private bg2: TilingSprite;

    private player: Player;

    private tiledFloor: Floor;
    //private platforms:Platform[];
    //private boxes: Box;

    private world:Container;

    private gameSpeed:number = 200;

    //private timePassed:number = 0;

    constructor(){
        super();

        this.world = new Container();

        this.bg = new TilingSprite(Texture.from("./Backgrounds/Background_1.png"), Manager._width, Manager._height);
        this.bg2 = new TilingSprite(Texture.from("./Backgrounds/Background_2.png"), Manager._width, Manager._height);
        this.addChild(this.bg2);
        this.addChild(this.bg);

        /*
        this.platforms = []; 

        let plat = new Platform();
        plat.position.set(550, 500);
        this.world.addChild(plat);
        this.platforms.push(plat);

        plat = new Platform();
        plat.position.set(850, 400);
        this.world.addChild(plat);
        this.platforms.push(plat);

        plat = new Platform();
        plat.position.set(300, 610);
        this.world.addChild(plat);
        this.platforms.push(plat);

        plat = new Platform();
        plat.position.set(50, 500);
        this.world.addChild(plat);
        this.platforms.push(plat);
        */

        this.player = new Player();
        this.tiledFloor = new Floor();
        //this.boxes = new Box();
        this.world.addChild(this.tiledFloor);
        //this.addChild(this.boxes);
        this.world.addChild(this.player);
        this.addChild(this.world);      
        
        console.log("Nueva Escena!");
    }
    public update(deltaTime: number, deltaFrame: number):void{

        //Creacion de una plataforma cada x segundos
        /*
        this.timePassed += deltaTime;

        if(this.timePassed > 2000){

            this.gameSpeed += 20;

            this.timePassed = 0;

            const plat = new Platform();
            plat.position.set(Manager.width, Math.random() * 1080);
            this.world.addChild(plat);
            this.platforms.push(plat);

        }
        */

        this.player.update(deltaTime);
        /*
        for (let platform of this.platforms) {

            platform.speed.x = - this.gameSpeed;
            platform.update(deltaTime / 1000);
            
            //console.log(checkCollision(this.player, platform));
            const overlap = checkCollision(this.player, platform);
            if(overlap != null){

                this.player.separate(overlap, platform.position);
            }

            //Destruir plataformas fuera de la pantalla
            if(platform.getHitbox().right < 0){

                platform.destroy();
            }
        }
        */

        //Sacar las plataformas destruidas del Array de arriba
        //this.platforms = this.platforms.filter((elem) => !elem.destroyed);
        //console.log(this.platforms.length);

        this.bg.tilePosition.x -= this.gameSpeed * (deltaFrame/1000);

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
        if(this.player.y > Manager.height){

            this.player.y = Manager.height;
            this.player.speed.y = 0;
            this.player.canJump = true;
        }
    }
}