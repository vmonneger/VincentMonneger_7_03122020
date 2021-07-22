<template>
<section class="container">
    <h1 class="text-center">La page pour post commentaire</h1>
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
                user_id: localStorage.getItem('user_id'),
                message: this.form.commentaire
            }
            console.log(data);
            axios.post(`http://localhost:3000/api/auth/postCommentaire`, data)
            .then((response) => {
                console.log(response.data);
                this.$router.push({ name: 'Commentaire', params: { id: this.$route.params.id }})
            })
        }
    }
}
</script>