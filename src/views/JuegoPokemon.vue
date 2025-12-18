<template>
  <div class="container">
    <div v-if="mostrarDiv">
      <h4 :style="{ color: colorTexto }">{{ mensajes.mensaje1 }}</h4>
      <h4 :style="{ color: colorTexto }">{{ mensajes.mensaje2 }}</h4>
      <button @click="NuevoJuego()">Nuevo Juego</button>
    </div>
    <div v-if="!mostrarDiv">
      <div class="cabecera-fila">
        <p>Puntaje: {{ puntaje }}</p>
        <p>Intento: {{ intentos }}</p>
      </div>
      <div class="componentes-fila">
        <div v-for="(item, index) in arreglo" :key="index" class="juego-cont">
          <Juego :imagen="item.imagen" :texto="item.texto" />
        </div>
      </div>
      <div class="centrar">
        <button @click="jugar()">Jugar</button>
      </div>
    </div>
  </div>
</template>

<script>
import Juego from "../components/Juego.vue";
import { consultarPokemonFachada } from "../clients/PokemonClient";
export default {
  components: {
    Juego,
  },
  props: {
    imagen: {
      type: String,
      required: true,
    },
    texto: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      arregloPokemones: [],
      arreglo: [
        {
          imagen: "https://dummyimage.com/250x250",
          texto: "XXXXXXXXXXXX",
        },
        {
          imagen: "https://dummyimage.com/250x250",
          texto: "XXXXXXXXXXXX",
        },
        {
          imagen: "https://dummyimage.com/250x250",
          texto: "XXXXXXXXXXXX",
        },
      ],
      intentos: 0,
      puntaje: 0,
      mostrarDiv: true,
      mensaje: null,
      mensajes: {
        mensaje1: null,
        mensaje2: null,
      },
      colorTexto: null,
    };
  },
  methods: {
    async jugar() {
      this.intentos++;
      let contador = 0;
      for (let i = 0; i < this.arreglo.length; i++) {
        const respuesta = await consultarPokemonFachada();
        this.arreglo[i].imagen = respuesta.forms[0].url;
        this.arreglo[i].texto= respuesta.forms[0].name;
        if (this.arreglo[i].texto=== this.arreglo[i].texto) {
          contador++;
        }
      }
      if (contador === 3) {
        this.puntaje += 5;
      } else if (contador === 2) {
        this.puntaje += 2;
      } else if (contador === 0) {
        this.puntaje += 0;
      }
      this.FinDelJuego();
    },
    FinDelJuego() {
      if (this.intentos === 5 && this.puntaje < 10) {
        this.mostrarDiv = true;
        this.mensajes.mensaje1 = "Has utilizado tus 5 intentos";
        this.mensajes.mensaje2 = "El juego ha terminado";
        this.colorTexto = "red";
      } else if (this.puntaje >= 10) {
        this.mostrarDiv = true;
        this.mensajes.mensaje1 = "Puntaje" +this.puntaje;
        this.mensajes.mensaje2 = "Felicidades has ganado un premio de 10.000,00$";
        this.colorTexto = "blue";
      }
    },
    NuevoJuego() {
      this.intentos = 0;
      this.puntaje = 0;
      this.mostrarDiv = false;
      this.mensajes.mensaje1 = null;
      this.mensajes.mensaje2 = null;
      this.colorTexto = null;
      this.arreglo = [
        {
          imagen: "https://dummyimage.com/250x250",
          texto: "XXXXXXXXXXXX",
        },
        {
          imagen: "https://dummyimage.com/250x250",
          texto: "XXXXXXXXXXXX",
        },
        {
          imagen: "https://dummyimage.com/250x250",
          texto: "XXXXXXXXXXXX",
        },
      ];
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #666;
  width: 80%;
  margin: 0 auto;
}
.cabecera-fila {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  margin: 25px auto;
  padding: 0 25px;
}
.cabecera-fila p {
  font-size: 18px;
  font-weight: bold;
}
.componentes-fila {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0;
}
.juego-cont {
  margin: 0 10px;
}
.centrar {
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  padding: 10px 40px;
  font-size: 16px;
  margin-bottom: 10px;
  border: 5px solid black;
}
</style>
