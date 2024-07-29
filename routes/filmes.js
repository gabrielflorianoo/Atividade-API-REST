var express = require("express");
var router = express.Router();

var FilmesModel = require("../models/Filmes");

let getFilme = (req, res, next) => {
	let id = req.params.id;
	let obj = FilmesModel.getElementById(id);
	if (obj == null) {
		res.status(404).json({ status: false, error: "Filmes Não Encontrado" });
	}
	req.task = obj;
	next();
};

let validaNome = (req, res, next) => {
	let { nome } = req.body;
	if (nome == undefined || nome == null || nome == "") {
		res.status(400).json({
			status: false,
			error: "O nome nao foi informado",
		});
	}

	if (nome.length < 3) {
		res.status(400).json({
			status: false,
			error: "O nome do filme deve ser maior do que 3 caracters",
		});
	}

	req.nome = nome;
	next();
};

let validaAvaliacao = (req, res, next) => {
	let { rating } = req.body;
	if (rating == undefined || rating == null || rating == NaN) {
		res.status(400).json({
			status: false,
			error: "O nome nao foi informado",
		});
	}

	if (rating.length < 3) {
		res.status(400).json({
			status: false,
			error: "O nome do filme deve ser maior do que 3 caracters",
		});
	}

	req.avaliacao = rating;
	next();
};

router.get("/", (req, res) => {
	res.json({ status: true, list: FilmesModel.list() });
});

router.get("/:id", getFilme, (req, res) => {
	res.json({ status: true, task: req.task });
});

router.post("/", validaNome, validaAvaliacao, (req, res) => {
	res.json({ status: true, task: FilmesModel.new(req.nome) });
});

router.put("/:id", validaNome, validaAvaliacao, getFilme, (req, res) => {
	res.json({ status: true, task: FilmesModel.update(req.task.id, req.nome) });
});

router.delete("/:id", getFilme, (req, res) => {
	FilmesModel.delete(req.params.id);
	res.json({ status: true, oldtask: req.task });
});

module.exports = router;
