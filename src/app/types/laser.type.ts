export interface Laser {
    position: {
        'top.%': number,
        'left.%': number
    };
    speed: number;
    damage: number;
    exists: boolean;
}