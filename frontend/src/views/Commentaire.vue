<template>
<section v-if="article.length" class="container">
  <h1 class="text-center">{{ article[0].titre }}</h1>
  <p v-if="totalCommentaire.length">Total de commentaire: {{ totalCommentaire[0].total }}</p>
  <section class="col-12 border border-info p-0 rounded mb-4">
    <div class="bg-info text-right">
      <p>{{ article[0].date }}</p>
    </div>
    <div class="row row-cols-2">
      <div class="col">
        <p class="ml-2">{{ article[0].contenu }}</p>
      </div>
      <div class="col text-center border-left border-info">
        <p>{{ article[0].prenom }} {{ article[0].nom }}</p>
      </div>
    </div>
    <div class="bg-light text-right rounded">
      <button v-on:click="post()" class="m-0 btn btn-outline-primary">Poster un commentaire</button>
    </div>
  </section>
  <section v-for="commentaire in commentaires" :key="commentaire.id" class="border p-0 rounded mb-4">
    <div class="bg-light text-right">
      <p>{{ commentaire.date }}</p>
    </div>
    <div class="row">
      <div class="col-9">
        <p class="ml-2">{{ commentaire.message }}</p>
      </div>
      <div class="col-3 text-center border-left">
        <p>{{ commentaire.prenom }} {{commentaire.nom}}</p>
      </div>
    </div>
    <div class="bg-light text-right">
      <button v-on:click="post()" class="m-0 btn btn-outline-primary">Poster un commentaire</button>
    </div>
  </section>
</section>

</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      commentaires: [],
      article: [],
      totalCommentaire: []
    }
  },
  mounted() {
    axios.get(`http://localhost:3000/api/auth/allCommentaire/${this.$route.params.id}`)
    .then((response) => {
      this.commentaires = response.data
      console.log(this.commentaires)
    });
    axios.get(`http://localhost:3000/api/auth/oneArticle/${this.$route.params.id}`)
    .then((response) => {
      this.article = response.data
      console.log(this.article)
    });
    axios.get(`http://localhost:3000/api/auth/totalCommentaire/${this.$route.params.id}`)
    .then((response) => {
      this.totalCommentaire = response.data
      console.log(this.totalCommentaire)
    });
  },
  methods: {
    post() {
      this.$router.push({ name: 'PostCommentaire', params: { id: this.$route.params.id }})
    }
  }
}
</script>

<style scoped>


</style>