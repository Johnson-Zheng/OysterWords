<template>
  <div id="root">
    <h1>对战房间</h1>
    <p>{{ header_content }}</p>
    <p>房间{{ roomId }}</p>
    <div id="container">
      <div class="user_info">
        <el-avatar v-if="hostFaceId===0" size="100" fit="cover" icon="el-icon-user-solid"></el-avatar>
        <el-avatar v-if="hostFaceId!==0" size="100" fit="cover" :src="hostFaceURL"></el-avatar>
        <p>{{ hostName }}</p>
        <p v-if="roomStatus===1">当前分数：{{ hostCurScore }}</p>
      </div>
      <p id="vs">VS</p>
      <div class="user_info">
        <el-avatar v-if="guestFaceId===0" size="100" fit="cover" icon="el-icon-user-solid"></el-avatar>
        <el-avatar v-if="guestFaceId!==0" size="100" fit="cover" :src="guestFaceURL"></el-avatar>
        <p>{{ guestName }}</p>
        <p v-if="roomStatus===1">当前分数：{{ guestCurScore }}</p>
      </div>
    </div>
    <div v-if="roomStatus===1" id="question">
      <div id="questionStem">{{ questionStem }}</div>
      <div id="selectItem">
        <el-radio v-model="radio1" label="1" border>{{ selectItem[0] }}</el-radio>
        <el-radio v-model="radio1" label="2" border>{{ selectItem[1] }}</el-radio>
        <el-radio v-model="radio1" label="3" border>{{ selectItem[2] }}</el-radio>
        <el-radio v-model="radio1" label="4" border>{{ selectItem[3] }}</el-radio>
      </div>
    </div>
    <el-button v-if="roomStatus===0" @click="exit()">退出房间</el-button>
    <el-button v-if="roomStatus===1" @click="end()">退出比赛</el-button>


    <copyright></copyright>
  </div>

</template>

<script>
import copyright from "../components/footer/copyright";
import * as URL from "../global/interfaceURL";

export default {
  name: "room",
  components: {
    copyright,
  },

  data() {
    return {
      //房间信息
      header_content: "等待好友进入...",
      roomId: 0,
      loopId: null,
      roomStatus: 0,

      //房主信息
      hostId: 0,
      hostName: "",
      hostCurScore: 0,
      hostFaceId: 0,
      hostFaceURL: "",
      hostStatus: 0,

      //加入者信息
      guestId: 0,
      guestName: "等待用户加入...",
      guestCurScore: 0,
      guestFaceId: 0,
      guestFaceURL: "",
      guestStatus: 0,

      //题目信息
      questionStem: "测试题目",
      selectItem:[
        "A:示例选项A",
        "B:示例选项B",
        "C:示例选项C",
        "D:示例选项D",
      ],


    }

  },
  created() {
    this.roomId = this.$route.query.roomId;
    this.dataInit();
  },
  mounted() {
    this.loop();


  },
  methods: {
    //初始化房间信息
    dataInit() {
      this.$axios.get(URL.queryRoom, {params: {roomId: this.roomId}})
        .then((res) => {

          //初始化host的信息
          this.hostStatus = res.data.data.hostStatus;
          this.hostId = res.data.data.hostId;
          this.hostName = res.data.data.hostInfo.username;
          this.hostFaceId = res.data.data.hostInfo.faceId;
          this.hostCurScore = res.data.data.hostScore;
          this.hostFaceURL = "../static/faces/f" + this.hostFaceId + ".jpg";
          //初始化guest的信息
          this.guestStatus = res.data.data.guestStatus;
          this.guestId = res.data.data.guestId;
          this.guestName = res.data.data.guestInfo.username;
          this.guestFaceId = res.data.data.guestInfo.faceId;
          this.guestCurScore = res.data.data.guestScore;
          this.guestFaceURL = "../static/faces/f" + this.hostFaceId + ".jpg";

        })

    },
    //监听房间状态
    check() {
      this.$axios.get(URL.queryRoom, {params: {roomId: this.roomId}})
        .then((res) =>{

          if (this.hostStatus === 1 && res.data.data.guestStatus === 0) {
            this.hostStatus = res.data.data.hostStatus;
            this.hostId = res.data.data.hostId;
            this.hostName = res.data.data.hostInfo.username;
            this.hostFaceId = res.data.data.hostInfo.faceId;
            this.hostCurScore = res.data.data.hostScore;
            this.hostFaceURL = "../static/faces/f" + this.hostFaceId + ".jpg";

          }
          //若host和guest都在房间则开始游戏
          if (this.hostStatus === 1 && res.data.data.guestStatus === 1) {
            //渲染host的信息
            this.hostStatus = res.data.data.hostStatus;
            this.hostId = res.data.data.hostId;
            this.hostName = res.data.data.hostInfo.username;
            this.hostFaceId = res.data.data.hostInfo.faceId;
            this.hostCurScore = res.data.data.hostScore;
            this.hostFaceURL = "../static/faces/f" + this.hostFaceId + ".jpg";
            //渲染guest的信息
            this.guestStatus = res.data.data.guestStatus;
            this.guestId = res.data.data.guestId;
            this.guestName = res.data.data.guestInfo.username;
            this.guestFaceId = res.data.data.guestInfo.faceId;
            this.guestCurScore = res.data.data.guestScore;
            this.guestFaceURL = "../static/faces/f" + this.hostFaceId + ".jpg";
            clearInterval(this.loopId);
            this.startGame();
          }

        })

    },
    //循环监听用户加入房间
    loop() {
      this.check();
      //每0.5s向服务器获取guest的数据
      this.loopId = setInterval(this.check, 500);

    },
    //开始游戏
    startGame() {
      this.roomStatus = 1;
      this.$axios.get(URL.getQuestions, {params: {roomId: this.roomId}})
        .then((res) => {
          let questionList = res.data.data;



        })

    },
    //退出房间弹窗
    exit() {
      this.$confirm('是否要退出当前房间?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.quitRoom();
      })

    },
    //退出房间
    quitRoom() {
      this.$axios.get(URL.quitRoom, {params: {roomId: this.roomId}})
        .then((res) => {
          let code = res.data.respCode;
          switch (code) {
            case 1:
              clearInterval(this.loopId);
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.$router.push('/index');
              break;

            default:
              this.$message.error("系统异常");
              break;
          }
        })
    },
    //（游戏中）退出弹窗
    end() {
      this.$confirm('游戏还未结束，现在退出会判负，是否退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.endBattle();
      })

    },
    //（游戏中）退出房间
    // endBattle(){
    //   this.$axios.get(URL.quitRoom, {params: {roomId: this.roomId}})
    //     .then((res) => {
    //
    //           this.$message({
    //             message: res.data.msg,
    //             type: 'success'
    //           });
    //           this.$router.push('/index');
    //
    //     })
    //
    // },

  }
}
</script>

<style scoped>
#root {
  height: 900px;
  width: 400px;
  background-color: #37D0B1;
  text-align: center;
}

#container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

#question {
  background-color: white;
  height: 300px;
  width: 300px;
  margin: 60px auto;
  opacity: 0.8;
}
#selectItem{
  display: flex;
  flex-direction: column;
}
</style>
