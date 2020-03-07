
import range from "./range";
import { isToday } from "./time";

describe("isToday()", () => {

    test("should return true if given identical dates", () => {
        const now = new Date();
        expect(isToday(now, now)).toBeTruthy();
    });

    test("does not require the now argument", () => {
        expect(isToday(new Date())).toBeTruthy();
    });

    test("should return false if the provided date is yesterday", () => {
        const now = new Date();
        const date = new Date();
        date.setDate(now.getDate() - 1);

        expect(isToday(date, now)).toBeFalsy();
    });

    test("should return false if the provided date is tomorrow", () => {
        const now = new Date();
        const date = new Date();
        date.setDate(now.getDate() + 1);

        expect(isToday(date, now)).toBeFalsy();
    });

    describe("should return true if the date is on the same day as today", () => {

        const createDate = (hour: number) => {
            const year = 1983;
            const month = 7;
            const day = 12;
            return new Date(year, month, day, hour);
        };

        for (const hour of range(24)) {
            for (const nowHour of range(24)) {
                test(`date is ${hour} o'clock, now is ${nowHour} o'clock`, () => {
                    const now = createDate(nowHour);
                    const date = createDate(hour);
                    expect(isToday(date, now)).toBeTruthy();
                });
            }
        }

    });

});
