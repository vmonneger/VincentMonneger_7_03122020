<template>
<section v-if="article.length" class="container">
  <h1 class="text-center">{{ article[0].titre }}</h1>
  <section class="col-12 border p-0 rounded mb-4">
    <div class="bg-light text-right">
      <p>{{ article[0].date }}</p>
    </div>
    <div class="row">
      <div class="col-9">
        <p>{{ article[0].contenu }}</p>
      </div>
      <div class="col-3 text-center border-left">
        <p>{{ article[0].prenom }} {{ article[0].nom }}</p>
      </div>
    </div>
    <div class="bg-light text-right">
      <p v-on:click="post()" class="m-0">Poster un commentaire</p>
    </div>
  </section>
  <section v-for="commentaire in commentaires" :key="commentaire.id" class="col-12 border p-0 rounded mb-4">
    <div class="bg-light text-right">
      <p>{{ commentaire.date }}</p>
    </div>
    <div class="row">
      <div class="col-9">
        <p>{{ commentaire.message }}</p>
      </div>
      <div class="col-3 text-center border-left">
        <p>{{ commentaire.prenom }} {{commentaire.nom}}</p>
      </div>
    </div>
    <div class="bg-light text-right">
      <p v-on:click="post()" class="m-0">Poster un commentaire</p>
    </div>
  </section>
</section>

</template>

<script>
const axios = require('axios');
export default {
  data() {
    return {
      commentaires: [],
      article: [],
    }
  },
  mounted() {
    axios.get(`http://localhost:3000/api/auth/allCommentaire/${this.$route.params.id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((response) => {
      this.commentaires = response.data
      console.log(this.commentaires)
    });
    axios.get(`http://localhost:3000/api/auth/oneArticle/${this.$route.params.id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((response) => {
      this.article = response.data
      console.log(this.article)
    });
  },
  methods: {
    post() {
      this.$router.push(`Post/${this.$route.params.id}`)
    }
  }
}
</script>

<style scoped>


</style>