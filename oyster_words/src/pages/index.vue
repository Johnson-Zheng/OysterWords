<template>
  <div id="root">

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
              this.$message({
                message: '成功创建房间！',
                type: 'success'
              });
              // localStorage.setItem("hostName", this.username);
              // localStorage.setItem("hostScore", this.score);
              // localStorage.setItem("hostFaceId", this.faceId);
              // localStorage.setItem("hostId", this.userId);
              // localStorage.setItem("hostWinCnt", this.winCnt);
              let roomId = res.data.roomId;

              this.$router.push({
                path:'/room',
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
              // localStorage.setItem("guestName", this.username);
              // localStorage.setItem("guestScore", this.score);
              // localStorage.setItem("guestFaceId", this.faceId);
              // localStorage.setItem("guestId", this.userId);
              // localStorage.setItem("guestWinCnt", this.winCnt);
              // localStorage.setItem("roomId", roomId);
              this.$router.push({
                path:'/room',
                query: {
                  roomId: roomId,
                }
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
#root {
  height: 700px;
  width: 400px;
  background-color: #FFCE7D;
  text-align: center;
}

#header_bar {
  background-color: #E6AA54;
  height: 100px;
  width: 350px;
  margin: 50px 25px;
}

#header_bar p {
  display: inline;
  font-size: 1.5em;
  padding: 20px;
  line-height: 100px;
}

#content {
  height: 450px;
}

.btn1 {
  height: 100px;
  margin: 20px;
  width: 150px;
}




</style>
