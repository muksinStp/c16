class Tyre {
  constructor(brand, size) {
      this.brand = brand;
      this.size = size;
  }
}

class SmallTyre extends Tyre { // inheritance
  constructor(brand) {
      super(brand, 15); // SmallTyre 15 inch
  }
}

class LargeTyre extends Tyre { // inheritance
  constructor(brand) {
      super(brand, 17); // LargeTyre 17 inch
  }
}

class Car {
  constructor(variant, tyre, doors, seats, year) {
      this.variant = variant;
      this.tyre = tyre;
      this.doors = doors;
      this.seats = seats;
      this.year = year;
      this.sn = CarFactory.generateSerialNumber();
      this.warranty = this.calculateWarranty(); // Menghitung garansi
  }

  // Method untuk menghitung garansi berdasarkan ukuran ban
  calculateWarranty() {
      return this.tyre.size === 17 ? 3 : 1;
  }

}
class Agya extends Car {
  constructor(year) {
      super('Agya', new SmallTyre('dunlop'), 5, 5, year);
  }
}

class Rush extends Car {
  constructor(year) {
      super('Rush', new LargeTyre('bridgestone'), 5, 5, year);
  }
}

class CarFactory {
  constructor() {
      this.cars = []; // List untuk menyimpan mobil yang sudah diproduksi
  }

  // Static method untuk menghasilkan serial number
  static generateSerialNumber() {
      function randomSegment(length) {
          return Math.random().toString(16).slice(2, 2 + length);
      }  
      const part1 = randomSegment(8);  // Bagian pertama: 8 karakter
      const part2 = randomSegment(4);  // Bagian kedua: 4 karakter
      const part3 = randomSegment(4);  // Bagian ketiga: 4 karakter
      const part4 = randomSegment(4);  // Bagian keempat: 4 karakter
      const part5 = randomSegment(12); // Bagian kelima: 12 karakter

      // Menggabungkan semua bagian dengan tanda hubung
      return `${part1}-${part2}-${part3}-${part4}-${part5}`;
  }
  
  static randomYear() {
      // Menghasilkan tahun acak antara 2020 dan 2022
      const years = [2020, 2022];
      const randomIndex = Math.floor(Math.random() * years.length);
      return years[randomIndex];
  }
  
  produce() {
      const variants = [Agya, Rush];

      for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * variants.length);
          const SelectedCar = variants[randomIndex]; // Pilih kelas varian mobil 
          const year = CarFactory.randomYear(); // Menghasilkan tahun acak (2020 atau 2022)
          const car = new SelectedCar(year); // Buat objek mobil dari kelas varian
          this.cars.push(car);
      }
  }

  result() {
      console.log(`Hasil Produksi :`);
      this.cars.forEach((car, index) => {
          console.log(`no. ${index + 1}`);
          console.log(`varian  : ${car.variant}`);
          console.log(`sn      : ${car.sn}`);
          console.log(`door    : ${car.doors}`);
          console.log(`seat    : ${car.seats} Seater`);
          console.log(`tyre    : ${car.tyre.brand} ${car.tyre.size} inch`);
          console.log(`year    : ${car.year}`);
          console.log(`warranty: ${car.warranty} year\n`);
      });
  }

  guaranteeSimulation(simulationYear) {
      console.log(`\nHasil Simulasi Garansi Semua Mobil pada Tahun ${simulationYear} :\n`);
      this.cars.forEach((car, index) => {
          const carAge = simulationYear - car.year;
          const warrantyStatus = carAge > car.warranty ? 'Expired' : 'Active';

          console.log(`no. ${index + 1}`);
          console.log(`varian  : ${car.variant}`);
          console.log(`sn      : ${car.sn}`);
          console.log(`door    : ${car.doors}`);
          console.log(`seat    : ${car.seats} Seater`);
          console.log(`tyre    : ${car.tyre.brand} ${car.tyre.size} inch`);
          console.log(`year    : ${car.year}`);
          console.log(`warranty: ${car.warranty} year`);
          console.log(`status on ${simulationYear}: this guarantee status is ${warrantyStatus}\n`);
      });
  }
}

const toyota = new CarFactory();
toyota.produce(2020);
toyota.produce(2022);

toyota.result();
toyota.guaranteeSimulation(2025);
