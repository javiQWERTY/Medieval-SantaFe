import { KeyBoard } from "./utils/Keyboard";
import { LoaderScene } from "./utils/SceneLoader";
import { Manager } from "./utils/Manager";
import { BaseTexture, SCALE_MODES } from "pixi.js";

// Scale mode for all textures, will retain pixelation
BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

Manager.initialize(720, 1280, 0x50b9f2);
KeyBoard.initialize();

// We no longer need to tell the scene the size because we can ask Manager!
const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);