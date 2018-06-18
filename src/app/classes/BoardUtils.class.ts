import { EventsUtils } from "./EventsUtils.class";
import { InvaderColumnUtils } from "./InvaderColumns.class";
import { UserInputs } from "./../types/userInputs.type";
import { LaserUtils } from "./LaserUtils.class";
import { InvaderUtils } from "./InvaderUtils.class";
import { ShipUtils } from "./ShipUtils.class";
import { Board } from "./../types/board.type";
import * as _ from "lodash";

// this class contains static methods used to manage a Board (creation, update, ...)
export class BoardUtils {

  // this function create a board in its initial state
  // one invader is generated
  static init(appSettings, invadersAmount: number = 1): Board {

      let invaderColumns = InvaderColumnUtils.initEmpty(appSettings);
    for (let i = 0; i < invadersAmount; i++) {
      invaderColumns = InvaderColumnUtils.addInvader(appSettings, invaderColumns);
    }

    return {
      elements: {
        ship: ShipUtils.init(appSettings),
        invaders: invaderColumns,
        lasers: {
          invader: [],
          ship: []
        }
      },
      score: 0,
      events: {},
      gameOver: false
    };
  }

  // take as inputs the previous board, the time elapsed between now and the last update
  // and the actions of the user, and return an new board
  public static updateBoard(
    appSettings,
    oldBoard: Board,
    elapsedTime: number,
    userInputs: UserInputs
  ): Board {
    let newBoard: Board = oldBoard;

    // ----- moving elements -----

    // used to move all the elements according to their speed
    this.moveBoardElements(appSettings, newBoard, elapsedTime, userInputs.shipMoves);

    // catch the amount of invaders outside
    let amountOfInvadersOutside = 0;
    newBoard.elements.invaders.forEach(column =>
      column.forEach(invader => {
        if (!invader.insideBoard) amountOfInvadersOutside++;
      })
    );

    // delete the elements outside the board
    this.deleteElementsOutside(newBoard);

    // TODO decrement the event remaining times
    this.updateRemainingTimeEvents(newBoard, elapsedTime);

    // ----- collisions -------

    // detect and apply the changes on element collisions
    this.applyCollisions(appSettings, newBoard);

    // catch the amount of invaders dead
    let amountOfInvadersDead = 0;
    newBoard.elements.invaders.forEach(column =>
      column.forEach(invader => {
        if (invader.life <= 0 && !invader.isCountedAsDeath) {
          invader.isCountedAsDeath = true;
          amountOfInvadersDead++
        };
      })
    );

    // delete the laser destroyed and the invader deads
    // TODO only if there is no events remaining
    this.deleteElementsDeads(newBoard);

    // ----- generation of new elements ------

    // generate one or two invader if one was killed
    if (amountOfInvadersDead > 0) {
      newBoard.elements.invaders = InvaderColumnUtils.addInvader(
        appSettings,
        newBoard.elements.invaders
      );
      if (Math.random() < appSettings.invader.probabity_creation) {
        newBoard.elements.invaders = InvaderColumnUtils.addInvader(
          appSettings,
          newBoard.elements.invaders
        );
      }
    }

    // ship shoot a laser
    if (userInputs.shipShoot) {
      // add a laser
      newBoard.elements.lasers.ship.push(
        ShipUtils.newLaser(appSettings, newBoard.elements.ship)
      );
      // add the event
      newBoard.elements.ship = {
        ...newBoard.elements.ship,
        events: EventsUtils.addEvent(
          appSettings,
          newBoard.elements.ship.events,
          "ship",
          "isShooting"
        )
      };
    }

    // invader shoot a laser
    newBoard.elements.invaders.forEach(column =>
      column.forEach(invader => {
        if (
          Math.random() <
          appSettings.invader.probability_shooting * elapsedTime
        ) {
          newBoard.elements.lasers.invader.push(InvaderUtils.newLaser(appSettings, invader));
          invader.events = EventsUtils.addEvent(appSettings, invader.events, 'invader', 'isShooting')
        }
      })
    );

    // -------- update the score --------
    if (amountOfInvadersDead > 0) {
      newBoard.score += appSettings.points.invader_killed * amountOfInvadersDead;
      newBoard.events = EventsUtils.addEvent(appSettings, newBoard.events, 'board', 'isGettingPoint');
    }
   
    newBoard.score +=
      appSettings.points.invader_went_outside * amountOfInvadersOutside;

    // game over ?
    if (newBoard.elements.ship.life <= 0) {
      newBoard.gameOver = true;
    }

    return newBoard;
  }

  // ! this function directly change the value of the board argument (passed as reference)
  public static moveBoardElements(
    appSettings,
    board: Board,
    elapsedTime: number,
    shipMoves: "left" | "right" | null
  ): void {
    // --- ship moves ----
    if (shipMoves) {
      board.elements.ship = ShipUtils.move(
        appSettings, 
        board.elements.ship,
        elapsedTime,
        shipMoves
      );
    }
    // --- invaders moves ---
    board.elements.invaders = board.elements.invaders.map(column =>
      column.map(invader => invader.life > 0 ? InvaderUtils.move(invader, elapsedTime): invader)
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
  public static applyCollisions(appSettings, board: Board): void {
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
        const invaderCollided = board.elements.invaders[columnIndex]
          .filter(invader => invader.life > 0)
          .find(
          invader => {
            return (
              invader["top.%"] + invader["height.%"] > laser.position["top.%"]
            );
          }
        );
        // apply the damages
        if (invaderCollided) {
          invaderCollided.life -= laser.damage;

          invaderCollided.events =
            invaderCollided.life < 0
              ? EventsUtils.addEvent(
                  appSettings, 
                  invaderCollided.events,
                  "invader",
                  "isKilled"
                )
              : EventsUtils.addEvent(
                  appSettings, 
                  invaderCollided.events,
                  "invader",
                  "isTouchedByLaser"
                );

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
          board.elements.ship = {
            ...board.elements.ship,
            life: board.elements.ship.life - laser.damage,
            events: EventsUtils.addEvent(
              appSettings, 
              board.elements.ship.events,
              "ship",
              "isTouchedByLaser"
            )
          };
        }
      });
  }

  // delete all the laser destroyed and the invader with a life < 0
  public static deleteElementsDeads(board: Board): void {

    // delete the lasers
    board.elements = {
      ...board.elements,
      lasers: {
        invader: board.elements.lasers.invader.filter(
          laser => !laser.destroyed
        ),
        ship: board.elements.lasers.ship.filter(laser => !laser.destroyed)
      },

      // delete the invader with a life < 0 && with no events
      invaders: board.elements.invaders.map(column =>
        column.filter(invader => !(invader.life < 0 && _.isEmpty(invader.events)))
      )
    };
  }

  public static updateRemainingTimeEvents(board: Board, elapsedTime: number) {
    // update the events of the ship
    board.elements.ship = {
      ...board.elements.ship,
      events: EventsUtils.updateEventsTime(
        board.elements.ship.events,
        elapsedTime
      )
    };
    // and the events of the invaders
    board.elements.invaders = board.elements.invaders.map(column =>
      column.map(invader => {
        return {
          ...invader,
          events:  EventsUtils.updateEventsTime(invader.events, elapsedTime)
        }
      }
    ))
    // and the boards events
    board.events = EventsUtils.updateEventsTime(board.events, elapsedTime);
  }
}
