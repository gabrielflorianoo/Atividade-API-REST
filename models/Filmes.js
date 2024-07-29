let ids = 0;
let movies = [];

module.exports = {
	new(name) {
		let movie = { id: ++ids, name: name, rating: rating };
		movies.push(movie);
		return task;
	},
	update(id, name) {
		let pos = this.getPositionById(id);
		if (pos >= 0) {
			movies[pos].name = name;
		}
		return movies[pos];
	},
	list() {
		return movies;
	},
	getElementById(id) {
		let pos = this.getPositionById(id);
		if (pos >= 0) {
			return movies[pos];
		}
		return null;
	},
	getPositionById(id) {
		for (let i = 0; i < movies.length; i++) {
			if (movies[i].id == id) {
				return i;
			}
		}
		return -1;
	},
	delete(id) {
		let i = this.getPositionById(id);
		if (i >= 0) {
			movies.splice(i, 1);
			return true;
		}
		return false;
	},
};
