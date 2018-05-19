import { Ship } from './../types/ship.type';

export class ShipUtils {

    // move a ship to the right or the left according to a given period in ms
    public static move(ship, elapsedTimeMs, direction: 'right' | 'left'): Ship {
        return {
            ...ship,
            position: {
                ...ship.position,
                'left.%': ship.position['left.%'] + 
                (direction === 'left' ? - ship.speed * elapsedTimeMs 
                                      : + ship.speed * elapsedTimeMs)
            }
        }
    }
}