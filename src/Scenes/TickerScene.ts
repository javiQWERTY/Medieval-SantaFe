import {  Container, Texture, TilingSprite  } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import { Player } from "../Classes/Player";
import { Platform } from "../Classes/Platform";
import { Floor } from "../Classes/Floor";
//import { Box } from "../Classes/Box";
import { checkCollision } from "../utils/IHitbox";

export class TickerScene extends Container implements IScene{

    private bg: TilingSprite;
    private player: Player;
    private tiledFloor: Floor;
    private platforms:Platform[];
    //private boxes: Box;

    constructor(){
        super();

        this.bg = new TilingSprite(Texture.from("./VillageBackground.jpg"), Manager.width, Manager.height);
        this.addChild(this.bg);

        this.platforms = []; 

        const plat = new Platform();
        plat.position.set(550, 500);
        this.addChild(plat);
        this.platforms.push(plat);

        const plat2 = new Platform();
        plat2.position.set(850, 400);
        this.addChild(plat2);
        this.platforms.push(plat2);

        const plat3 = new Platform();
        plat3.position.set(300, 620);
        this.addChild(plat3);
        this.platforms.push(plat3);

        this.player = new Player();
        this.tiledFloor = new Floor();
        //this.boxes = new Box();
        this.addChild(this.tiledFloor);
        //this.addChild(this.boxes);
        this.addChild(this.player);      
        
        console.log("Nueva Escena!");
    }
    public update(deltaTime: number,_deltaFrame: number):void{
        this.player.update(deltaTime);

        for (let platform of this.platforms) {
            
            //console.log(checkCollision(this.player, platform));
            const overlap = checkCollision(this.player, platform);
            if(overlap != null){

                this.player.separate(overlap, platform.position);
            }
        }

        //limit horizontal.
        if(this.player.x > Manager.width){
            //limit right
            this.player.x = Manager.width;
        }else if(this.player.x < 0){
            //limit left.
            this.player.x = 0;
        }
        //limit vertical
        if(this.player.y > Manager.height){

            this.player.y = Manager.height;
            this.player.speed.y = 0;
            this.player.canJump = true;
        }
    }
}