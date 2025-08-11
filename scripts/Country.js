class Country {
	constructor(territories, id, allianceName, startOil, startIron, startOsr) {
		this.territories = territories;
		this.id = id;
		this.allianceName = allianceName;
		this.productionOil = 0;
		this.productionIron = 0;
		this.productionOsr = 0;
		this.remainingOil = 0;
		this.remainingIron = 0;
		this.remainingOsr = 0;
		this.currentOil = null;
		this.currentIron = null;
		this.currentOsr = null;
		this.tracker = new Tracker();
		this.trackerLog = [];
		this.economicCollapse = false;
	}
}