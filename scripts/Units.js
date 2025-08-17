class BattleMode {
	constructor(name, air, combat, defense, modesAvailable) {
		this.name = name;
		this.airDice = air;
		this.combatDice = combat;
		this.defenseValue = defense;
		this.modesAvailable = modesAvailable;
		this.qty = 0;
	}
}

class Unit {
	constructor() {
		this.productionCost = new Production();
		this.name = "";
		this.type = "";
		this.battleModes = [];
		this.currentBattleMode = null;
		this.qty = 0;
	}
}

class Infantry extends Unit {
	constructor() {
		super();
		this.name = "Infantry";
		this.type = "land";
		this.productionCost.osr = 2;

		let battleMode1Name = "Defensive";
		let battleMode1AirDice = 0;
		let battleMode1CombatDice = 1;
		let battleMode1Defense = 2;
		let battleMode1Available = { land: true, naval: false };
		let battleMode1 = new BattleMode(battleMode1Name, battleMode1AirDice, battleMode1CombatDice, battleMode1Defense, battleMode1Available);

		let battleMode2Name = "Offensive";
		let battleMode2AirDice = 0;
		let battleMode2CombatDice = 2;
		let battleMode2Defense = 1;
		let battleMode2Available = { land: true, naval: false };
		let battleMode2 = new BattleMode(battleMode2Name, battleMode2AirDice, battleMode2CombatDice, battleMode2Defense, battleMode2Available);

		this.battleModes.push(battleMode1);
		this.battleModes.push(battleMode2);
	}
}

class Artillery extends Unit {
	constructor() {
		super();
		this.name = "Artillery";
		this.type = "land";
		this.productionCost.iron = 2;
		this.productionCost.osr = 1;

		let battleMode1Name = "Anti-Air";
		let battleMode1AirDice = 2;
		let battleMode1CombatDice = 1;
		let battleMode1Defense = 2;
		let battleMode1Available = { land: true, naval: false };
		let battleMode1 = new BattleMode(battleMode1Name, battleMode1AirDice, battleMode1CombatDice, battleMode1Defense, battleMode1Available);

		let battleMode2Name = "Ground";
		let battleMode2AirDice = 0;
		let battleMode2CombatDice = 2;
		let battleMode2Defense = 2;
		let battleMode2Available = { land: true, naval: false };
		let battleMode2 = new BattleMode(battleMode2Name, battleMode2AirDice, battleMode2CombatDice, battleMode2Defense, battleMode2Available);

		this.battleModes.push(battleMode1);
		this.battleModes.push(battleMode2);
	}
}

class Tank extends Unit {
	constructor() {
		super();
		this.name = "Tanks";
		this.type = "land";
		this.productionCost.oil = 1;
		this.productionCost.iron = 2;
		this.productionCost.osr = 1;

		let battleMode1Name = "Defensive";
		let battleMode1AirDice = 1;
		let battleMode1CombatDice = 2;
		let battleMode1Defense = 3;
		let battleModelAvailable = { land: true, naval: false };
		let battleMode1 = new BattleMode(battleMode1Name, battleMode1AirDice, battleMode1CombatDice, battleMode1Defense, battleModelAvailable);

		let battleMode2Name = "Offensive";
		let battleMode2AirDice = 0;
		let battleMode2CombatDice = 4;
		let battleMode2Defense = 2;
		let battleMode2Available = { land: true, naval: false };
		let battleMode2 = new BattleMode(battleMode2Name, battleMode2AirDice, battleMode2CombatDice, battleMode2Defense, battleMode2Available);

		this.battleModes.push(battleMode1);
		this.battleModes.push(battleMode2);
	}
}

class Submarine extends Unit {
	constructor() {
		super();
		this.name = "Submarines";
		this.type = "naval";
		this.productionCost.oil = 1;
		this.productionCost.iron = 2;
		this.productionCost.osr = 1;

		let battleMode1Name = "Surface";
		let battleMode1AirDice = 0;
		let battleMode1CombatDice = 2;
		let battleMode1Defense = 2;
		let battleMode1Available = { land: false, naval: true };
		let battleMode1 = new BattleMode(battleMode1Name, battleMode1AirDice, battleMode1CombatDice, battleMode1Defense, battleMode1Available);

		this.battleModes.push(battleMode1);
	}
}

class Cruiser extends Unit {
	constructor() {
		super();
		this.name = "Cruisers";
		this.type = "naval";
		this.productionCost.oil = 2;
		this.productionCost.iron = 3;
		this.productionCost.osr = 2;

		let battleMode1Name = "Escort";
		let battleMode1AirDice = 2;
		let battleMode1CombatDice = 2;
		let battleMode1Defense = 2;
		let battleMode1Available = { land: false, naval: true };
		let battleMode1 = new BattleMode(battleMode1Name, battleMode1AirDice, battleMode1CombatDice, battleMode1Defense, battleMode1Available);

		let battleMode2Name = "Offensive";
		let battleMode2AirDice = 0;
		let battleMode2CombatDice = 2;
		let battleMode2Defense = 2;
		let battleMode2Available = { land: false, naval: true };
		let battleMode2 = new BattleMode(battleMode2Name, battleMode2AirDice, battleMode2CombatDice, battleMode2Defense, battleMode2Available);

		this.battleModes.push(battleMode1);
		this.battleModes.push(battleMode2);
	}
}

class Carrier extends Unit {
	constructor() {
		super();
		this.name = "Carriers";
		this.type = "naval";
		this.productionCost.oil = 4;
		this.productionCost.iron = 3;
		this.productionCost.osr = 3;

		let battleMode1Name = "Anti-Air";
		let battleMode1AirDice = 2;
		let battleMode1CombatDice = 1;
		let battleMode1Defense = 3;
		let battleMode1Available = { land: false, naval: true };
		let battleMode1 = new BattleMode(battleMode1Name, battleMode1AirDice, battleMode1CombatDice, battleMode1Defense, battleMode1Available);

		let battleMode2Name = "Offensive";
		let battleMode2AirDice = 1;
		let battleMode2CombatDice = 2;
		let battleMode2Defense = 3;
		let battleMode2Available = { land: false, naval: true };
		let battleMode2 = new BattleMode(battleMode2Name, battleMode2AirDice, battleMode2CombatDice, battleMode2Defense, battleMode2Available);

		this.battleModes.push(battleMode1);
		this.battleModes.push(battleMode2);
	}
}

class Battleship extends Unit {
	constructor() {
		super();
		this.name = "Battleships";
		this.type = "naval";
		this.productionCost.oil = 3;
		this.productionCost.iron = 4;
		this.productionCost.osr = 3;

		let battleMode1Name = "Anti-Air";
		let battleMode1AirDice = 2;
		let battleMode1CombatDice = 3;
		let battleMode1Defense = 3;
		let battleMode1Available = { land: false, naval: true };
		let battleMode1 = new BattleMode(battleMode1Name, battleMode1AirDice, battleMode1CombatDice, battleMode1Defense, battleMode1Available);

		let battleMode2Name = "Offensive";
		let battleMode2AirDice = 1;
		let battleMode2CombatDice = 4;
		let battleMode2Defense = 3;
		let battleMode2Available = { land: false, naval: true };
		let battleMode2 = new BattleMode(battleMode2Name, battleMode2AirDice, battleMode2CombatDice, battleMode2Defense, battleMode2Available);

		this.battleModes.push(battleMode1);
		this.battleModes.push(battleMode2);
	}
}

class Fighter extends Unit {
	constructor() {
		super();
		this.name = "Fighters";
		this.type = "air";
		this.productionCost.oil = 2;
		this.productionCost.iron = 1;
		this.productionCost.osr = 1;

		let battleMode1Name = "Air";
		let battleMode1AirDice = 3;
		let battleMode1CombatDice = 0;
		let battleMode1Defense = 2;
		let battleMode1Available = { land: true, naval: true };
		let battleMode1 = new BattleMode(battleMode1Name, battleMode1AirDice, battleMode1CombatDice, battleMode1Defense, battleMode1Available);

		let battleMode2Name = "Surface";
		let battleMode2AirDice = 0;
		let battleMode2CombatDice = 3;
		let battleMode2Defense = 2;
		let battleMode2Available = { land: true, naval: true };
		let battleMode2 = new BattleMode(battleMode2Name, battleMode2AirDice, battleMode2CombatDice, battleMode2Defense, battleMode2Available);

		this.battleModes.push(battleMode1);
		this.battleModes.push(battleMode2);
	}
}

class Bomber extends Unit {
	constructor() {
		super();
		this.name = "Bombers";
		this.type = "air";
		this.productionCost.oil = 2;
		this.productionCost.iron = 2;
		this.productionCost.osr = 1;

		let battleMode1Name = "Ground";
		let battleMode1AirDice = 1;
		let battleMode1CombatDice = 4;
		let battleMode1Defense = 2;
		let battleMode1Available = { land: true, naval: false };
		let battleMode1 = new BattleMode(battleMode1Name, battleMode1AirDice, battleMode1CombatDice, battleMode1Defense, battleMode1Available);

		let battleMode2Name = "Surface";
		let battleMode2AirDice = 1;
		let battleMode2CombatDice = 3;
		let battleMode2Defense = 2;
		let battleMode2Available = { land: false, naval: true };
		let battleMode2 = new BattleMode(battleMode2Name, battleMode2AirDice, battleMode2CombatDice, battleMode2Defense, battleMode2Available);

		let battleMode3Name = "Strategic";
		let battleMode3AirDice = 1;
		let battleMode3CombatDice = 0;
		let battleMode3Defense = 2;
		let battleMode3Available = { land: true, naval: false };
		let battleMode3 = new BattleMode(battleMode3Name, battleMode3AirDice, battleMode3CombatDice, battleMode3Defense, battleMode3Available);

		this.battleModes.push(battleMode1);
		this.battleModes.push(battleMode2);
		this.battleModes.push(battleMode3);
	}
}

function defaultUnitList() {
	let unitList = {
		bomber: new Bomber(),
		fighter: new Fighter(),
		artillery: new Artillery(),
		tank: new Tank(),
		infantry: new Infantry(),
		battleship: new Battleship(),
		carrier: new Carrier(),
		cruiser: new Cruiser(),
		submarine: new Submarine()
	};

	return unitList;
}