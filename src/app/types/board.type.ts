import { Invader } from './invader.type';
import { Laser } from './laser.type';
import { Ship } from './ship.type';

export interface Board {
    elements: {
        ship: Ship;
        invaders: Invader[][]; // each invader is in is own column
        lasers: {
            invader: Laser[];
            ship: Laser[];
        }
    }
    score: number;
    events: any;
    gameOver: boolean;
}