import { utils } from "pixi.js";

export class Keyboard{

    public static readonly state : Map<String, Boolean> = new Map();

    public static readonly down : utils.EventEmitter = new utils.EventEmitter();
    public static readonly up : utils.EventEmitter = new utils.EventEmitter();

    private constructor(){}

    private static initialized : boolean = false;

    public static initialize() : void{
        
        console.log("Keyboard Initialized!");

        if(Keyboard.initialized){
            return;
        }

        Keyboard.initialized = true;

        document.addEventListener("keydown", Keyboard.onKeyDown)
        document.addEventListener("keyup", Keyboard.onKeyUp)
    }

    private static onKeyDown(e: KeyboardEvent){

        if(Keyboard.state.get(e.key) != true){
            
            Keyboard.down.emit(e.key);
        }

        Keyboard.state.set(e.key, true);
        //console.log("Key ", e.key, " Down");
    }

    private static onKeyUp(e: KeyboardEvent){

        Keyboard.up.emit(e.key);
        
        Keyboard.state.set(e.key, false);
    }
}