//ENTIENDES ESTES CODIGO?
import { Container, Sprite, Texture, Text} from "pixi.js";

export class Buttons extends Container{

    private buttonTexture: Texture;
    private buttonDownTexture: Texture;

    private lastKeyPressed: Text;

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

        //Key Pressed
        this.lastKeyPressed = new Text("Waiting...", {fontSize : 48, fontFamily: 'Courier New'});
        this.lastKeyPressed.anchor.set(0.5);
        this.lastKeyPressed.scale.set(0.3);
        this.lastKeyPressed.position.x = 50;
        this.lastKeyPressed.position.y = 50;

        document.addEventListener ("keydown", this.onKeyDown.bind(this));

        this.addChild(this.lastKeyPressed);

        //Exite Game Button
        const exitGameButton = Sprite.from(this.buttonTexture);
        exitGameButton.anchor.set(0.5);
        exitGameButton.scale.set(0.4);
        exitGameButton.position.x = 50;
        exitGameButton.position.y = 80;
        exitGameButton.interactive = true;
        exitGameButton.cursor = "pointer";
        exitGameButton.on("pointerdown", this.onExitButtonDown.bind(this));
        exitGameButton.on("pointerup", this.onExitButtonUp.bind(this));
        this.addChild(exitGameButton);
    }

    onButtonDown(event : PointerEvent){
        console.log("Presionaste el Boton");

        const sprite = event.currentTarget as Sprite;
        sprite.texture = this.buttonDownTexture;
    }

    onButtonUp(event : PointerEvent){
        console.log("Soltaste el Boton.")

        const sprite = event.currentTarget as Sprite;
        sprite.texture = this.buttonTexture;
    }

    onExitButtonDown(event : PointerEvent){
        console.log("YOU...");

        const sprite = event.currentTarget as Sprite;
        sprite.texture = this.buttonTexture;
    }

    onExitButtonUp(event : PointerEvent){
        console.log("SHALL NOT...PASS!!!");
        
        const sprite = event.currentTarget as Sprite;
        sprite.texture = this.buttonTexture;
    }

    onKeyDown(e : KeyboardEvent){
        console.log("Key Pressed", e.code);

        this.lastKeyPressed.text = e.code;
    }
}
