class Command {
	constructor(name, country, units) {
		this.name = name;
		this.country = country;
		this.units = units || defaultUnitList();
	}
}