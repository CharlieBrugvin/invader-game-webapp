import { defaultSetting } from './../device_settings/default.setting';
import { desktopSettings } from './../device_settings/desktop.setting';
import { mobileSetting } from './../device_settings/mobile_portrait.setting';
import { Injectable } from '@angular/core';

@Injectable()
export class SettingService {

  public settings;

  constructor() { }

  public setSettings(type: 'mobile' | 'desktop') {
    if (type === 'mobile') {
      console.log('mobile')
      this.settings = mobileSetting;
    } else {
      console.log('desktop')
      this.settings = desktopSettings;
    }
  }
 

  public getSettings() {
    return this.settings;
  }



}
