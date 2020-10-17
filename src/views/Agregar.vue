<template>
    <div class="mt-4">
        <h1>Agregar</h1>
        <form @submit.prevent="agregarTarea($v.nombre.$model)" class="form-inline">
            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">Nombre</div>
                    <input class="form-control" type="text" v-model="$v.nombre.$model" placeholder="Ingrese tarea">
                </div>
                <button class="btn btn-outline-success ml-3" type="submit" :disabled="$v.$invalid || carga">Agregar</button>
            </div>
        </form>
        <small class="text-danger d-block mb-3" v-if="!$v.nombre.required">Campo requerido</small>
        <small class="text-danger d-block mb-3" v-if="!$v.nombre.minLength">Minimo de 5 carácters</small>
    </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
import { required,minLength } from 'vuelidate/lib/validators'
export default {
    name:'Agregar',
    data() {
        return {
            nombre: ''
        }
    },
    methods: {
        ...mapActions(['agregarTarea'])
    },
    validations: {
        nombre: {
            required,
            minLength: minLength(5)
        }
    },
    computed: {
        ...mapState(['carga'])
    }
}
</script>