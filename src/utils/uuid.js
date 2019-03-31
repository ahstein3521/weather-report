// generate a unique id. 

function* generate() {
	let index = 0;
	while (true) {
		yield index += 1;
	}
}

const index = generate();

export default function() {
	return index.next();
}
