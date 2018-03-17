enum Speed {
  slow,
  medium,
  fast,
}

class Food {}

abstract class Animal {
  protected speed: number;
  abstract eat(param);
  protected consume(p: Food) {
    console.log(`consumed ${p}`);
  }
}

abstract class Human extends Animal {
  constructor() {
    super();
    this.speed = Speed.slow;
  }
  abstract talk(param);
}

export class Bob extends Human {
  constructor() {
    super();
  }
  eat(food: Food[]) {
    food.forEach((f: Food) => this.consume(f));
  }
  talk(message: string) {
    console.log(`Hi! ${message}`);
    return message;
  }
  clone() { // no support
    return new Bob();
  }
}

let bob; // no support
bob = new Bob();
// without these method invocations
// typewiz will not know what types to apply
bob.talk('My name is Bob');
// bob.eat(['apple', 'orange']);
// typewiz is smart enough to provide a union type
// if the array has mixed types (Array<string|number>)
// bob.eat(['apple', 4]);
// what about custom types? yes!
bob.eat([new Food(), new Food()]);
bob.clone();
