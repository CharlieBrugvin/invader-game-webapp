import { Invader } from './invader.type';
import { Laser } from './laser.type';
import { Ship } from './ship.type';

export interface Board {
    elements: {
        ship: Ship;
        invaders: Invader[];
        lasers: {
            invader: Laser[];
            ship: Laser[];
        }
    }
    score: number;
}