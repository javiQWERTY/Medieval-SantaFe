import { LoaderScene } from "./utils/SceneLoader";
import { Manager } from "./utils/Manager";
import { BaseTexture, SCALE_MODES } from "pixi.js";
import { Keyboard } from "./utils/Keyboard";

// Scale mode for all textures, will retain pixelation
BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

Keyboard.initialize();
Manager.initialize(1366, 768, 0x50b9f2);

// We no longer need to tell the scene the size because we can ask Manager!
const loady: LoaderScene = new LoaderScene();
Manager.changeScene(loady);