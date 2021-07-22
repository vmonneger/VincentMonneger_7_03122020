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
                    <button v-on:click.prevent="onSubmit" type="submit" class="btn btn-outline-primary">Supprimer votre compte</button>
                </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <h2>Supprimer ses articles</h2>
        <section v-for="(article, index) in articles" :key="article.id" class="col-12 border p-0 rounded mb-4">
            <div class="d-flex justify-content-between bg-light">
                <div>
                    <p v-on:click="redirect(article.article_id)" class="m-0">Article: {{ article.titre}}</p>
                </div>
                <div>
                    <p class="m-0">{{ article.date }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-9">
                    <p class="mt-4">{{ article.contenu }}</p>
                </div>
                <div class="col-3 text-center border-left">
                    <p>{{ article.prenom }} {{article.nom}}</p>
                </div>
            </div>
            <div class="bg-light text-right">
                <button v-on:click="deleteArticle(index, article.id)" class="m-0 btn btn-outline-danger">Supprimer article</button>
            </div>
        </section>

        <h2 class="mt-5">Supprimer ses commentaires</h2>
        <section v-for="(commentaire, index) in commentaires" :key="commentaire.id" class="col-12 border p-0 rounded mb-4">
            <div class="d-flex justify-content-between bg-light">
                <div>
                    <p v-on:click="redirect(commentaire.article_id)" class="m-0">Article: {{ commentaire.titre}}</p>
                </div>
                <div>
                    <p class="m-0">{{ commentaire.date }}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-9">
                    <p class="mt-4">{{ commentaire.message }}</p>
                </div>
                <div class="col-3 text-center border-left">
                    <p>{{ commentaire.prenom }} {{commentaire.nom}}</p>
                </div>
            </div>
            <div class="bg-light text-right">
                <button v-on:click="deleteCommentaire(index, commentaire.id)" class="m-0 btn btn-outline-danger">Supprimer commentaire</button>
            </div>
        </section>
    </div>
</div>
</template>

<script>
const axios = require('axios');
export default {
    data() {
        return {
            user: [],
            commentaires: [],
            articles: [],
        }
    },
    mounted() {
        axios.get(`http://localhost:3000/api/auth/account/${localStorage.getItem('user_id')}`)
        .then((response) => {
        this.user = response.data
        console.log(this.user)
        });
        axios.get(`http://localhost:3000/api/auth/oneCommentaire/${localStorage.getItem('user_id')}`)
        .then((response) => {
        this.commentaires = response.data
        console.log("LEs commentaires en dessous")
        console.log(this.commentaires)
        });
        axios.get(`http://localhost:3000/api/auth/allArticleUser/${localStorage.getItem('user_id')}`)
        .then((response) => {
        this.articles = response.data
        console.log("les articles juste en dessous")
        console.log(this.articles)
        });
    },
    methods: {
        onSubmit() {
            axios.delete(`http://localhost:3000/api/auth/account/${localStorage.getItem('user_id')}`)
            .then((response) => {
            console.log(response.data);
            localStorage.clear();
            this.$router.push('Signup');
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
        }
    }
}
</script>