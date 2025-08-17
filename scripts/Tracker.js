class Tracker {
	constructor() {
		this.bidding = new Production();
		this.stress = new Production();
		this.raids = new Production();
		this.repairs = new Production();
		this.goods = new Production();
		this.tradingFor = new Production();
		this.tradingWith = new Production();
		this.unitList = defaultUnitList();
		this.startedWith = new Production();
		this.endedWith = new Production();
		this.producing = new Production();
		this.remaining = new Production();
		this.economicCollapse = false;
	}
}