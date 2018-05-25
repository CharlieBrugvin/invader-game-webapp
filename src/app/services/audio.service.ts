import { Injectable } from '@angular/core';

@Injectable()
export class AudioService {

  assetsPath = '../../../assets/audio/';7

  private createAudioObject(audioFile: string) {
    const obj = new Audio();
    obj.src = this.assetsPath + audioFile;
    obj.load();
    return obj;
  }

  public playShipShot() {
    this.createAudioObject('ship_shot.wav').play();
  }

  public playInvaderShot() {
    this.createAudioObject('invader_shot.wav').play();
  }
  
  public playInvaderKilled() {
    this.createAudioObject('invader_killed.wav').play();
  }


}
