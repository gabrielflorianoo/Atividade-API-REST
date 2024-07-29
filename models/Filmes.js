let ids = 0;
let filmes = [];

module.exports = {
    new(nome, avaliacao) {
        let filme = { id: ids++, nome: nome, avaliacao: avaliacao };
        filmes.push(filme);
        return filme;
    },
    update(id, nome, avaliacao) {
        let pos = this.getPositionById(id);
        if (pos >= 0) {
            filmes[pos].nome = nome;
            filmes[pos].avaliacao = avaliacao;
        }
        return filmes[pos];
    },
    list() {
        return filmes;
    },
    getElementById(id) {
        let pos = this.getPositionById(id);
        if (pos >= 0) {
            return filmes[pos];
        }
        return null;
    },
    getPositionById(id) {
        for (let i = 0; i < filmes.length; i++) {
            if (filmes[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    delete(id) {
        let i = this.getPositionById(id);
        if (i >= 0) {
            filmes.splice(i, 1);
            return true;
        }
        return false;
    }
};
