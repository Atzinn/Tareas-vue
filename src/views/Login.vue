<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="ingresoUsuario({email: $v.email.$model,pass: $v.pass.$model})">
            <small class="text-info" v-if="!$v.email.required">* Campo requerido</small>
            <small class="text-danger" v-if="!$v.email.email">
                Ingrese un correo del tipo example@example.com
            </small>
            <input class="form-control mb-2" type="email" placeholder="Ingrese su correo *" v-model="$v.email.$model">
            <small class="text-info" v-if="!$v.pass.required">* Campo requerido</small>
            <small class="text-danger" v-if="!$v.pass.minLength">
                La contraseña debe contener minimo 6 caracteres
            </small>
            <input class="form-control mb-2" type="password" placeholder="********" v-model="$v.pass.$model">
            <button type="submit" class="btn btn-success mt-2" :disabled="$v.$invalid">Acceder</button>
        </form>
        <p class="badge badge-danger" v-if="error">Usuario o contraseña incorrectos</p>
        <!-- {{$v.email}} -->
    </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import { required,minLength,email } from 'vuelidate/lib/validators';
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            pass: ''
        }
    },
    methods: {
        ...mapActions(['ingresoUsuario'])
    },
    computed: {
        ...mapState(['error'])
    },
    validations: {
        email: {
            required,
            email
        },
        pass: {
            required,
            minLength: minLength(6)
        }
    }
}
</script>