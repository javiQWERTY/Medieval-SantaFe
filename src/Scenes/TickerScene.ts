import {  Container  } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import { Player } from "../Classes/Player";
import { Platform } from "../Classes/Platform";
import { Floor } from "../Classes/Floor";

export class TickerScene extends Container implements IScene{

    private player: Player;
    private bwPlatform: Platform;
    private tiledFloor: Floor;

    constructor(){
        super();

        this.player = new Player();
        this.bwPlatform = new Platform();
        this.tiledFloor = new Floor();
        this.addChild(this.tiledFloor);
        this.addChild(this.bwPlatform);
        this.addChild(this.player);      
        
        console.log("Nueva Escena!");
    }
    public update(deltaTime: number,_deltaFrame: number):void{

        this.player.update(deltaTime);
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
            this.player.canJump = true;
        }
    }
}