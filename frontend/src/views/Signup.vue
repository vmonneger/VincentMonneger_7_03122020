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

      <!-- <b-form-group id="input-group-2" label="Prenom:" label-for="input-2">
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
      </b-form-group> -->

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
          password: []
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
          console.log(error);
        });
      }
    }
  }
</script>