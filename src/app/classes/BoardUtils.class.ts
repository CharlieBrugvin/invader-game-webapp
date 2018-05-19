import { UserInputs } from './../types/userInputs.type';
import { LaserUtils } from './LaserUtils.class';
import { InvaderUtils } from './InvaderUtils.class';
import { ShipUtils } from './ShipUtils.class';
import { Laser } from './../types/laser.type';
import { Ship } from './../types/ship.type';
import { appSettings } from './../app.setting';
import { Invader } from './../types/invader.type';
import { Board } from './../types/board.type';
import * as _ from 'lodash';

// this class contains static methods used to manage a Board (creation, update, ...)
export class BoardUtils {

    // this function create a board in its initial state
    static init(): Board {
        // TODO : create a util class to manage the invaderColums
        const invaderColumns = _.times(appSettings.invader_column.number)
                        .map( (val, index) => 
                            Math.floor(appSettings.invader_column.number / 2) === index ? [InvaderUtils.create()] : []
                        );
        return {
            elements: {
                ship: ShipUtils.init(),
                invaders: invaderColumns,
                lasers: {
                    invader: [LaserUtils.create('invader', 50, 50)],
                    ship: [LaserUtils.create('ship', 50, 30)]
                }
            },
            score: 0
        }
    }

    // take as inputs the previous board, the time elapsed between now and the last update
    // and the actions of the user, and return an new board
    public static updateBoard(oldBoard: Board, elapsedTime: number, userInputs: UserInputs): Board {

        let newBoard: Board = oldBoard; // TODO make a deep copy ?

        // used to move all the elements according to their speed
        this.moveBoardElements(newBoard, elapsedTime, userInputs.shipMoves);

        // delete the elements which are outside the board

        //detect collisions : collision between a ship and a laser, an invader and a laser,
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

        return newBoard;
    }

    // ! this function directly change the value of the board argument (passed as reference)
    public static moveBoardElements(board: Board, elapsedTime: number, shipMoves: 'left' | 'right' | null): void {
        // --- ship moves ----
        if (shipMoves) {
            board.elements.ship = ShipUtils.move(board.elements.ship, elapsedTime, shipMoves);
        }
        
        // --- invaders moves --- 
        // TODO : i could probably add a move function in columnUntil
        board.elements.invaders = board.elements.invaders.map(
            column => column.map(invader => 
                InvaderUtils.move(invader, elapsedTime)
        ));

        // ---- lasers moves ----
        board.elements.lasers.invader = board.elements.lasers.invader.map(
            laser => LaserUtils.move(laser, elapsedTime, 'bottom')
        )
        board.elements.lasers.ship = board.elements.lasers.ship.map(
            laser => LaserUtils.move(laser, elapsedTime, 'top')
        )
    }
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