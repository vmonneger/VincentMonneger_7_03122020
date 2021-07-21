<template>
  <div class="container mt-5">
    <h1 class="text-center">Se connecter</h1>
    <b-form v-on:submit.prevent="onSubmit" v-if="show" class="mx-auto w-50">
      <b-form-group id="input-group-1" label="Email:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          placeholder="Entrer votre email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Mot de passe:" label-for="input-2" description="Votre mot de passe doit contenir minimum 8 charactères, une majuscule et un chiffre.">
        <b-form-input
          id="input-2"
          v-model="form.password"
          placeholder="Entrer votre mot de passe"
          required
        ></b-form-input>
      </b-form-group>

        <div class="text-center">
            <b-button type="submit" variant="primary">Se connecter</b-button>
        </div>
    </b-form>
  </div>
</template>

<script>
const axios = require('axios');
// import {useRouter} from "vue-router";
// const router = useRouter();
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
        show: true
      }
    },
    methods: {
      onSubmit() {
        axios.post(`http://localhost:3000/api/auth/login`, {
        email: this.form.email,
        password: this.form.password
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("user_id", response.data.user_id)
          console.log(response);
          this.$router.push('Article')
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>