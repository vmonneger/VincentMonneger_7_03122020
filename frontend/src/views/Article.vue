<template>
<div class="container">
  <div class="row">
    <div class="col-lg-12">
      <div class="wrapper wrapper-content animated fadeInRight">

        <div class="m-b-sm border-bottom">
          <!-- ********AVERTI SUR USER PAS LOG********* -->
          <div v-if="!$store.state.userId" class="text-danger">
            <h2>Vous n'etes pas loggé !</h2>
          </div>
          <div v-else class="p-xs">
            <h2>Bienvennue dans le forum</h2>
          </div>
        </div>
        <!-- *****LE LIEN DU DERNIER COMMENTAIRE POSTE***** -->
        <router-link v-if="lastCommentaire.length" :to="{name: 'Commentaire', params: {id: lastCommentaire[0].article_id} }" class="text-decoration-none">
          <p>Dernier commentaire: {{ lastCommentaire[0].prenom }} {{ lastCommentaire[0].nom }} sur l'article "{{ lastCommentaire[0].titre }}" le {{ lastCommentaire[0].date | moment("DD/MM/YYYY HH:mm:ss") }}</p>
        </router-link>
        <div class="text-right">
          <button v-if="$store.state.userId" v-on:click="post()" class="m-0 btn btn-outline-primary">Poster un article</button>
        </div>

        <div class="forum-container">
          <div class="forum-title">
            <div v-if="totalArticle > 0" class="pull-right">
              <p>Total d'article: {{ totalArticle }}</p>
            </div>
          </div>
          <!-- *****LA BOUCLE SUR LES ARTICLES***** -->
          <div v-for="(article,index) in articles" :key="article.id" class="row forum-item active" >
            <div class="col-md-9">
              <router-link :to="{name: 'Commentaire', params: {id: article.id} }" class="forum-item-title mb-3"> {{ article.titre }}
                <small v-if="article.image">*Article avec image*</small>
              </router-link>
              <router-link :to="{name: 'Commentaire', params: {id: article.id} }" class="forum-sub-title text-decoration-none">{{ article.contenu }}</router-link>
            </div>
            <div class="col-6 col-lg-1 text-lg-center text-lg-right mt-5 mt-lg-0">
              <span class="views-number">
                  {{ article.date | moment("DD/MM/YYYY HH:mm:ss") }}
              </span>
              <div>
                  <small>Date</small>
              </div>
            </div>
            <div class="col-6 col-lg-2 text-lg-center text-right mt-5 mt-lg-0 mb-4 mb-lg-0">
              <span class="views-number">
                  {{ article.nbre_comm }}
              </span>
              <div>
                  <small v-if="article.nbre_comm > 1">Commentaires</small>
                  <small v-else>Commentaire</small>
              </div>
            </div>
            <div class="col-6 col-lg-3 text-lg-right mt-4">
              <p v-on:click="redirect(article.user_id)" class="pointer">{{ article.prenom }} {{ article.nom }}</p>
            </div>
            <!-- *****LA PARTIE DU BUTTON AVEC MODAL QUI APPARAIT SEULEMENT SI ADMIN OU USER CONCERNE***** -->
            <div v-if="$store.state.admin == 1 || article.user_id == $store.state.userId" class="col-6 col-lg-9 text-right align-self-center">
              <div>
                <b-button v-b-modal="'modal-' + article.id" variant="outline-danger">Supprimer Article</b-button>

                <b-modal hide-footer ok-title = "Supprimer" ok-variant = "danger" cancel-title = "Annuler" :id="'modal-' + article.id" title="Supprimer">
                  <p class="my-4">Etes vous sûr de vouloir supprimer l'article ?</p>
                  <div class="text-right">
                    <b-button variant="secondary" @click="$bvModal.hide('modal-' + article.id)">Annuler</b-button>
                    <b-button @click="deleteArticle(index, article.id)" class="ml-2" variant="danger">Supprimer Article</b-button>
                  </div>
                </b-modal>
              </div>
            </div>

            <div v-if="article.last_comm" class="col-12 text-right">
              <small>Dernier commentaire: le {{ article.last_comm | moment("DD/MM/YYYY à HH:mm:ss") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
const axios = require('axios');
export default {
  name: 'Article',
  data() {
    return {
      articles: [],
      lastCommentaire: [],
      totalArticle: [],
      totalCommentaire: []
    }
  },
  mounted() {
    axios.get(`http://localhost:3000/api/auth/allArticle`)
    .then((response) => {
      this.articles = response.data
    })
    axios.get(`http://localhost:3000/api/auth/totalArticle`)
    .then((response) => {
      this.totalArticle = response.data[0].total
    })
    this.lastComm();
  },
  methods: {
    post() {
      this.$router.push({ name: 'PostArticle'})
    },
    deleteArticle(index, id) {
      axios.delete(`http://localhost:3000/api/auth/oneArticle/${id}`)
      .then((response) => {
        // ON MET A JOUR LA DATA ARTICLES EN SUPPRIMANT ELEMENT DE L'ARRAY
        this.articles.splice(index, 1);
        // ON MET A JOUR LA DATA TOTAL ARTICLE AVEC -1
        this.totalArticle = this.totalArticle - 1;
        // ON REFAIT UNE REQUETE POUR AVOIR LE DERNIER COMMENTAIRE
        this.lastComm();
        console.log(response.data);
      })
    },
    redirect(userId) {
      this.$router.push({ name: 'User', params: { id: userId }})
    },
    lastComm() {
      axios.get(`http://localhost:3000/api/auth/lastCommentaire`)
      .then((response) => {
        this.lastCommentaire = response.data
      })
    }
  }
}
</script>

<style scoped>
.pointer:hover {
  cursor: pointer;
  color: #1ab394;
}

.white-bg {
    background-color: #ffffff;
}

.forum-post-container .media {
  margin: 10px 10px 10px 10px;
  padding: 20px 10px 20px 10px;
  border-bottom: 1px solid #f1f1f1;
}

.media-body > .media {
  background: #f9f9f9;
  border-radius: 3px;
  border: 1px solid #f1f1f1;
}

.forum-item {
  margin: 10px 0;
  padding: 10px 0 20px;
  border-bottom: 1px solid #f1f1f1;
}
.views-number {
  font-size: 15px;
  line-height: 18px;
  font-weight: 400;
}
.forum-container,
.forum-post-container {
  padding: 30px !important;
}
.forum-item small {
  color: #999;
}
.forum-item .forum-sub-title {
  color: #999;
  margin-left: 50px;
}
.forum-title {
  margin: 15px 0 15px 0;
}

.forum-desc {
  color: #999;
}

a.forum-item-title {
  color: inherit;
  display: block;
  font-size: 18px;
  font-weight: 600;
}
a.forum-item-title:hover {
  color: inherit;
}

.forum-item.active .fa {
  color: #1ab394;
}
.forum-item.active a.forum-item-title {
  color: #1ab394;
}

.m-b-sm {
    margin-bottom: 10px;
}
</style>