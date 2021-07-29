<template>
<div class="container">
  <div class="row">
    <div class="col-lg-12">
      <div class="wrapper wrapper-content animated fadeInRight">

        <div class="m-b-sm border-bottom">
          <div class="p-xs">
            <h2>Bienvennue dans le forum</h2>
          </div>
        </div>
        <router-link v-if="lastCommentaire.length" :to="{name: 'Commentaire', params: {id: lastCommentaire[0].article_id} }" class="text-decoration-none">
          <p>Dernier commentaire: {{ lastCommentaire[0].prenom }} {{ lastCommentaire[0].nom }} sur l'article "{{ lastCommentaire[0].titre }}" le {{ lastCommentaire[0].date | moment("DD/MM/YYYY HH:mm:ss") }}</p>
        </router-link>
        <div class="text-right">
          <button v-on:click="post()" class="m-0 btn btn-outline-primary">Poster un article</button>
        </div>

        <div class="forum-container">

          <div class="forum-title">
            <div v-if="totalArticle.length" class="pull-right">
              <p>Total d'article: {{ totalArticle }}</p>
            </div>
          </div>

          <div v-for="(article,index) in articles" :key="article.id" class="row forum-item active" >
            <div class="col-md-9">
              <router-link :to="{name: 'Commentaire', params: {id: article.id} }" class="forum-item-title"> {{ article.titre }}</router-link>
              <router-link :to="{name: 'Commentaire', params: {id: article.id} }" class="forum-sub-title text-decoration-none">{{ article.contenu }}</router-link>
              <!-- <div class="forum-sub-title">{{article.contenu}}</div> -->
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
            <div v-if="admin == 1" class="col-6 col-lg-9 text-right align-self-center">
              <div>
                <b-button v-b-modal="modalId(article.id)" variant="outline-danger">Supprimer Article</b-button>

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
      totalCommentaire: [],
      admin: []
    }
  },
  mounted() {
    axios.get(`http://localhost:3000/api/auth/allArticle`)
    .then((response) => {
      this.articles = response.data
    })
    axios.get(`http://localhost:3000/api/auth/lastCommentaire`)
    .then((response) => {
      this.lastCommentaire = response.data
      console.log("le resultat")
      console.log(this.lastCommentaire)
    })
    axios.get(`http://localhost:3000/api/auth/totalArticle`)
    .then((response) => {
      console.log(response)
      this.totalArticle = response.data[0].total
      console.log(this.totalArticle)
      console.log("le length")
    })
    this.admin = localStorage.getItem('admin')
    console.log("admin ici")
    console.log(this.admin)
  },
  methods: {
    post() {
      this.$router.push({ name: 'PostArticle'})
    },
    modalId(id) {
      return "modal-" + id
    },
    deleteArticle(index, id) {
      axios.delete(`http://localhost:3000/api/auth/oneArticle/${id}`)
      .then((response) => {
        console.log(response.data);
        this.articles.splice(index, 1);
        this.totalArticle = this.totalArticle - 1;
      })
    },
    redirect(userId) {
      this.$router.push({ name: 'User', params: { id: userId }})
    },
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