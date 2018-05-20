import { appSettings } from "./../app.setting";
import { InvaderUtils } from "./InvaderUtils.class";
import { Invader } from "./../types/invader.type";
import * as _ from "lodash";

// this class contains tools to manage invaderColumns

export class InvaderColumnUtils {
  // return an array of empty arrays
  // according to the appsettings
  public static initEmpty(): Invader[][] {
    return _.times(appSettings.invader_column.number).map(val => []);
  }

  // this methods adds an invader in a random column
  // if no column index is givern, add to a random one
  public static addInvader(
    invaders: Invader[][],
    columnIndex: number = null
  ): Invader[][] {
    //find a random column if not given
    if (!columnIndex) {
      columnIndex = Math.floor(Math.random() * invaders.length);
    }

    let newInvaders = invaders.map(
      (column, index) =>
        index === columnIndex ? this.addInvaderToColumn(index, column) : column
    );

    return newInvaders;
  }

  public static addInvaderToColumn(columnIndex: number, column: Invader[]): Invader[] {
    // we find the the topest invader
    let invaderTopest: number = 0;
    column.forEach(invader => {
      if (invader["top.%"] < invaderTopest) invaderTopest = invader["top.%"];
    });

    //we add a new one on top of it
    return [
      ...column,
      InvaderUtils.create(columnIndex, invaderTopest - appSettings.invader["height.%"] - 1)
    ];
  }
}
