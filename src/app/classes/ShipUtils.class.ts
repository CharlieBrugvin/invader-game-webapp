import { EventsUtils } from "./EventsUtils.class";
import { LaserUtils } from "./LaserUtils.class";
import { Laser } from "./../types/laser.type";
import { Ship } from "./../types/ship.type";

export class ShipUtils {
  // create a default ship, in its initial state
  public static init(appSettings): Ship {
    return {
      position: {
        "bottom.%": 0.5, // NOTE: do i put it in the settings ?
        "left.%": 50 - appSettings.ship.size["width.%"] / 2
      },
      size: {
        "width.%": appSettings.ship.size["width.%"],
        "height.%": appSettings.ship.size["height.%"]
      },
      speed: appSettings.ship.speed,
      life: 100,

      events: EventsUtils.addEvent(appSettings, {}, 'ship', 'isCreated')
    };
  }

  // move a ship to the right or the left according to a given period in ms
  // it's position is bounded
  public static move(appSettings, ship, elapsedTimeMs, direction: "right" | "left"): Ship {
    // calculation of the new left position
    let newLeftPos = ship.position["left.%"];
    if (direction === "left") {
      newLeftPos -= ship.speed * elapsedTimeMs;
    } else if (direction === "right") {
      newLeftPos += ship.speed * elapsedTimeMs;
    }

    // is the ship outside ?
    newLeftPos = newLeftPos < 0 ? 0 : newLeftPos;
    newLeftPos =
      newLeftPos > 100 - appSettings.ship.size["width.%"]
        ? 100 - appSettings.ship.size["width.%"]
        : newLeftPos;

    // events 
    const newEvents =
      direction === "left"
        ? EventsUtils.addEvent(appSettings, ship.events, "ship", "isGoingLeft")
        : EventsUtils.addEvent(appSettings, ship.events, "ship", "isGoingRight");
    return {
      ...ship,
      position: {
        ...ship.position,
        "left.%": newLeftPos,
      },
      events: newEvents
    };
  }

  // generate a ship laser according to the ship position
  public static newLaser( appSettings, ship: Ship): Laser {
    return LaserUtils.create(
       appSettings,
      "ship",
      100 - ship.position["bottom.%"] - ship.size["height.%"],
      ship.position["left.%"] + ship.size["width.%"] / 2
    );
  }
}
