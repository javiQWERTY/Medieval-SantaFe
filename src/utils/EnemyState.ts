import { Enemy } from "../Classes/Enemy";
import { StateAnimation } from "../Classes/StateAnimation";

export class EnemyState extends StateAnimation{

    public enemy = new Enemy();

    constructor(enemy: Enemy){
        super();
        this.enemy = enemy;
    }

    public publicPlayState(state: string): void{

        this.playState(state);
    }
}