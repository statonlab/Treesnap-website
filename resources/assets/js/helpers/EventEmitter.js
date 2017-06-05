class EventEmitter {
    emit(type) {
        let event
        if (document.createEvent) {
            event = new Event(type)
            document.dispatchEvent(event)
        } else {
            event = document.createEventObject()
            document.fireEvent('on' + type, event)
        }
    }

    listen(type, callback) {
        document.addEventListener(type, callback)
    }
}

export default new EventEmitter()