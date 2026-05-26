class AgendamentoLock {

    constructor() {

        this.ocupado = false;
    }

    adquirir() {

        if (this.ocupado) {
            return false;
        }

        this.ocupado = true;

        return true;
    }

    liberar() {

        this.ocupado = false;
    }
}

module.exports = new AgendamentoLock();