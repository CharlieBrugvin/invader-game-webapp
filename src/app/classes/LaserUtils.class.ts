import { Laser } from './../types/laser.type';

// toolbox to transform a laser
export class LaserUtils {

    // move a laser according to a period of time in ms
    // TODO : if the laser goes outside, stop to move it and changes the flag
    public static move(laser: Laser, elapsedTimeMs: number, direction: 'top' | 'bottom'): Laser {
        return {
            ...laser,
            position: {
                ...laser.position,
                'top.%': laser.position['top.%'] + 
                    (direction === 'top' ? - elapsedTimeMs * laser.speed 
                                         : + elapsedTimeMs * laser.speed)
            }
        }
    }
}