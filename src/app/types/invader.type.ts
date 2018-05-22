export interface Invader {
    'top.%': number;
    columnIndex: number;
    'height.%': number;
    speed: number;
    life: number;
    insideBoard: boolean;
    isCountedAsDeath: boolean;
    events: {};
}