<template>
  <div class="container mt-5">
    <h1 class="text-center">Se connecter</h1>
    <b-form v-on:submit.prevent="onSubmit" class="mx-auto w-50">
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
          type="password"
          autocomplete="on"
          placeholder="Entrer votre mot de passe"
          required
        ></b-form-input>
      </b-form-group>
      <!-- *****ON RENVOIE LES ERREURS AU USER****** -->
      <div v-if="form.errorBack" class="text-center text-danger font-weight-bold">
        <p>{{ form.errorBack }}</p>
      </div>
        <div class="text-center">
            <b-button type="submit" variant="primary">Se connecter</b-button>
        </div>
    </b-form>
  </div>
</template>

<script>
const axios = require('axios');
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          email: '',
          password: '',
          errorBack: ''
        }
      }
    },
    methods: {
      onSubmit() {
        axios.post(`http://localhost:3000/api/auth/login`, {
        email: this.form.email,
        password: this.form.password
        })
        .then((response) => {
          // ON STOCK TOUTES LES DONNEES NECESSAIRES DANS LE LOCALSTORAGE
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("user_id", response.data.user_id)
          localStorage.setItem("admin", response.data.admin)
          // ON ENREGISTRE LE TOKEN DANS AXIOS
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
          // ON MET A JOUR LE STORE
          this.$store.state.admin = localStorage.getItem("admin")
          this.$store.state.userId = localStorage.getItem("user_id")
          this.$router.push('Article')
          console.log(response.data);
        })
        .catch((error) => {
          // ON RENVOIE LES ERREURS AU USER
          console.log(error.response.data);
          this.form.errorBack = error.response.data.error
        });
      }
    }
  }
</script>