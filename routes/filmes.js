var express = require("express");
var router = express.Router();

var FilmesModel = require("../models/Filmes");

// Middleware para buscar um filme pelo ID
let getFilme = (req, res, next) => {
    let id = req.params.id;
    let obj = FilmesModel.getElementById(id);
    if (obj == null) {
        return res.status(404).json({ status: false, error: "Filme Não Encontrado" });
    }
    req.filme = obj;
    next();
};

// Middleware para validar o nome do filme
let validaNome = (req, res, next) => {
    let { nome } = req.body;
    if (nome == undefined || nome == null || nome == "") {
        return res.status(400).json({
            status: false,
            error: "O nome não foi informado",
        });
    }

    if (nome.length < 3) {
        return res.status(400).json({
            status: false,
            error: "O nome do filme deve ser maior do que 3 caracteres",
        });
    }

    req.nome = nome;
    next();
};

// Middleware para validar a avaliação do filme
let validaAvaliacao = (req, res, next) => {
    let { avaliacao } = req.body;
    if (avaliacao == undefined || avaliacao == null || isNaN(avaliacao)) {
        return res.status(400).json({
            status: false,
            error: "A avaliação não foi informada ou não é um número",
        });
    }

    if (avaliacao < 0 || avaliacao > 10) {
        return res.status(400).json({
            status: false,
            error: "A avaliação do filme deve ser um número entre 0 e 10",
        });
    }

    req.avaliacao = avaliacao;
    next();
};

// Rota para listar todos os filmes
router.get("/", (req, res) => {
    res.json({ status: true, lista: FilmesModel.list() });
});

// Rota para obter um filme pelo ID
router.get("/:id", getFilme, (req, res) => {
    res.json({ status: true, filme: req.filme });
});

// Rota para criar um novo filme
router.post("/", validaNome, validaAvaliacao, (req, res) => {
    let filme = FilmesModel.new(req.nome, req.avaliacao);
    res.json({ status: true, filme });
});

// Rota para atualizar um filme pelo ID
router.put("/:id", validaNome, validaAvaliacao, getFilme, (req, res) => {
    let updatedFilme = FilmesModel.update(req.filme.id, req.nome, req.avaliacao);
    res.json({ status: true, filme: updatedFilme });
});

// Rota para deletar um filme pelo ID
router.delete("/:id", getFilme, (req, res) => {
    FilmesModel.delete(req.params.id);
    res.json({ status: true, "filme deletado": req.filme });
});

module.exports = router;
