<template>
  <div id="root">
    <header>
      <h1>HOME PAGE</h1>
      <h2>首页</h2>
    </header>
    <div id="container" style="background-color: #98d4f3;height: calc(100vh - 190px)">
      <div class="fish" id="fish"></div>
      <div class="fish" id="fish2"></div>
      <div class="fish" id="fish3"></div>
      <div id="header_bar">
        <el-avatar v-if="faceId===0"  fit="cover" icon="el-icon-user-solid"></el-avatar>
        <el-avatar v-if="faceId!==0"  fit="cover" :src="faceURL"></el-avatar>
        <p>{{ username }}</p>
        <p>挑战胜场：{{ winCnt }}</p>
      </div>

      <div id="content">
        <el-button class="btn1" @click="createRoom()">创建房间</el-button>
        <el-button class="btn1" @click="open()">加入房间</el-button>
        <el-button class="btn1" @click="self()">个人信息</el-button>
        <el-button class="btn1" @click="rankList()">排行榜</el-button>
      </div>

    </div>

    <copyright></copyright>

  </div>
</template>

<script>
import copyright from "../components/footer/copyright";
import httpServer from "../global/httpServer";
import * as URL from "../global/interfaceURL";

export default {
  name: "index",
  components: {
    copyright,
  },

  data() {

    return {
      userId: 0,
      username: "test",
      winCnt: 1,
      faceId: 0,
      score: 0,
      faceURL:"../static/faces/f1.jpg",

    }
  },
  mounted() {
    this.getUserData();

  },
  methods: {
    //获得用户信息
    getUserData() {
      this.userId = localStorage.getItem("userId");
      this.username = localStorage.getItem("username");
      this.winCnt = localStorage.getItem("winCnt");
      this.score = localStorage.getItem("score");
      this.faceId = localStorage.getItem("faceId");
      this.faceURL = "../static/faces/f"+this.faceId+".jpg";

      this.$axios.get(URL.getQuestions, {params: {roomId: 10}})
        .then((res) => {
          let questionList = res.data.data ;
          console.log(questionList[0]);

        })

    },
    //创建房间
    createRoom() {
      this.$axios.get(URL.createRoom, {params: {hostId: this.userId}})
        .then((res) => {
          let code = res.data.respCode
          switch (code) {
            case 1:
              let roomId = res.data.roomId;
              this.$message({
                message: '房间（ID'+roomId+'）创建成功，请将房间ID发送给好友',
                type: 'success'
              });
              this.$router.push({
                path:'/room',
                params:{
                  userIsHost:true,
                },
                query: {
                  roomId: roomId,
                }
              });
              break;

            default:
              this.$message.error("系统异常");
              break;
          }
        })
    },
    //进入房间
    enterRoom(roomId) {
      this.$axios.get(URL.enterRoom, {params: {guestId: this.userId, roomId: roomId}})
        .then((res) => {
          let code = res.data.respCode
          switch (code) {
            case 1:
              this.$message({
                message: res.data.msg,
                type: 'success',
              });
              this.$router.push({
                path:'/room',
                query:{
                  roomId: roomId,
                },
                params:{
                  userIsHost:false,
                },
              });
              break;
            case 2:
              this.$message.error(res.data.msg);
              break;

            default:
              this.$message.error("系统异常");
              break;
          }
        })
    },
    //进入房间提示框（输入房间号）
    open() {
      this.$prompt('请输入房间号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',

      }).then(({value}) => {
        this.enterRoom(value);
      })
    },
    //进入排行榜
    rankList(){
      this.$router.push('/ranking_list');
    },
    //个人信息
    self(){
      this.$router.push('/self_information');
    }
  }
}

</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Sniglet|Raleway:900);
html,body{
  overflow: hidden !important;
}
::-webkit-scrollbar {
  width: 0;
}
#root  {
  min-height: 100%;
  overflow: hidden;
  text-align: center;
}
header{
  height: 160px;
  background: url('../assets/golf.png') repeat-x bottom;
}
h1{
  font-weight: bold;
  font-size: 3.6em;
  font-family: 'Raleway', sans-serif;
  margin: 0 auto;
  margin-top: 30px;
  width: 500px;
  color: #F90;
  text-align: center;
}
h2{
  font-weight: 700;
  font-size: 2em;
  letter-spacing: 10px;
  margin: 0 auto;
  color: #F90;
  text-align: center;
}

/* Animation webkit */
@-webkit-keyframes myfirst
{
  0% {
    margin-left: -235px;
    transform: scale(1.2);
  }
  90% {
    margin-left: 100%;
    transform: scale(1.0);
  }
  100% {
    margin-left: 100%;
  }
}

/* Animation */
@keyframes myfirst
{
  0% {margin-left: -235px}
  70% {margin-left: 100%;}
  100% {margin-left: 100%;}
}

.fish{
  background:url("../assets/fish.png");
  width: 235px;
  height: 104px;
  margin-left: -235px;
  position: absolute;
  animation: myfirst 12s;
  -webkit-animation: myfirst 12s;
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  -webkit-animation-timing-function: ease-in-out;
}

#fish{
  top: 30%;
}

#fish2{
  top: 50%;
  animation-delay: 3s;
  -webkit-animation-delay: 3s;
}

#fish3{
  top: 80%;
  animation-delay: 8s;
  -webkit-animation-delay: 8s;
}

#header_bar {
  left: 50%;
  background: white;
  top:40%;
  transform: translate(-50%,-50%);
  width:450px;
  position: absolute;
  transition: all ease-in-out 0.3s;
  height:max-content;
  box-shadow:0 5px 20px rgba(0,0,0,0.07);
  opacity:1;
  border-radius:20px;
}

#header_bar p {
  display: inline;
  font-size: 1.5em;
  padding: 20px;
  line-height: 100px;
}

#content {
  left: 50%;
  background: white;
  top:70%;
  transform: translate(-50%,-50%);
  width:450px;
  position: absolute;
  transition: all ease-in-out 0.3s;
  height:max-content;
  box-shadow:0 5px 20px rgba(0,0,0,0.07);
  opacity:1;
  border-radius:20px;
}

.btn1 {
  height: 60px;
  margin: 20px;
  width: 150px;
  display: inline-block;
  border-radius: 20px;
}
</style>
