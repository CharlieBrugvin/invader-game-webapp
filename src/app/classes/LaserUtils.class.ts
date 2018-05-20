import { RandomUtils } from "./randomUtils.class";
import { appSettings } from "./../app.setting";
import { Laser } from "./../types/laser.type";

// toolbox to transform a laser
export class LaserUtils {
  // used to create a laser with the defaults values at the given position
  // note : the centerLeftPercent is the left position of the laser vertical axe
  // (and not the top left corner)
  public static create(
    type: "ship" | "invader",
    topPercent: number,
    centerLeftPercent: number
  ): Laser {
    if (type === "ship") {
      return {
        position: {
          "top.%": topPercent,
          "left.%":
            centerLeftPercent - appSettings.laser_ship.size["width.%"] / 2
        },
        size: {
          ...appSettings.laser_ship.size
        },
        speed: RandomUtils.getFloat(
          appSettings.laser_ship.speed.min,
          appSettings.laser_ship.speed.max
        ),
        damage: appSettings.laser_ship.damages,
        insideBoard: true,
        destroyed: false
      };
    } else {
      return {
        position: {
          "top.%": topPercent,
          "left.%":
            centerLeftPercent - appSettings.laser_invader.size["width.%"] / 2
        },
        size: {
          ...appSettings.laser_invader.size
        },
        speed: RandomUtils.getFloat(
            appSettings.laser_invader.speed.min,
            appSettings.laser_invader.speed.max
          ),
        damage: appSettings.laser_invader.damages,
        insideBoard: true,
        destroyed: false
      };
    }
  }

  // move a laser according to a period of time in ms
  // the laser will only move  if it is inside the board
  public static move(
    laser: Laser,
    elapsedTimeMs: number,
    direction: "top" | "bottom"
  ): Laser {
    if (!laser.insideBoard) {
      return laser;
    }
    const newTop =
      laser.position["top.%"] +
      (direction === "top"
        ? -elapsedTimeMs * laser.speed
        : +elapsedTimeMs * laser.speed);

    const newInSideBoard =
      newTop > 100 || newTop + laser.size["height.%"] < 0 ? false : true;

    return {
      ...laser,
      position: {
        ...laser.position,
        "top.%": newTop
      },
      insideBoard: newInSideBoard
    };
  }
}
