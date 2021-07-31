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
        <div class="input-group">
          <!-- *****METHOD POUR VOIR LE PASSWORD EN JOUANT AVEC LE TYPE EN LE BIND****** -->
          <input v-model="form.password" class="form-control" :type="form.visibility" autocomplete="on" aria-describedby="passwordHelpBlock" placeholder="Entrer votre mot de passe">
          <span class="input-group-text" id="basic-addon1">
            <div v-if="form.visibility == 'password'" @click="showPassword()">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
              </svg>
            </div>
            <div v-if="form.visibility == 'text'" @click="hidePassword()">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
              </svg>
            </div>
          </span>
        </div>
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
          visibility: 'password',
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
      },
      // METHOD POUR VOIR LE PASSWORD
      showPassword() {
        this.form.visibility = 'text'
      },
      hidePassword() {
        this.form.visibility = 'password'
      }
    }
  }
</script>