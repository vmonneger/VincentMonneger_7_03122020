<template>
  <div class="container mt-5">
    <h1 class="text-center">Créer votre compte</h1>
    <form v-on:submit.prevent="onSubmit" class="mx-auto w-50">
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Nom:</label>
        <input v-model="form.nom" class="form-control" type="text" placeholder="Entrer votre nom">
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Prenom:</label>
        <input v-model="form.prenom" class="form-control" type="text" placeholder="Entrer votre prénom">
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Email:</label>
        <input v-model="form.email" class="form-control" type="email" placeholder="Entrer votre email">
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Mot de passe:</label>
        <input v-model="form.password" class="form-control" type="password" autocomplete="on" aria-describedby="passwordHelpBlock" placeholder="Entrer votre mot de passe">
      <small id="passwordHelpBlock" class="form-text text-muted">
        Votre mot de passe doit contenir minimun 8 charactères, une majuscule et un chiffre
      </small>
      </div>
      <!-- *****ON RENVOIE LES ERREURS AU USER****** -->
      <div v-if="form.errorBack" class="text-center text-danger font-weight-bold">
        <p>{{ form.errorBack }}</p>
      </div>
      <div class="text-center">
          <b-button type="submit" variant="primary">S'enregistrer</b-button>
      </div>
    </form>
  </div>
</template>

<script>
const axios = require('axios');
  export default {
    data() {
      return {
        form: {
          nom: [],
          prenom: [],
          email: [],
          password: [],
          errorBack: ''
        }
      }
    },
    methods: {
      onSubmit() {
        const dataUser = {
          nom: this.form.nom,
          prenom: this.form.prenom,
          email: this.form.email,
          password: this.form.password
        }
        axios.post(`http://localhost:3000/api/auth/signup`, dataUser)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: 'Login' })
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