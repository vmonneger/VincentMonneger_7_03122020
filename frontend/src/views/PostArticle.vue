<template>
<section class="container">
    <h1 class="text-center">La page pour post article</h1>
    <form v-on:submit.prevent="onSubmit">
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Ecrivez le titre</label>
            <input v-model="form.titre" class="form-control mb-5" type="text">
            <label for="exampleFormControlTextarea1">Ecrivez votre commentaire</label>
            <textarea v-model="form.contenu" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
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
                contenu: [],
                titre: [],
            }
        }
    },
    methods: {
        onSubmit() {
            const data = {
                user_id: localStorage.getItem('user_id'),
                titre: this.form.titre,
                contenu: this.form.contenu
            }
            console.log(data);
            axios.post(`http://localhost:3000/api/auth/postArticle`, data)
            .then((response) => {
                console.log(response.data);
                this.$router.push({ name: 'Article'})
            })
        }
    }
}
</script>