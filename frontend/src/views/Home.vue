<template>
  <div class="container text-center">
    <img src="../assets/icon-left-font.png" class="img-fluid size-img" alt="">
    <div class="row btn-center">
        <div class=" col-12 col-sm-6 mb-3 mb-sm-0 wrapper">
            <router-link :to="{name: 'Signup' }"><span>Signup</span></router-link>
        </div>
        <div class="col-12 col-sm-6 wrapper">
            <router-link :to="{name: 'Login' }"><span>Login</span></router-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  }
}
</script>

<style scoped>
.size-img {
    max-height: 500px;
}
.btn-center {
    text-align: -webkit-center;
}
HTML CSSResult Skip Results Iframe
EDIT ON

.wrapper{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

a{
  display: block;
  width: 200px;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  font-family: sans-serif;
  text-decoration: none;
  color: #333;
  border: 2px solid #333;
  letter-spacing: 2px;
  text-align: center;
  position: relative;
  transition: all .35s;
}

a span{
  position: relative;
  z-index: 2;
}

a:after{
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: #FD2D01;
  transition: all .35s;
}

a:hover{
  color: #fff;
}

a:hover:after{
  width: 100%;
}
</style>