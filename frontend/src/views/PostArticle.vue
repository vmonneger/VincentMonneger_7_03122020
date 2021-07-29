<template>
<div class="container">
    <h1 class="text-center">Poster un article</h1>
    <form v-on:submit.prevent="onSubmit">
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Ecrivez le titre</label>
            <input v-model="form.titre" maxlength="50" class="form-control mb-5" type="text">
            <div class="form-group">
                <label for="exampleFormControlFile1">Vous pouvez poster une image</label>
                <input type="file" v-on:change="handleFileUpload" ref="file" class="form-control-file" id="exampleFormControlFile1">
            </div>
            <label for="exampleFormControlTextarea1">Ecrivez votre commentaire</label>
            <textarea v-model="form.contenu" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <div class="text-center">
        <button type="submit" class="btn btn-outline-primary">Envoyer</button>
        </div>
    </form>
</div>
</template>

<script>
const axios = require('axios');
export default {
    data() {
        return {
            form: {
                contenu: [],
                titre: [],
                image: ''
            }
        }
    },
    methods: {
        onSubmit() {
            let formData = new FormData();
            formData.append('user_id', localStorage.getItem('user_id'));
            formData.append('titre', this.form.titre);
            formData.append('contenu', this.form.contenu);
            formData.append('image', this.form.image);

            // const dataArticle = {
            //     user_id: localStorage.getItem('user_id'),
            //     titre: this.form.titre,
            //     contenu: this.form.contenu,
            //     image : formData
            // }
            axios.post(`http://localhost:3000/api/auth/postArticle`, formData,{
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log(response);
                this.$router.push({ name: 'Article'})
            })
        },
        handleFileUpload(event) {
            console.log(event)
            this.form.image = this.$refs.file.files[0];
        }
    }
}
</script>