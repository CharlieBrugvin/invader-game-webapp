export class RandomUtils {

    public static getFloat(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }
}