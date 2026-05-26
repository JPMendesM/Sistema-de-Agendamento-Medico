class ConsultaCache {

    constructor() {

        this.cache = new Map();
    }

    salvar(chave, valor) {

        this.cache.set(chave, {
            valor,
            timestamp: Date.now()
        });
    }

    buscar(chave) {

        return this.cache.get(chave);
    }

    limpar() {

        this.cache.clear();
    }
}

module.exports = new ConsultaCache();