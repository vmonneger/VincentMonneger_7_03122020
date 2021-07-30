<template>
<section class="container">
    <h1 class="text-center">Poster un commentaire</h1>
    <form v-on:submit.prevent="onSubmit">
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Ecrivez votre commentaire</label>
            <textarea v-model="form.commentaire" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <div class="text-center">
        <button type="submit" class="btn btn-outline-primary">Envoyer</button>
        </div>
    </form>
</section>
</template>

<script>
const axios = require('axios');
export default {
    data() {
        return {
            form: {
                commentaire: ''
            }
        }
    },
    methods: {
        onSubmit() {
            const data = {
                article_id: this.$route.params.id,
                user_id: this.$store.state.userId,
                message: this.form.commentaire
            }
            axios.post(`http://localhost:3000/api/auth/postCommentaire`, data)
            .then((response) => {
                this.$router.push({ name: 'Commentaire', params: { id: this.$route.params.id }})
                console.log(response.data);
            })
        }
    }
}
</script>