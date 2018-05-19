export interface Ship {
    position: {
        'bottom.%': number;
        'left.%': number
    };
    size: {
        'width.%': number;
        'height.%': number
    }
    speed: number;
    life: number;
}