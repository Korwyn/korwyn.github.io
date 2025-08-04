class Country {
	constructor(territories, id, allianceName) {
		this.territories = territories;
		this.id = id;
		this.allianceName = allianceName;
		this.productionOil = 0;
		this.productionIron = 0;
		this.productionOsr = 0;
		this.currentOil = null;
		this.currentIron = null;
		this.currentOsr = null;
	}
}