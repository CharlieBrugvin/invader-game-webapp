export interface Laser {
    position: {
        'top.%': number,
        'left.%': number
    };
    size: {
        'height.%': number,
        'width.%': number
    }
    speed: number;
    damage: number;
    insideBoard: boolean;
    destroyed: boolean;
}