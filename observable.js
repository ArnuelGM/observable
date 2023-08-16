const delay = (secods) => new Promise((r) => setTimeout(() => r(), secods))

function Observable() {
  Observable.prototype.listeners = {}
}
Observable.prototype.subscribe = function(func) {
  const listenerID = crypto.randomUUID()
  this.listeners[listenerID] = func
  if(typeof this.principal === 'function') this.principal(this)
  return {
    unsubscribe: () => {
      const { [listenerID]: id, ...rest } = this.listeners
      this.listeners = rest
    }
  }
}
Observable.prototype.next = function(data) {
  for(const listenerID in this.listeners) {
    this.listeners[listenerID](data)
  }
}

// -------------------------------------------------------------

const observable = new Observable()

const s1 = observable.subscribe((data) => {
  console.log({s1: data})
})

// Listen -> s only
observable.next('hello')
await delay(1000)

const s2 = observable.subscribe((data) => {
  console.log({s2: data})
})

// Listen -> s and w
observable.next('world')
await delay(1000)

s1.unsubscribe()

// Listen -> w only
observable.next('adios')
await delay(1000)

s2.unsubscribe()

// Listen -> none
observable.next('hola mundooooo')
console.log(observable.listeners) // -> {}