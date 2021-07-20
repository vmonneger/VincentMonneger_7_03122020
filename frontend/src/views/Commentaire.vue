<template>
<section class="container">
    
          
        <div class="row clearfix">
    <div class="col-md-12 column">
        <div class="panel panel-default">

            <section class="row panel-body">
                <section class="col-md-9">
                    <h2> <i class="fa fa-smile-o"></i> Whats the name of the element of this website?</h2>
                    <hr>
                    Hi, I'm wondering whats the name of the element that appaers in this website: Startupbus

                    Im talking about the images that remain static in the back and change everytime a new section is reached.

                    Is there a framework that does this?

                    Thank you for helping 
                </section>
                
                <section id="user-description" class="col-md-3 ">
                    <section class="well">
                <div class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-cricle"></i>MOHAMMAD SHARIFI<span class="caret"></span></a>
                </div>
                    </section>
                </section>
                
            </section>
            <div class="panel-footer">
                <div class="row">
                <section class="col-md-4">
                    <span class="fa-stack">
                        <i class="fa fa-quote-right fa-stack-1x"></i>
                        <i class="fa fa-comment-o fa-lg fa-stack-1x"></i>
                    </span><a href="#"> Reply With Quote </a> |
                    <i class="fa fa-mail-reply "></i><a href="#"> Reply </a>|
                    <i class="fa fa-edit "></i><a href="#"> Edit Post </a>
                </section>
            </div>
            </div>
        </div>
    </div>
</div>
        
        
        
    </section>

</template>

<script>
const axios = require('axios');
export default {
  data() {
    return {
      commentaires: []
    }
  },
  mounted() {
    axios.get(`http://localhost:3000/api/auth/allCommentaire/${this.$route.params.id}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((response) => {
      this.commentaires = response.data
      console.log("this.commentaires")
    })
  }
}
</script>

<style scoped>
/* CSS used here will be applied after bootstrap.css */
.fa-heart{
  color:#e74c3c;
}
  [class^="fa fa-star"]{
    color:#f1c40f;
  }
.fa-quote-right{
  font-size:.5em;
  }
section.panel-title{
    padding:15px;
    padding-top:0;
  }
  #user-description{
    height:100%;
   border-left:2px solid #444; 
    margin:0 auto;
    text-align:center;
  }
 figure img{
    display :inline !important;
  }
  h4.online:before{
     background-color:green;
      height:10px;
      width:10px;
      border: 2px solid #11f464;
    }
dt{
   text-align:left !important; 
     width:37% !important;
    }
    dd{
     margin-left:2% !important;
    }
    
.panel-footer{
    width:100%;
    min-height:40px;
  }
      

</style>