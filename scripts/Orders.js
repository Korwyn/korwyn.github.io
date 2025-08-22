class Orders {
	constructor(orderNum, commandName, destination, unitCommand) {
		this.orderNum = orderNum || 1;
		this.commandName = commandName || "";;
		this.destination = destination || "";
		this.command = unitCommand || new Command();
	}
}

function countryOrders(numOfOrders) {
	let ordersPerRow = 3;
	let orderArray = [];
	let orders = [];

	for (let i = 1; i <= numOfOrders; i++) {
		let order = new Orders(i);
		orders.push(order)

		if (i % ordersPerRow == 0) {
			orderArray.push(orders);
			orders = [];
		}
	}
	
	return orderArray;
}