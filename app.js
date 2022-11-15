new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true
            this.saludJugador = 100
            this.saludMonstruo = 100
            this.turnos = []
            this.esJugador = false
        },
        atacar: function () {
            let daño = this.calcularHeridas(this.rangoAtaque)
            if(daño <= this.saludMonstruo) {
                this.saludMonstruo -= daño
            }
            else {
                this.saludMonstruo = 0
            }
            let turno = {
                esJugador: true,
                text: `El Jugador golpea al monstruo por ${daño}`
            }
            this.turnos.unshift(turno)
            if(this.verificarGanador()){
                return
            }
            this.ataqueDelMonstruo()
        },
        ataqueEspecial: function () {
            let daño = this.calcularHeridas(this.rangoAtaqueEspecial)
            if(daño <= this.saludMonstruo) {
                this.saludMonstruo -= daño
            } else {
                this.saludMonstruo = 0
            }
            let turno = {
                esJugador: true,
                text: `El jugador golpea duramente al monstruo por ${daño}.`
            }
            this.turnos.unshift(turno)
            if(this.verificarGanador()){
                return
            }
            this.ataqueDelMonstruo()
        },
        curar: function () {
            let curacion = 10
            if(this.saludJugador <= 90)
            {
                this.saludJugador += curacion
            } else {
                curacion = 100 - this.saludJugador
                this.saludJugador = 100
            }    
            let turno = {
                esJugador: true,
                text: `El jugador se sana por ${curacion} puntos.`
            }
            this.turnos.unshift(turno)
            this.ataqueDelMonstruo()
        },
        /* registrarEvento(evento) {
            console.log('REGISTRANDO EVENTO')
        }, */
        terminarPartida: function () {
            if(confirm('Te rendiste y el monstruo gana! Jugar de nuevo? ')) {
                this.empezarPartida()
            } else {
                this.hayUnaPartidaEnJuego = false
            }
        },
        ataqueDelMonstruo: function () {
            let daño = this.calcularHeridas(this.rangoAtaqueDelMonstruo)
            if (daño <= this.saludJugador) {
                this.saludJugador -= daño
            } else {
                this.saludJugador = 0
            }
            let turno = {
                esJugador: false,
                text: `El jugador recibe ${daño} por el ataque del monstruo.`
            }
            this.turnos.unshift(turno)
            if(this.verificarGanador()){
                return
            }
        },
        calcularHeridas: function (rango) {
            return Math.floor(Math.random() * (rango[1] - rango[0]) + rango[0]);
        },
        verificarGanador: function () {
            if(this.saludMonstruo <= 0) {
                if(confirm('Ganaste! Jugar de nuevo?')) {
                    this.empezarPartida()
                } else {
                    this.hayUnaPartidaEnJuego = false
                }
                return true
            } else if (this.saludJugador <= 0) {
                if(confirm('Perdiste! Jugar de nuevo? ')) {
                    this.empezarPartida()
                } else {
                    this.hayUnaPartidaEnJuego = false
                }
                return true
            }
            return false
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});