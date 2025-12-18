<template>
    <div class="juego-container">
        <img :src="imagen" alt="No se puede encontrar la imagen">
        <p>{{ texto }}</p>
    </div>
  
</template>

<script>
export default {
    props: {
        imagen: {
            type: String,
            required: true
        },
        texto: {
            type: String,
            required: true
        }
    }

}
</script>

<style scoped>
.juego-container {
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px auto;
}
img {
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
}
p {
  font-size: 20px;
  color: #333;
  text-align: left;
  padding: 10px;
}
</style>