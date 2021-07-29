<template>
<div v-if="user.length" class="container">
    <div class="d-flex justify-content-center mt-5">
        <div class="card">
            <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
                    <div class="mt-3">
                        <h1>{{ user[0].prenom }} {{ user[0].nom }}</h1>
                        <p class="text-muted font-size-sm">{{ user[0].email }}</p>
                        <p v-if="user[0].admin == 1" class="text-muted font-size-sm">Admin</p>
                        <button v-if="admin == 1" @click="Admin()" type="button" class="btn btn-outline-success mb-3 mr-2">Admin</button>
                        <button v-if="admin == 1" @click="AdminNo()" type="button" class="btn btn-outline-dark mb-3">Non admin</button>
                        <div v-if="admin == 1 || user[0].id == userId ">
                            <div>
                                <b-button v-b-modal="modalId(user[0].id)" variant="outline-danger">Supprimer compte</b-button>

                                <b-modal hide-footer ok-title = "Supprimer" ok-variant = "danger" cancel-title = "Annuler" :id="'modal-' + user[0].id" title="Supprimer">
                                <p class="my-4">Etes vous sûr de vouloir supprimer votre compte ? 
                                    <br> Si oui, penser à supprimer vos articles et commentaires si vous voulez qu'ils ne restent pas enregistrés.
                                </p>
                                <div class="text-right">
                                    <b-button variant="secondary" @click="$bvModal.hide('modal-' + user[0].id)">Annuler</b-button>
                                    <b-button @click="deleteUser()" class="ml-2" variant="danger">Supprimer compte</b-button>
                                </div>
                                </b-modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <h2 v-if="articles.length" class="text-center mt-5 mb-5">Articles</h2>
        <div v-for="(article, index) in articles" :key="article.id" class="row border p-0 rounded mb-4">
            <div class="col-12 d-flex justify-content-between bg-light">
                <p v-on:click="redirect(article.id)" class="m-0 font-weight-bold pointer">Article: {{ article.titre}}</p>
                <p class="m-0">{{ article.date | moment("DD/MM/YYYY HH:mm:ss") }}</p>
            </div>
            <div class="col-md-9">
                <p class="mt-4">{{ article.contenu }}</p>
            </div>
            <div class="col-md-3 text-center border-left align-self-center">
                <div v-if="admin == 1 || user[0].id == userId ">
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
            </div>
        </div>

        <h2 v-if="commentaires.length" class="mt-5 mb-5 text-center">Commentaires</h2>
        <div v-for="(commentaire, index) in commentaires" :key="commentaire.id" class="row border p-0 rounded mb-4">
            <div class="col-12 d-flex justify-content-between bg-light">
                <p v-on:click="redirect(commentaire.article_id)" class="m-0 font-weight-bold pointer">Article: {{ commentaire.titre}}</p>
                <p class="m-0">{{ commentaire.date | moment("DD/MM/YYYY HH:mm:ss") }}</p>
            </div>
            <div class="col-md-9">
                <p class="mt-4">{{ commentaire.message }}</p>
            </div>
            <div class="col-md-3 text-center border-left align-self-center">
                <div v-if="admin == 1 || user[0].id == userId ">
                    <div>
                        <b-button v-b-modal="modalId(commentaire.id)" variant="outline-danger">Supprimer Commentaire</b-button>

                        <b-modal hide-footer ok-title = "Supprimer" ok-variant = "danger" cancel-title = "Annuler" :id="'modal-' + commentaire.id" title="Supprimer">
                        <p class="my-4">Etes vous sûr de vouloir supprimer l'article ?</p>
                        <div class="text-right">
                            <b-button variant="secondary" @click="$bvModal.hide('modal-' + commentaire.id)">Annuler</b-button>
                            <b-button @click="deleteArticle(index, commentaire.id)" class="ml-2" variant="danger">Supprimer Commentaire</b-button>
                        </div>
                        </b-modal>
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
    name: 'User',
    data() {
        return {
            user: [],
            commentaires: [],
            articles: [],
            userId: [],
            admin: [],
        }
    },
    mounted() {
        this.allData(this.$route.params.id)
    },
    beforeRouteUpdate(to, from, next) {
        this.allData(to.params.id)
        next()
    },
    methods: {
        deleteUser() {
            axios.delete(`http://localhost:3000/api/auth/account/${this.$route.params.id}`)
            .then((response) => {
                console.log(response.data);
                localStorage.clear();
                this.$router.push({ name: 'Signup' });
            })
        },
        deleteCommentaire(index, id) {
            axios.delete(`http://localhost:3000/api/auth/oneCommentaire/${id}`)
            .then((response) => {
                console.log(response.data);
                this.commentaires.splice(index, 1)
            })
        },
        deleteArticle(index, id) {
            axios.delete(`http://localhost:3000/api/auth/oneArticle/${id}`)
            .then((response) => {
                console.log(response.data);
                this.articles.splice(index, 1)
            })
        },
        redirect(id) {
            this.$router.push({ name: 'Commentaire', params: { id: id }})
        },
        modalId(id) {
            return "modal-" + id
        },
        allData(id) {
            axios.get(`http://localhost:3000/api/auth/account/${id}`)
            .then((response) => {
                this.user = response.data
                console.log(this.user)
            });
            axios.get(`http://localhost:3000/api/auth/oneCommentaire/${id}`)
            .then((response) => {
                this.commentaires = response.data
                console.log("LEs commentaires en dessous")
                console.log(this.commentaires)
            });
            axios.get(`http://localhost:3000/api/auth/allArticleUser/${id}`)
            .then((response) => {
                this.articles = response.data
                console.log("les articles juste en dessous")
                console.log(this.articles)
            });
            this.admin = localStorage.getItem('admin');
            console.log("admin ici")
            console.log(this.admin)
            this.userId = localStorage.getItem('user_id');
            console.log("user ici")
            console.log(this.userId)
        },
        Admin() {
            axios.patch(`http://localhost:3000/api/auth/account/${this.$route.params.id}`, {admin: 1})
            .then((response) => {
                console.log(response.data);
                this.user[0].admin = 1;
                this.admin = 1;
            });
        },
        AdminNo() {
            axios.patch(`http://localhost:3000/api/auth/account/${this.$route.params.id}`, {admin: 0})
            .then((response) => {
                console.log(response.data);
                this.user[0].admin = 0;
                this.admin = 0;
                localStorage.setItem('admin', 0)
            });
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

