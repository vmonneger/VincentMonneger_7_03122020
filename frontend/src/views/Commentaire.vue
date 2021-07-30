<template>
<div v-if="article.length" class="container">
  <h1 class="text-center">{{ article[0].titre }}</h1>
  <div class="text-right">
    <div class="text-center mb-4 mt-5">
      <button v-on:click="post()" class="col-6 m-0 btn btn-outline-primary">Poster un commentaire</button>
    </div>
      <p v-if="totalCommentaire" class="text-left">Total de commentaire: {{ totalCommentaire }}</p>
  </div>
  <!-- ********ICI L'ARTICLE********** -->
  <div class="row border border-info p-0 rounded mb-4 ml-0 mr-0">
    <div class="col-12 bg-info text-right">
      <p>{{ article[0].date | moment("DD/MM/YYYY HH:mm:ss") }}</p>
    </div>
    <div class="col-sm-9 col-12">
      <img :src="article[0].image" class="img-fluid rounded mt-2" alt="">
      <p class="ml-2">{{ article[0].contenu }}</p>
    </div>
    <div class="col-sm-3 text-sm-center text-right border-left border-info">
      <p v-on:click="redirect(article[0].user_id)" class="pointer">{{ article[0].prenom }} {{ article[0].nom }}</p>
    </div>
  </div>
  <!-- ********LA BOUCLE SUR LES COMMENTAIRES****** -->
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
    <!-- *****LA PARTIE DU BUTTON AVEC MODAL QUI APPARAIT SEULEMENT SI ADMIN OU USER CONCERNE***** -->
    <div v-if="$store.state.admin == 1 || commentaire.user_id == $store.state.userId" class="col-sm-12 bg-light text-right">
        <div>
            <b-button v-b-modal="'modalComm-' + commentaire.id" variant="outline-danger">Supprimer Commentaire</b-button>

            <b-modal hide-footer ok-title = "Supprimer" ok-variant = "danger" cancel-title = "Annuler" :id="'modalComm-' + commentaire.id" title="Supprimer">
            <p class="my-4">Etes vous sûr de vouloir supprimer le commentaire ?</p>
            <div class="text-right">
                <b-button variant="secondary" @click="$bvModal.hide('modalComm-' + commentaire.id)">Annuler</b-button>
                <b-button @click="deleteCommentaire(index, commentaire.id)" class="ml-2" variant="danger">Supprimer Commentaire</b-button>
            </div>
            </b-modal>
        </div>
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
      totalCommentaire: []
    }
  },
  mounted() {
    axios.get(`http://localhost:3000/api/auth/allCommentaire/${this.$route.params.id}`)
    .then((response) => {
      this.commentaires = response.data
    });
    axios.get(`http://localhost:3000/api/auth/oneArticle/${this.$route.params.id}`)
    .then((response) => {
      this.article = response.data
    });
    axios.get(`http://localhost:3000/api/auth/totalCommentaire/${this.$route.params.id}`)
    .then((response) => {
      this.totalCommentaire = response.data[0].total
    });
  },
  methods: {
    post() {
      this.$router.push({ name: 'PostCommentaire', params: { id: this.$route.params.id }})
    },
    deleteCommentaire(index, id) {
      axios.delete(`http://localhost:3000/api/auth/oneCommentaire/${id}`)
      .then((response) => {
        // ON MET A JOUR LA DATA COMMENTAIRES EN SUPPRIMANT ELEMENT DE L'ARRAY
        this.commentaires.splice(index, 1);
        // ON MET A JOUR LA DATA TOTAL COMMENTAIRES AVEC -1
        this.totalCommentaire = this.totalCommentaire - 1;
        console.log(response.data);
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