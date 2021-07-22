<template>
  <div class="container mt-5">
    <h1 class="text-center">Créer votre compte</h1>
    <b-form v-on:submit.prevent="onSubmit" v-if="show" class="mx-auto w-50">
      <b-form-group id="input-group-1" label="Nom:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.nom"
          placeholder="Entrer votre nom"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Prenom:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.prenom"
          placeholder="Entrer votre prénom"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Email:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.email"
          placeholder="Entrer votre email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Mot de passe:" label-for="input-4" description="Votre mot de passe doit contenir minimum 8 charactères, une majuscule et un chiffre.">
        <b-form-input
          id="input-4"
          v-model="form.password"
          placeholder="Entrer votre mot de passe"
          required
        ></b-form-input>
      </b-form-group>

        <div class="text-center">
            <b-button type="submit" variant="primary">S'enregistrer</b-button>
        </div>
    </b-form>
  </div>
</template>

<script>
const axios = require('axios');
  export default {
    data() {
      return {
        form: {
          nom: '',
          prenom: '',
          email: '',
          password: ''
        },
        show: true
      }
    },
    methods: {
      onSubmit() {
        axios.post(`http://localhost:3000/api/auth/signup`, {
        nom: this.form.nom,
        prenom: this.form.prenom,
        email: this.form.email,
        password: this.form.password
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>