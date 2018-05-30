import { defaultSetting } from './default.setting';
export const mobileSetting = defaultSetting;

//override of the settings
mobileSetting.invader_column.number = 5;

mobileSetting.ship.size['width.%'] = 100 / 5;

mobileSetting.laser_invader.size['width.%'] = 1.5;
mobileSetting.laser_invader.size['height.%'] = 3;

mobileSetting.laser_ship.size['width.%'] = 2;
mobileSetting.laser_ship.size['height.%'] = 3;


