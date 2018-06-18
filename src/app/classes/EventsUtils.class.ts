export class EventsUtils {
    
    public static updateEventsTime(eventList, elapsedTime: number) {
        const newList = {};

        for(let key in eventList) {
            const  newRemainingTime = eventList[key] - elapsedTime;
            if (newRemainingTime > 0)
                newList[key] = newRemainingTime;   
        }
        return newList;
    }

    // NOTE: eventName MUST be in appSettings.events.
    public static addEvent(appSettings, eventList, element, eventName) {
        
        if (!eventList[eventName]) {
            return {
                ...eventList,
                [eventName]: appSettings.eventsRemainingTime[element][eventName]
            }
        } else {
            return {
                ...eventList
            }
        }
    }
}