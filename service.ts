import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';
import { Bob } from './app';

export class AnimalService {
  public animals$ = new Subject();
  public setAnimals(animals) {
    this.animals$.next(animals);
  }
  public getAnimals() {
    return this.animals$;
  }
  // won't be fixed
  public getAnimalChat() {
    return this.getAnimals().pipe(
      take(1),
      map(animals => { // won't be fixed
        return animals.map(animal => animal.talk('Hello!'));
      }),
    )
  }
}

const animalService = new AnimalService();

const animals$ = animalService.getAnimals().pipe(
  map(a => a[0]),
).subscribe(animal => console.log(animal));

animalService.setAnimals([
  new Bob(),
]);

animalService.getAnimalChat().subscribe();
