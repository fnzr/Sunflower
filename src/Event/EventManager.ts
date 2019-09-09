import _ from "lodash";

export class GameEvent {

    repeat: number;
    repeatTime: number;
    fn: () => void;

    constructor(fn: () => void, repeat = 0, repeatTime = -1) {
        this.repeat = repeat;
        this.repeatTime = repeatTime;
        this.fn = fn;
    }

    execute() {
        this.fn();
    }
}


export default class EventManager {

    events: { [step: number]: GameEvent[] } = {};
    timers: number[] = [];

    private addTimer(time: number) {
        const index = _.sortedIndexBy(this.timers, time, o => -o);
        this.timers.splice(index, 0, time);
    }

    get nextTimer() {
        return this.timers[this.timers.length - 1];
    }

    addEvent(step: number, event: GameEvent) {
        if (!(step in this.events)) {
            this.events[step] = []
            this.addTimer(step);
        }
        this.events[step].push(event);
    }

    execute(currentTime: number) {
        while (currentTime >= this.nextTimer) {
            const time = this.timers.pop();
            if (time === undefined) {
                return;
            }
            this.events[time].forEach(event => {
                event.execute();
                if (event.repeat > 0) {
                    event.repeat--;
                    this.addEvent(time + event.repeatTime, event);
                }
            })
            delete this.events[time];
        }
    }
}