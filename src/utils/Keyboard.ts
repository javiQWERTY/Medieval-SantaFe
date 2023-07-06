import { utils } from "pixi.js";

export class KeyBoard{

    public static readonly state : Map<String, Boolean> = new Map();

    public static readonly down : utils.EventEmitter = new utils.EventEmitter();
    public static readonly up : utils.EventEmitter = new utils.EventEmitter();

    private constructor(){}

    private static initialized : boolean = false;

    public static initialize() : void{

        if(KeyBoard.initialized){
            return;
        }

        KeyBoard.initialized = true;

        document.addEventListener("keydown", KeyBoard.onKeyDown);
        document.addEventListener("keydown", KeyBoard.onKeyUp);
    }

    private static onKeyDown(e: KeyboardEvent){

        if(KeyBoard.state.get(e.code) != true){
            
            KeyBoard.down.emit(e.code);
        }

        KeyBoard.state.set(e.code, true);
    }

    private static onKeyUp(e: KeyboardEvent){

        KeyBoard.up.emit(e.code);
        
        KeyBoard.state.set(e.code, false);
    }
}