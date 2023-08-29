import { Rectangle } from "pixi.js";

export interface IHitbox{
    getHitbox():Rectangle;
}

export function checkCollision(objA:IHitbox, objB:IHitbox):boolean{

    const rA = objA.getHitbox();
    const rB = objB.getHitbox();

    //Horizontal
    const rightmostLeft = rA.left < rB.left ? rB.left : rA.left;
    const leftmostRight = rA.right > rB.right ? rB.right : rA.right;
    //Vertical    
    const bottommostTop = rA.top < rB.top ? rB.top : rA.top;
    const topmostBottom = rA.bottom > rB.bottom ? rB.bottom : rA.bottom;
    //Return
    /*
    "makessense" significa que 
    Izquierda es Izquierda y Derecha es Derecha
    Arriba es Arriba y Abajo es Abajo
    */
    const makessenseHorizontal = rightmostLeft < leftmostRight;
    const makessenseVertical = bottommostTop < topmostBottom;
    if(makessenseHorizontal && makessenseVertical){

        return true;
    }else{

        return false;
    }
}