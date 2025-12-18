import axios from 'axios';

const consultarApi = async () => {
    const respuesta = await axios.get('https://pokeapi.co/api/v2/pokemon/1').then(res => res.data);
    return respuesta;
}

const consultarApiPorId = async (id) => {
    const respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.data);
    return respuesta;
}

const consultarPokemon = async (id) => {
    const data = await consultarApiPorId(id);
    return data;

}
//funciones fachada
export const consultarPokemonFachada = async () => {
    const respuesta = await consultarPokemon();
    return respuesta;
}
    

