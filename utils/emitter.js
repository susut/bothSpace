export default class Emitter {
  constructor() {
    this.events = {}
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  emit(eventName, payload) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        callback(payload)
      })
    }
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      const index = this.events[eventName].findIndex(cb => cb === callback);
      if (index > -1) {
        this.events[eventName].splice(index, 1);
      }
    }
  }
}