<template>
    <div>
        <h1>Registrar usuarios</h1>
        <form @submit.prevent="crearUsuario({email: $v.email.$model,password: $v.pass.$model})">
            <small class="text-info" v-if="!$v.email.required">* Campo requerido</small>
            <small class="text-danger" v-if="!$v.email.email">Email inválido</small>
            <input class="form-control mb-2" type="email" placeholder="Ingrese su correo *" v-model="$v.email.$model">
            
            <small class="text-info" v-if="!$v.pass.required">
                * Campo requerido
            </small>
            <small class="text-danger" v-if="!$v.pass.minLength">La contraseña debe contener al menos 6 caracteres</small>
            <input class="form-control mb-2" type="password" placeholder="Ingrese su contraseña *" v-model="$v.pass.$model">
            
            <small class="text-info" v-if="!$v.verifedPass.required">* Campo requerido</small>
            <small class="text-danger d-block" v-if="!$v.verifedPass.sameAs">
                Las contraseñas no coinciden
            </small>
            <input class="form-control mb-2" type="password" placeholder="Repita su contraseña *" v-model="$v.verifedPass.$model">
            <button class="btn btn-outline-success" type="submit" :disabled="!desactivar">Registar</button>
        </form>
        <!-- <p class="">{{error}}</p> -->
        <p class="badge badge-danger" v-if="error === 'auth/email-already-in-use'">
            Ya existe un usuario con este correo
        </p>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import { required,email,minLength,sameAs } from 'vuelidate/lib/validators';
export default {
    name: 'Registro',
    data() {
        return {
            email: "",
            pass: "",
            verifedPass: ""
        }
    },
    methods: {
        ...mapActions(['crearUsuario'])
    },
    computed: {
        ...mapState(['error']),
        desactivar() {
            return this.pass == this.verifedPass && this.pass.trim() !== '' && this.pass.length > 5
        }
    },
    validations: {
        email: {
            email,
            required
        },
        pass: {
            required,
            minLength: minLength(6)
        },
        verifedPass: {
            required,
            sameAs: sameAs('pass')
        }
    }
}
</script>