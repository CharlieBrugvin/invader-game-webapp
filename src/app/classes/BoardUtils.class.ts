import { Laser } from './../types/laser.type';
import { Ship } from './../types/ship.type';
import { appSettings } from './../app.setting';
import { Invader } from './../types/invader.type';
import { Board } from './../types/board.type';
import * as _ from 'lodash';

// this class contains static methods used to manage a Board (creation, update, ...)
export class BoardUtils {

    // this function create a board in its initial state
    // describe in the settings (app.setting.ts)
    static createBoard(): Board {

        // generation of the columns of invader, with one invader on the middle
        const firstInvader: Invader = {
            life: 100, outside: false, 
            'top.%': 1, 
            speed: appSettings.invader.speed
        }
        const invaderColumns = _.times(appSettings.invader_column.number)
                        .map( (val, index) => 
                            Math.floor(appSettings.invader_column.number / 2) === index ? [firstInvader] : []
                        );
        return {
            elements: {
                ship: {
                    life: 100,
                    position: {'left.%': 50,'bottom.%': 0.5},
                    speed: appSettings.ship.speed
                },
                invaders: invaderColumns,
                lasers: {
                    invader: [] 
                    /*
                    [
                        {position: {'left.%': 20,'top.%': 20}, exists: true,
                            speed: appSettings.laser_invader.speed,
                            damage: appSettings.laser_invader.damages}
                    ],
                    */,
                    ship: []
                    /*
                    [
                        {position: {'left.%': 30,'top.%': 20}, exists: true,
                        speed: appSettings.laser_ship.speed,
                        damage: appSettings.laser_ship.damages}
                    ]
                    */
                }
            },
            score: 0
        }
    }

    // take as inputs the previous board, the time elapsed between now and the last update
    // and the actions of the user
    public static updateBoard(oldBoard: Board, elapsedTime: number, input: Input) {
        
        // used to move all the elements according to their speed
        // moveBoardElements(board): Board

        //detect collisions : collision between a ship and a laser, an invader and a laser,
        // a laser and a border, an invader and a border
        // detectCollisions(board): BoardColision[]

        /*
        applyCollisions(board, collisions): Board {
            // damages : laser and invader or laser and ship
            // laser outside doesn't exists anymore
            // invader outside doesn't exists anymore
        }
        */

        /*
        // deletes the laser / invaders outside and the invaders deads
        deleteElements(board): {board, invaderDeads: Invader[]} {
            // delete the laser outside
            // delete the invaders outside
            // delete the invaders dead
        }
        */
        
        // generate invaders if another is killed

        // update the score
    }

    // ! this function directly change the value of the board argument (passed as reference)
    public static moveBoardElements(board: Board, elapsedTime: number, shipMoves: 'left' | 'right' | null): void {
        // --- move of the ship ----

        let leftPos = board.elements.ship.position['left.%'];
        if (shipMoves === 'left') {
            leftPos -= appSettings.ship.speed * elapsedTime;
        } else if (shipMoves ==='right') {
            leftPos += appSettings.ship.speed * elapsedTime;
        }
        // is the ship outside ?
        leftPos = leftPos < 0 ? 0 : leftPos;
        leftPos = leftPos > 100 - appSettings.ship.size['width.%'] ? 100 - appSettings.ship.size['width.%'] : leftPos;

        board.elements.ship.position['left.%'] = leftPos;
    
        // we move the invaders
        board.elements.invaders = board.elements.invaders.map(
            column => column.map(
                invader => ({
                    ...invader, 
                    'top.%': invader['top.%'] + appSettings.invader.speed * elapsedTime
                })
            )
        )
        
        // we move the lasers
        board.elements.lasers.invader = board.elements.lasers.invader.map( 
            laser => ({
                ...laser,
                position: {
                    ...laser.position,
                    'top.%': laser.position['top.%'] + appSettings.laser_invader.speed * elapsedTime
                } 
                })
            )
        board.elements.lasers.ship = board.elements.lasers.ship.map( 
            laser => ({
                ...laser,
                position: {
                    ...laser.position,
                    'top.%': laser.position['top.%'] - appSettings.laser_ship.speed * elapsedTime
                } 
                })
            )
    }

}

interface Input {
    shipMoves: 'left' | 'right' | null,
    shipShoot: boolean
}

interface BoardColision {
    invaderWithLaser: {
        invaderIndex: number,
        LaserIndex: number
    }[],

    shipWithLaser: number[], // laser index array

    laserOutside: number[], // laser index array

    invaderOutside: number[], // invader index array
}