<template>
    <div class="mt-4">
        <h2 class="text-center text-success">Inicio</h2>
        <h1 class="text-center">Bienvenido: <span class="badge badge-primary">{{usuario.email}}</span></h1>
        <router-link to="/agregar">
            <button class="btn btn-success">Agregar</button>
        </router-link>

        <form @submit.prevent="buscador(texto)">
            <div class="container">
                <input type="text" placeholder="Buscar..." class="form-control mt-3 w-75" v-model="texto" v-on:keyup="buscador(texto)">
            </div>
        </form>

        <div v-if="carga" class="text-center mt-3">
            <h3 class="text-primary">Cargando contenido...</h3>
            <pulse-loader :loading="carga"></pulse-loader>
        </div>

        <ul class="list-group mt-3" v-if="!carga">
            <li class="list-group-item" v-for="(item,index) in arrayFiltrado" :key="index">
                <p class="h3"><span class="badge badge-warning">{{item.id}}</span> - {{item.nombre}}</p>
                <router-link :to="{name:'Editar',params: {id:item.id}}">
                    <button class="btn btn-warning float-right ml-3">Editar</button>
                </router-link>
                <button @click="eliminarTarea(item.id)" class="btn btn-danger float-right">Eliminar</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState,mapActions,mapGetters } from 'vuex'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
    name: 'Inicio',
    data() {
        return {
            texto: ''
        }
    },
    computed: {
        ...mapState(['usuario','tareas','carga']),
        ...mapGetters(['arrayFiltrado'])
    },
    methods: {
        ...mapActions(['getTareas','eliminarTarea','buscador'])
    },
    created() {
        this.getTareas()
    },
    components: {
        PulseLoader
    }
}
</script>

