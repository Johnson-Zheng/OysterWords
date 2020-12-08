<template>
  <div id="root">

    <div id="header_bar">
      <img id="face" alt="头像"/>
      <p>{{userId}}{{username}}</p>
      <p>挑战胜场：{{winCnt}}</p>
    </div>

    <div id="content">
      <button class="btn1">创建房间</button>
      <button class="btn1">加入房间</button>
      <button class="btn2">排行榜</button>
    </div>

    <copyright></copyright>

  </div>
</template>

<script>
  import copyright from "../components/footer/copyright";
  export default {
        name: "index",
    components:{
          copyright,
    },

      data(){

        return{
          userId:0,
          username:"test",
          winCnt:1,
          faceId:0,
          score:0,

        }
      },
      mounted(){
          this.getUserData();
      },
      methods:{
          getUserData(){
            this.userId = localStorage.getItem("userId");
            this.username = localStorage.getItem("username");
            this.winCnt = localStorage.getItem("winCnt");
            this.score = localStorage.getItem("score");

          }
      }
    }

</script>

<style scoped>
  #root{
    height: 700px;
    width: 400px;
    background-color: #FFCE7D;
    text-align: center;
  }
  #header_bar{
    background-color: #E6AA54;
    height: 100px;
    width: 350px;
    margin: 50px 25px;
  }

  #header_bar p{
    display: inline;
    font-size: 1.5em;
    padding: 20px;
    line-height: 100px;
  }

  #content{
    height: 450px;
  }

  .btn1{
    height:100px;
    margin: 20px;
    width: 150px;
  }

  .btn2{
    height: 100px;
    width: 300px;
    margin: 20px;
  }


</style>
