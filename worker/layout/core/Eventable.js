
// export default class Eventable {
//   constructor() {
//     this.handler = [];
//   }
// }
class CTest1 {
  constructor() {
    this.name = 'CTest1';
  }
}

// const calculatorMixin = Base => class extends Base {
//   calc() {
//     console.log(this);
//   }
// };

const randomizerMixin = Base => class extends Base {
  constructor() {
    super();
    this.minx = '123';
  }
  randomize() {
    console.log(this);
  }
};

export default class CTest extends randomizerMixin(CTest1) {
  constructor() {
    super();
    console.log(this);
  }
}
