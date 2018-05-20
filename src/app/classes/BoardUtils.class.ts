import { InvaderColumnUtils } from "./InvaderColumns.class";
import { element } from "protractor";
import { ControlCalcComponent } from "./../components/game/control-calc/control-calc.component";
import { UserInputs } from "./../types/userInputs.type";
import { LaserUtils } from "./LaserUtils.class";
import { InvaderUtils } from "./InvaderUtils.class";
import { ShipUtils } from "./ShipUtils.class";
import { Laser } from "./../types/laser.type";
import { Ship } from "./../types/ship.type";
import { appSettings } from "./../app.setting";
import { Invader } from "./../types/invader.type";
import { Board } from "./../types/board.type";
import * as _ from "lodash";

// this class contains static methods used to manage a Board (creation, update, ...)
export class BoardUtils {
  // this function create a board in its initial state
  // one invader is generated
  static init(invadersAmount: number = 1): Board {
    let invaderColumns = InvaderColumnUtils.initEmpty();
    for (let i = 0; i < invadersAmount; i++) {
      invaderColumns = InvaderColumnUtils.addInvader(invaderColumns);
    }

    return {
      elements: {
        ship: ShipUtils.init(),
        invaders: invaderColumns,
        lasers: {
          invader: [LaserUtils.create("invader", 50, 50)],
          ship: [LaserUtils.create("ship", 50, 30)]
        }
      },
      score: 0
    };
  }

  // take as inputs the previous board, the time elapsed between now and the last update
  // and the actions of the user, and return an new board
  public static updateBoard(
    oldBoard: Board,
    elapsedTime: number,
    userInputs: UserInputs
  ): Board {
    let newBoard: Board = oldBoard;

    // ----- moving elements -----

    // used to move all the elements according to their speed
    this.moveBoardElements(newBoard, elapsedTime, userInputs.shipMoves);

    // catch the amount invaders outside
    let amountOfInvadersOutside = 0;
    newBoard.elements.invaders.forEach(column =>
      column.forEach(invader => {
        if (!invader.insideBoard) amountOfInvadersOutside++;
      })
    );

    // delete the elements outside the board
    this.deleteElementsOutside(newBoard);

    // ----- collisions -------

    // detect and apply the changes on element collisions
    this.applyCollisions(newBoard);

    // catch the amount of invaders dead
    let amountOfInvadersDead = 0;
    newBoard.elements.invaders.forEach(column =>
      column.forEach(invader => {
        if (invader.life <= 0) amountOfInvadersDead++;
      })
    );

    // delete the laser destroyed and the invader deads
    this.deleteElementsDeads(newBoard);

    // ----- generation of new elements ------

    // generate one or two invader if one was killed
    if (amountOfInvadersDead > 0) {
      newBoard.elements.invaders = InvaderColumnUtils.addInvader(
        newBoard.elements.invaders
      );
      if (Math.random() < appSettings.invader.probabity_creation) {
        newBoard.elements.invaders = InvaderColumnUtils.addInvader(
          newBoard.elements.invaders
        );
      }
    }

    // ship shoot a laser
    if (userInputs.shipShoot) {
      newBoard.elements.lasers.ship.push(
        ShipUtils.newLaser(newBoard.elements.ship)
      );
    }

    // an invader shoot a laser
    newBoard.elements.invaders.forEach(column =>
      column.forEach(invader => {
        if (Math.random() < appSettings.invader.probability_shooting * elapsedTime) {
            console.log('invader shoot')
          newBoard.elements.lasers.invader.push(InvaderUtils.newLaser(invader));
        }
      })
    );

    // -------- update the score -------- 
    newBoard.score += appSettings.points.invader_killed * amountOfInvadersDead;
    newBoard.score +=
      appSettings.points.invader_went_outside * amountOfInvadersOutside;

    return newBoard;
  }

  // ! this function directly change the value of the board argument (passed as reference)
  public static moveBoardElements(
    board: Board,
    elapsedTime: number,
    shipMoves: "left" | "right" | null
  ): void {
    // --- ship moves ----
    if (shipMoves) {
      board.elements.ship = ShipUtils.move(
        board.elements.ship,
        elapsedTime,
        shipMoves
      );
    }
    // --- invaders moves ---
    board.elements.invaders = board.elements.invaders.map(column =>
      column.map(invader => InvaderUtils.move(invader, elapsedTime))
    );
    // ---- lasers moves ----
    board.elements.lasers.invader = board.elements.lasers.invader.map(laser =>
      LaserUtils.move(laser, elapsedTime, "bottom")
    );
    board.elements.lasers.ship = board.elements.lasers.ship.map(laser =>
      LaserUtils.move(laser, elapsedTime, "top")
    );
  }

  // directly changes the board passed by reference
  public static deleteElementsOutside(board: Board): void {
    board.elements = {
      ...board.elements,
      invaders: board.elements.invaders.map(column =>
        column.filter(invader => {
          return invader.insideBoard;
        })
      ),
      lasers: {
        invader: board.elements.lasers.invader.filter(
          laser => laser.insideBoard
        ),
        ship: board.elements.lasers.ship.filter(laser => laser.insideBoard)
      }
    };
  }

  // TODO i could split this funciton into sub methods in files such as collisionUtils.class.ts
  public static applyCollisions(board: Board): void {
    // find collisions between laser ships and invaders
    board.elements.lasers.ship
      .filter(laser => !laser.destroyed)
      .forEach(laser => {
        // find the corresponding invader column
        const laserPosLeft =
          laser.position["left.%"] + laser.size["width.%"] / 2;
        const columnIndex = Math.floor(
          laserPosLeft / (100 / appSettings.invader_column.number)
        );
        // find an eventual colision between the laser and an invader of this column
        const invaderCollided = board.elements.invaders[columnIndex].find(
          invader => {
            return (
              invader["top.%"] + invader["height.%"] > laser.position["top.%"]
            );
          }
        );
        // apply the damages
        if (invaderCollided) {
          invaderCollided.life -= laser.damage;
          laser.destroyed = true;
        }
      });

    // detect collision between invader lasers and ships
    board.elements.lasers.invader
      .filter(laser => !laser.destroyed)
      .forEach(laser => {
        // calculate the point on the bottom center of the laser
        const laserTop = laser.position["top.%"] + laser.size["height.%"];
        const laserLeft = laser.position["left.%"] + laser.size["width.%"] / 2;
        // and the positions of the ship
        const shipTop =
          100 -
          board.elements.ship.position["bottom.%"] -
          board.elements.ship.size["height.%"];
        const shipLeftBorderLeft = board.elements.ship.position["left.%"];
        const shipRightBorderLeft =
          board.elements.ship.position["left.%"] +
          board.elements.ship.size["width.%"];

        if (
          laserTop > shipTop &&
          shipLeftBorderLeft < laserLeft &&
          laserLeft < shipRightBorderLeft
        ) {
          // apply damages is the boxes are in collision
          laser.destroyed = true;
          board.elements.ship.life -= laser.damage;
        }
      });
  }

  // delete all the laser destroyed and the invader with a life < 0
  public static deleteElementsDeads(board: Board): void {
    board.elements = {
      ...board.elements,
      lasers: {
        invader: board.elements.lasers.invader.filter(
          laser => !laser.destroyed
        ),
        ship: board.elements.lasers.ship.filter(laser => !laser.destroyed)
      },
      invaders: board.elements.invaders.map(column =>
        column.filter(invader => invader.life > 0)
      )
    };
  }
}
