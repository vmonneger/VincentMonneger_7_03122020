<template>
<div v-if="user.length" class="container">
    <div class="d-flex justify-content-center mt-5">
        <div class="card">
            <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                    <!-- ********LE PROFIL DU USER******* -->
                    <img src="https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png" alt="avatar" class="rounded-circle" width="150">
                    <div class="mt-3">
                        <h1>{{ user[0].prenom }} {{ user[0].nom }}</h1>
                        <p class="text-muted font-size-sm">{{ user[0].email }}</p>
                        <!-- ******LA MENTION ADMIN QUI APPARAIT SEULEMENT SI LA PAGE DE CE USER EST ADMIN****** -->
                        <p v-if="user[0].admin == 1" class="text-muted font-size-sm">Admin</p>
                        <!-- *****LES BUTTON POUR DEVENIR ADMIN QUI APPARAISSENT SEULEMENT SI L'USER CONNECTE EST UN ADMIN****** -->
                        <button v-if="$store.state.admin == 1" @click="Admin()" type="button" class="btn btn-outline-success mb-3 mr-2">Admin</button>
                        <button v-if="$store.state.admin == 1" @click="AdminNo()" type="button" class="btn btn-outline-dark mb-3">Non admin</button>
                        <!-- ******LES BUTTON MODAL QUI APPARAISSENT SEULEMENT SI ADMIN OU L'USER CONNECTE EST SUR SA PAGE PROFIL******* -->
                        <div v-if="$store.state.admin == 1 || user[0].id == $store.state.userId ">
                            <div>
                                <b-button v-b-modal="'modalUser-' + user[0].id" variant="outline-danger">Supprimer compte</b-button>

                                <b-modal hide-footer ok-title = "Supprimer" ok-variant = "danger" cancel-title = "Annuler" :id="'modalUser-' + user[0].id" title="Supprimer">
                                <p class="my-4">Etes vous sûr de vouloir supprimer votre compte ? 
                                    <br> Si oui, penser à supprimer vos articles et commentaires si vous voulez qu'ils ne restent pas enregistrés.
                                </p>
                                <div class="text-right">
                                    <b-button variant="secondary" @click="$bvModal.hide('modalUser-' + user[0].id)">Annuler</b-button>
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
        <!-- ********LA BOUCLE SUR LES ARTICLES********* -->
        <h2 v-if="articles.length" class="text-center mt-5 mb-5">Articles</h2>
        <div v-for="(article, index) in articles" :key="article.id" class="row border p-0 rounded mb-4">
            <div class="col-12 d-flex justify-content-between bg-light">
                <p v-on:click="redirect(article.id)" class="m-0 font-weight-bold pointer">Article: {{ article.titre}}</p>
                <p class="m-0">{{ article.date | moment("DD/MM/YYYY HH:mm:ss") }}</p>
            </div>
            <div class="col-md-9">
                <img :src="article.image" class="img-fluid rounded mt-2" alt="">
                <p class="mt-4">{{ article.contenu }}</p>
            </div>
            <!-- ******LES BUTTON MODAL QUI APPARAISSENT SEULEMENT SI ADMIN OU L'USER CONNECTE EST SUR SA PAGE PROFIL******* -->
            <div class="col-md-3 text-center border-left align-self-center">
                <div v-if="$store.state.admin == 1 || user[0].id == $store.state.userId ">
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
            </div>
        </div>
        <!-- ********LA BOUCLE SUR LES COMMENTAIRES********* -->
        <h2 v-if="commentaires.length" class="mt-5 mb-5 text-center">Commentaires</h2>
        <div v-for="(commentaire, index) in commentaires" :key="commentaire.id" class="row border p-0 rounded mb-4">
            <div class="col-12 d-flex justify-content-between bg-light">
                <p v-on:click="redirect(commentaire.article_id)" class="m-0 font-weight-bold pointer">Article: {{ commentaire.titre}}</p>
                <p class="m-0">{{ commentaire.date | moment("DD/MM/YYYY HH:mm:ss") }}</p>
            </div>
            <div class="col-md-9">
                <p class="mt-4">{{ commentaire.message }}</p>
            </div>
            <!-- ******LES BUTTON MODAL QUI APPARAISSENT SEULEMENT SI ADMIN OU L'USER CONNECTE EST SUR SA PAGE PROFIL******* -->
            <div class="col-md-3 text-center border-left align-self-center">
                <div v-if="$store.state.admin == 1 || user[0].id == $store.state.userId">
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
        }
    },
    mounted() {
        this.allData(this.$route.params.id)
    },
    // AU CHANGEMENT DE L'ID DANS LA ROUTE PARAMS ON REFAIT UNE REQUETE POUR AVOIR LE USER
    beforeRouteUpdate(to, from, next) {
        this.allData(to.params.id)
        next()
    },
    methods: {
        deleteUser() {
            axios.delete(`http://localhost:3000/api/auth/account/${this.$route.params.id}`)
            .then((response) => {
                // ON NETTOYE LE LOCALSTORAGE
                localStorage.clear();
                // ET ON REDIRIGE VERS LE SIGNUP
                this.$router.push({ name: 'Signup' });
                console.log(response.data);
            })
        },
        deleteCommentaire(index, id) {
            axios.delete(`http://localhost:3000/api/auth/oneCommentaire/${id}`)
            .then((response) => {
                // ON SUPPRIME LE COMMENTAIRE DE LA DATA
                this.commentaires.splice(index, 1)
                console.log(response.data);
            })
        },
        deleteArticle(index, id) {
            axios.delete(`http://localhost:3000/api/auth/oneArticle/${id}`)
            .then((response) => {
                // ON SUPPRIME L'ARTICLE DE LA DATA
                this.articles.splice(index, 1)
                console.log(response.data);
            })
        },
        redirect(id) {
            this.$router.push({ name: 'Commentaire', params: { id: id }})
        },
        allData(id) {
            axios.get(`http://localhost:3000/api/auth/account/${id}`)
            .then((response) => {
                this.user = response.data
            });
            axios.get(`http://localhost:3000/api/auth/oneCommentaire/${id}`)
            .then((response) => {
                this.commentaires = response.data
            });
            axios.get(`http://localhost:3000/api/auth/allArticleUser/${id}`)
            .then((response) => {
                this.articles = response.data
            });
        },
        Admin() {
            axios.patch(`http://localhost:3000/api/auth/account/${this.$route.params.id}`, {admin: 1})
            .then((response) => {
                // ON ACTUALISE LE USER DANS LA DATA POUR LE PASSER ADMIN AVEC 1
                this.user[0].admin = 1;
                console.log(response.data);
            });
        },
        AdminNo() {
            axios.patch(`http://localhost:3000/api/auth/account/${this.$route.params.id}`, {admin: 0})
            .then((response) => {
                // ON ACTUALISE LE USER DANS LA DATA POUR LE PASSER NON ADMIN AVEC 0
                this.user[0].admin = 0;
                console.log(response.data);
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

