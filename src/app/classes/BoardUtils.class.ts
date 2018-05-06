import { Invader } from './../types/invader.type';
import { Board } from './../types/board.type';

// this class contains static methods used to manage a Board (creation, update, ...)
// contains only pure functions
export class BoardUtils {

    // this function a board in its initial state
    // describe in the settings (app.setting.ts)
    /*
    static createBoard(): Board {
       
    }
    */

    // take as inputs the previous board, the time elapsed between now and the last update
    // and the actions of the user
    updateBoard(oldBoard: Board, elapsedTime: number, input: Input) {
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

        // update the score
    }

}

interface Input {
    shipMoves: 'left' | 'right',
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