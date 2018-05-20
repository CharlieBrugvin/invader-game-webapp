import { RandomUtils } from "./randomUtils.class";
import { LaserUtils } from "./LaserUtils.class";
import { Laser } from "./../types/laser.type";
import { appSettings } from "./../app.setting";
import { Invader } from "./../types/invader.type";

// toolbox used to update an invader
export class InvaderUtils {
  // create an invader with a given top value
  // default top value is just above the board
  public static create(
    columnIndex: number,
    topPercent: number = -appSettings.invader["height.%"]
  ): Invader {
    return {
      "top.%": topPercent,
      "height.%": appSettings.invader["height.%"],
      columnIndex,
      speed: RandomUtils.getFloat(
        appSettings.invader.speed.min,
        appSettings.invader.speed.max
      ),
      life: 100,
      insideBoard: true
    };
  }

  // move an invader according to a period in ms
  // it only moves if the invader is inside the board
  public static move(invader: Invader, elapsedTimeMs: number): Invader {
    if (!invader.insideBoard) {
      return invader;
    }
    const newTop = invader["top.%"] + invader.speed * elapsedTimeMs;
    const newInSideBoard = newTop > 100 ? false : true;
    return {
      ...invader,
      "top.%": newTop,
      insideBoard: newInSideBoard
    };
  }

  // generate a ship laser according to the ship position
  public static newLaser(invader: Invader): Laser {
    // we calculate the invader left pos with its column index
    const columnWidth = 100 / appSettings.invader_column.number;
    const invaderLeftPos = invader.columnIndex * columnWidth;

    return LaserUtils.create(
      "invader",
      invader["top.%"],
      invaderLeftPos + columnWidth / 2
    );
  }
}
