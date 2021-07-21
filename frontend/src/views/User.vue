<template>
<div v-if="user.length" class="container">
    <div class="d-flex justify-content-center mt-5">
        <div class="card">
            <div class="card-body">
                <div class="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
                <div class="mt-3">
                    <h4>{{ user[0].prenom }} {{ user[0].nom }}</h4>
                    <p class="text-muted font-size-sm">{{ user[0].email }}</p>
                    <button v-on:click.prevent="onSubmit" type="submit" class="btn btn-outline-primary">Supprimer votre compte</button>
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
    data() {
        return {
            user: []
        }
    },
    mounted() {
        axios.get(`http://localhost:3000/api/auth/account/${localStorage.getItem('user_id')}`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        })
        .then((response) => {
        this.user = response.data
        console.log(this.user)
        })
    },
    methods: {
        onSubmit() {
            axios.delete(`http://localhost:3000/api/auth/account/${localStorage.getItem('user_id')}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
            })
            .then((response) => {
            console.log(response);
            localStorage.clear();
            this.$router.push('Signup');
            })
        }
    }
}
</script>