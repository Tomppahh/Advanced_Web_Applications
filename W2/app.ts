console.log("Hello World!");


type TVehicle = {
  model: string;
  color: string;
  year: number;
  power: number;
};

const vehicle: TVehicle = {
  model: "Boring generic vehicle",
  color: "Red",
  year: 1993,
  power: 60
};
console.log(vehicle);

interface IVehicle extends TVehicle {}

interface ICar extends IVehicle {
  bodyType: string;
  wheelCount: number;
}

interface IBoat extends IVehicle {
  draft: number;
}

interface IPlane extends IVehicle {
  wingspan: number;
}

const car: ICar = {
  model: "Ford focus",
  color: "Green",
  year: 2016,
  power: 150,
  bodyType: "Hatchback",
  wheelCount: 4
};

const plane: IPlane = {
  model: "Boeing 777",
  color: "White",
  year: 2020,
  power: 170000,
  wingspan: 65
};

const boat: IBoat = {
  model: "Bella",
  color: "Black",
  year: 2022,
  power: 100,
  draft: 0.42
};

console.log(car, plane, boat);

class VehicleService<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  list(): T[] {
    return this.items;
  }
}

const cars = new VehicleService<ICar>();
cars.add(car);

const boats = new VehicleService<IBoat>();
boats.add(boat);

console.log(cars.list());
console.log(boats.list());
