const strGen = require("./mist/randomTextGen");

class State {
  #id = strGen(7);
  data = {};
  current;
  #states;
  constructor(...states) {
    this.current = states[0];
    this.#states = states;
    for (let i = 0; i < this.#states.length; i++) {
      const el = this.#states[i];
      if (this[el]) {
        throw new Error(`${el} key exist pls use another name`);
      }
      this[el] = this.#id + el;
      this.data[el] = undefined;
    }
  }
  next() {
    // console.log(this.#states.findIndex(el=>el===this.current)++);
    let i = this.#states.findIndex((el) => el === this.current);
    i++;
    if (i < this.#states.length) {
      this.current = this.#states[i];
    } else throw new Error("Next state is not exist");
  }
  end() {
    this.data = {};
    this.current = "";
    this.#states = {};
    for (let i = 0; i < this.#states.length; i++) {
      const el = this.#states[i];
    }
  }
  set setData(data) {
    // this.#currentDate = data;
    this.data[this.current] = data;
  }
}

// const newState = new State("name", "fname", "age");
// newState.setData = ["hello"];
// newState.next();
// newState.setData = "salom";
// newState.next();
// newState.setData = 32;
// // newState.next();
// console.log(newState);
// newState.end();
// console.log(newState);
// console.log(newState.name);
// console.log(newState.fname);
// console.log(newState.age);
// console.log(newState);

module.exports = State;
