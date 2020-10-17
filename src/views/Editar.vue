<template>
    <div class="mt-4">
        <h1>Editar</h1>
        <form @submit.prevent="editarTarea(tarea)">
            <input class="form-control mb-2" type="text" v-model="$v.tarea.nombre.$model">
            <button class="btn btn-outline-warning" :disabled="$v.tarea.$invalid">Editar</button>
        </form>
        <small class="text-danger d-block" v-if="!$v.tarea.nombre.required">Campo requerido</small>
        <!-- {{$v.tarea.nombre}} -->
    </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
import { required,minLength } from 'vuelidate/lib/validators';
export default {
    name: 'Editar',
    data() {
        return {
            id: this.$route.params.id
        }
    },
    created() {
        this.getTarea(this.id)
    },
    methods: {
        ...mapActions(['getTarea','editarTarea'])
    },
    computed: {
        ...mapState(['tarea'])
    },
    validations: {
        tarea: {
            nombre:{
                required
            }
        }
    }
}
</script>

