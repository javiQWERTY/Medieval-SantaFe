import {  Container, Texture, TilingSprite  } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import { Player } from "../Classes/Player";
import { Platform } from "../Classes/Platform";
import { Floor } from "../Classes/Floor";
import { checkCollision } from "../utils/IHitbox";

export class TickerScene extends Container implements IScene{

    private bg: TilingSprite;
    private bg2: TilingSprite;

    private player: Player;

    private tiledFloor: Floor;
    private platforms:Platform[];
    //private boxes: Box;

    private world:Container;

    private gameSpeed:number = 100;

    constructor(){
        super();

        this.world = new Container();

        this.bg = new TilingSprite(Texture.from("./Backgrounds/Background_1.png"), Manager._width, Manager._height);
        this.bg2 = new TilingSprite(Texture.from("./Backgrounds/Background_2.png"), Manager._width, Manager._height);
        this.addChild(this.bg2, this.bg);

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

        plat = new Platform();
        plat.position.set(-250, 400);
        this.world.addChild(plat);
        this.platforms.push(plat);

        this.player = new Player();
        this.tiledFloor = new Floor();
        //this.boxes = new Box();
        this.world.addChild(this.tiledFloor);
        //this.addChild(this.boxes);
        this.world.addChild(this.player);
        this.addChild(this.world);      
        
        console.log("Nueva Escena!");
    }
    public update(deltaTime: number,_deltaFrame: number):void{
        this.player.update(deltaTime);

        for (let platform of this.platforms) {

            platform.speed.x = - this.gameSpeed;
            platform.update(deltaTime / 1000);
            
            //console.log(checkCollision(this.player, platform));
            const overlap = checkCollision(this.player, platform);
            if(overlap != null){

                this.player.separate(overlap, platform.position);
            }
        }

        this.bg.tilePosition.x -= this.gameSpeed * (deltaTime/1000);

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