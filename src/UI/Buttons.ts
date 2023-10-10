import { Container, Sprite, Texture, Text} from "pixi.js";
import { Manager } from "../utils/Manager";
import { TickerScene } from "../Scenes/TickerScene";

export class Buttons extends Container{

    private buttonTexture: Texture;
    private buttonDownTexture: Texture;


    public constructor(){
        super();

        this.buttonTexture = Texture.from("./buttonLong_blue.png")
        this.buttonDownTexture = Texture.from("./buttonLong_blue_pressed.png");

        //New Game Button
        const newGameButton = Sprite.from(this.buttonTexture);
        newGameButton.anchor.set(0.5);
        newGameButton.scale.set(0.4);
        newGameButton.position.x = 50;
        newGameButton.position.y = 20;
        newGameButton.interactive = true;
        newGameButton.cursor = "pointer";
        newGameButton.on("pointerdown", this.onButtonDown.bind(this));
        newGameButton.on("pointerup", this.onButtonUp.bind(this));
        this.addChild(newGameButton);
        //Texto del New Game Button
        const newGameButtonText = new Text("New Game", {fontSize: 20, fontFamily: 'Courier New'});
        newGameButtonText.anchor.set(1);
        newGameButtonText.position.set(newGameButton.width / 2, newGameButton.height / 2);
        newGameButton.addChild(newGameButtonText);

        //Exite Game Button
        const exitGameButton = Sprite.from(this.buttonTexture);
        exitGameButton.anchor.set(0.5);
        exitGameButton.scale.set(0.4);
        exitGameButton.position.x = 50;
        exitGameButton.position.y = 50;
        exitGameButton.interactive = true;
        exitGameButton.cursor = "pointer";
        exitGameButton.on("pointerdown", this.onExitButtonDown.bind(this));
        exitGameButton.on("pointerup", this.onExitButtonUp.bind(this));
        this.addChild(exitGameButton);
        //Texto del Exit Game Button
        const exitButtonText = new Text("Exit Game", {fontSize: 20, fontFamily: 'Courier New'});
        exitButtonText.anchor.set(1);
        exitButtonText.position.set(exitGameButton.width / 2, exitGameButton.height / 2);
        exitGameButton.addChild(exitButtonText);
    }

    onButtonDown(event : PointerEvent){
        console.log("Presionaste el Boton!");

        const sprite = event.currentTarget as Sprite;
        sprite.texture = this.buttonDownTexture;

        Manager.changeScene(new TickerScene);
    }

    onButtonUp(event : PointerEvent){
        console.log("Soltaste el Boton.")

        const sprite = event.currentTarget as Sprite;
        sprite.texture = this.buttonTexture;
    }

    onExitButtonDown(event : PointerEvent){
        console.log("YOU...");

        const sprite = event.currentTarget as Sprite;
        sprite.texture = this.buttonDownTexture;
    }

    onExitButtonUp(event : PointerEvent){
        console.log("SHALL NOT...PASS!!!");
        
        const sprite = event.currentTarget as Sprite;
        sprite.texture = this.buttonTexture;
    }
}
