import { defaultSetting } from './default.setting';
export const mobileSetting = defaultSetting;

//override of the settings
mobileSetting.invader_column.number = 6;
mobileSetting.invader['height.%'] = 7;

mobileSetting.ship.size['width.%'] = 100 / 6;
mobileSetting.ship.size['height.%'] = 7;

mobileSetting.laser_invader.size['width.%'] = 2;
mobileSetting.laser_invader.size['height.%'] = 4;

mobileSetting.laser_ship.size['width.%'] = 2;
mobileSetting.laser_ship.size['height.%'] = 3;


