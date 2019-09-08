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

    addEvent(step: number, event: GameEvent) {
        if (!(step in this.events)) {
            this.events[step] = []
        }
        this.events[step].push(event);
    }

    execute(step: number) {
        if (step in this.events) {
            this.events[step].forEach(event => {
                event.execute();
                if (event.repeat > 0) {
                    event.repeat--;
                    this.addEvent(step + event.repeatTime, event);
                }
            })
            delete this.events[step];
        }
    }
}