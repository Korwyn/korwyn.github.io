class Tracker {
	constructor() {
		this.bidding = new Production();
		this.stress = new Production();
		this.raids = new Production();
		this.repairs = new Production();
		this.goods = new Production();
		this.tradingFor = new Production();
		this.tradingWith = new Production();
		this.infantry = new Production({ qty: 0, osr: 2 });
		this.artillery = new Production({ qty: 0, iron: 2, osr: 1 });
		this.tank = new Production({ qty: 0, oil: 1, iron: 2, osr: 1 });
		this.fighter = new Production({ qty: 0, oil: 2, iron: 1, osr: 1 });
		this.bomber = new Production({ qty: 0, oil: 2, iron: 2, osr: 1 });
		this.submarine = new Production({ qty: 0, oil: 1, iron: 2, osr: 1 });
		this.cruiser = new Production({ qty: 0, oil: 2, iron: 3, osr: 2 });
		this.carrier = new Production({ qty: 0, oil: 4, iron: 3, osr: 3 });
		this.battleship = new Production({ qty: 0, oil: 3, iron: 4, osr: 3 });
		this.startedWith = new Production();
		this.endedWith = new Production();
		this.producing = new Production();
	}
}