import { appSettings } from './../app.setting';
import { Invader } from './../types/invader.type';

// toolbox used to update an invader
export class InvaderUtils {
    // move an invader according to a period in ms
    public static move(invader: Invader, elapsedTimeMs: number): Invader {
        return {
            ...invader,
            'top.%':  invader['top.%'] + invader.speed * elapsedTimeMs
        }
    }
}