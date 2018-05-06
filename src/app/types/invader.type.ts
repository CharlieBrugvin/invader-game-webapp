export interface Invader {
    position: {
        'top.%': number,
        'left.%': number
    };
    speed: number;
    life: number;
    outside: boolean;
}