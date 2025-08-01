class Territory {
	constructor(id, name, countryControlled, owner, stressValue, baseProduction, embattledProduction, isEmbattled) {
		this.id = id;
		this.name = name;
		this.countryControlled = countryControlled;
		this.owner = owner;
		this.stressValue = stressValue || 0;
		this.production = new Production(baseProduction);
		this.embattledProduction = new Production(embattledProduction);
		this.isEmbattled = isEmbattled || false;
	}

}