<template>
<div v-if="article.length" class="container">
  <h1 class="text-center">{{ article[0].titre }}</h1>
  <div class="text-right">
    <div class="text-center mb-4 mt-5">
      <button v-on:click="post()" class="col-6 m-0 btn btn-outline-primary">Poster un commentaire</button>
    </div>
      <p v-if="totalCommentaire" class="">Total de commentaire: {{ totalCommentaire }}</p>
  </div>
  <div class="row border border-info p-0 rounded mb-4 ml-0 mr-0">
    <div class="col-12 bg-info text-right">
      <p>{{ article[0].date | moment("DD/MM/YYYY HH:mm:ss") }}</p>
    </div>
    <div class="col-9">
      <p class="ml-2">{{ article[0].contenu }}</p>
    </div>
    <div class="col-3 text-center border-left border-info">
      <p v-on:click="redirect(article[0].user_id)" class="pointer">{{ article[0].prenom }} {{ article[0].nom }}</p>
    </div>
  </div>
  <div v-for="(commentaire, index) in commentaires" :key="commentaire.id" class="row border p-0 rounded mb-4 ml-0 mr-0">
    <div class="col-12 bg-light text-right">
      <p>{{ commentaire.date | moment("DD/MM/YYYY HH:mm:ss") }}</p>
    </div>
    <div class="col-sm-9 col-12">
      <p class="ml-2">{{ commentaire.message }}</p>
    </div>
    <div class="col-sm-3 border-left text-right text-sm-center">
      <p v-if="commentaire.prenom" v-on:click="redirect(commentaire.user_id)" class="pointer">{{ commentaire.prenom }} {{commentaire.nom}}</p>
      <p v-else>Compte supprimé</p>
    </div>
    <div v-if="admin == 1" class="col-sm-12 bg-light text-right">
      <button v-on:click="deleteCommentaire(index, commentaire.id)" class="m-0 btn btn-outline-danger">Supprimer commentaire</button>
    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      commentaires: [],
      article: [],
      totalCommentaire: [],
      admin: []
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
      this.totalCommentaire = response.data[0].total
      console.log(this.totalCommentaire)
    });
    this.admin = localStorage.getItem('admin')
  },
  methods: {
    post() {
      this.$router.push({ name: 'PostCommentaire', params: { id: this.$route.params.id }})
    },
    deleteCommentaire(index, id) {
      axios.delete(`http://localhost:3000/api/auth/oneCommentaire/${id}`)
      .then((response) => {
      console.log(response.data);
      this.commentaires.splice(index, 1);
      this.totalCommentaire = this.totalCommentaire - 1;
      })
    },
    redirect(userId) {
      this.$router.push({ name: 'User', params: { id: userId }})
    }
  }
}
</script>

<style scoped>
.pointer:hover {
  cursor: pointer;
  color: #1ab394;
}

</style>