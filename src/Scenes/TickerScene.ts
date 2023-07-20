import {  Container  } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import { Player } from "../Classes/Player";

export class TickerScene extends Container implements IScene{

    private player: Player;

    constructor(){
        super();

        this.player = new Player();
        this.addChild(this.player);
    }
    public update(deltaTime: number,_deltaFrame: number){

        this.player.update(deltaTime);
        //limit horizontal.
        if(this.player.x > this.width){
            //limit right
            this.player.x = this.width;
            //console.log("Tocó el borde derecho!");
            this.player.scale.x = - 1; 
        }else if(this.player.x < 0){
            //limit left.
            this.player.x = 0;
            this.player.scale.x = 1;
        }
        //limit vertical
        if(this.player.y > Manager.height){

            this.player.y = Manager.height;
            this.player.speed.y = 0; 
            //console.log("Tocó el borde inferior!");
        }
        
    }
}