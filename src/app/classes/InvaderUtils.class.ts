import { appSettings } from './../app.setting';
import { Invader } from './../types/invader.type';

// toolbox used to update an invader
export class InvaderUtils {
    
    // create an invader with a given top value
    // default top value is just above the board
    public static create(topPercent: number = -appSettings.invader['height.%']): Invader {
        return {
            'top.%': topPercent,
            'height.%': appSettings.invader['height.%'],
            speed: appSettings.invader.speed,
            life: 100,
            insideBoard: true
        }
    }

    // move an invader according to a period in ms
    // only move if the invader is inside the board
    public static move(invader: Invader, elapsedTimeMs: number): Invader {
        
        const newTop =  invader.insideBoard ?
                             invader['top.%'] + invader.speed * elapsedTimeMs
                           : invader['top.%'];

        const newInSideBoard = invader['top.%'] > 100 ? false : true;

        return {
            ...invader,
            'top.%':  newTop,
            insideBoard: newInSideBoard
        }
    }
}