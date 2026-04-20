/// parking lot

class Vehicle {
  constructor(number, type) {
    this.number = number;
    this.type = type;
  }
}

class ParkingSpot {
  constructor(id, type) {
    this.id = id;
    this.type = type;
    this.isOccupied = false;
  }

  assignVehicle(vehicle) {
    if (this.isOccupied || this.type !== vehicle.type) {
      throw new Error("Spot unavailable");
    }
    this.vehicle = vehicle;
    this.isOccupied = true;
  }

  removeVehicle() {
    this.vehicle = null;
    this.isOccupied = false;
  }
}

class Ticket {
  constructor(vehicle, spot) {
    this.vehicle = vehicle;
    this.spot = spot;
    this.entryTime = Date.now();
  }
}

class PricingStrategy {
  calculate(entryTime) {
    const hours = Math.ceil((Date.now() - entryTime) / (1000 * 60 * 60));
    return hours * 20;
  }
}

class ParkingLot {
  constructor(spots) {
    this.spots = spots;
    this.pricing = new PricingStrategy();
  }

  park(vehicle) {
    const spot = this.spots.find(
      s => !s.isOccupied && s.type === vehicle.type
    );
    if (!spot) throw new Error("No spots available");

    spot.assignVehicle(vehicle);
    return new Ticket(vehicle, spot);
  }

  unpark(ticket) {
    const fee = this.pricing.calculate(ticket.entryTime);
    ticket.spot.removeVehicle();
    return fee;
  }
}

// Why interviewers like this?

// Because it checks:

// abstraction
// strategy pattern
// extensibility
// OOP modeling
// Interview Follow-up:

// How to support dynamic pricing?

// Answer:

// Use Strategy Pattern:



class WeekendPricing extends PricingStrategy {
  calculate(entryTime) {
    return super.calculate(entryTime) * 1.5;
  }
}


//This follows Open/Closed Principle.


