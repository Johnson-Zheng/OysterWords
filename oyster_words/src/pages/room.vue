<template>
  <div id="root">
    <header>
      <h1>BATTLE ROOM</h1>
      <h2>对战房间</h2>
    </header>

    <div id="container" style="background-color: #98d4f3;height: 400px">
      <div class="fish" id="fish"></div>
      <div class="fish" id="fish2"></div>
      <div class="fish" id="fish3"></div>
      <div id="header_bar">
        <p style="font-size: 20px">等待好友进入...</p>
        <br/>
        <p style="color: #409eff; font-size: 15px">房间{{ roomId }}</p>
      </div>
      <div id="content">
        <div id="user">
          <div class="user_info">
            <el-avatar v-if="hostFaceId===0" size="100" fit="cover" icon="el-icon-user-solid"></el-avatar>
            <el-avatar v-if="hostFaceId!==0" size="100" fit="cover" :src="hostFaceURL"></el-avatar>
            <p>{{ hostName }}</p>
          </div>
          <p id="vs">VS</p>
          <div class="user_info">
            <el-avatar v-if="guestFaceId===0" size="100" fit="cover" icon="el-icon-user-solid"></el-avatar>
            <el-avatar v-if="guestFaceId!==0" size="100" fit="cover" :src="guestFaceURL"></el-avatar>
            <p>{{ guestName }}</p>
          </div>
        </div>

        <el-button v-if="roomStatus===0" @click="exit()" style="margin: 20px;">退出房间</el-button>
      </div>
    </div>

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
      userIsHost: true,
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
    }
  },
  created() {
    this.userIsHost = this.$route.params.userIsHost;
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
          this.guestFaceURL = "../static/faces/f" + this.guestFaceId + ".jpg";
        })
    },
    //监听房间状态
    check() {
      this.$axios.get(URL.queryRoom, {params: {roomId: this.roomId}})
        .then((res) =>{
          //访客未加入时
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
            this.guestFaceURL = "../static/faces/f" + this.guestFaceId + ".jpg";
            clearInterval(this.loopId);
            this.roomStatus = 1;
            this.$router.push({
              path:'/battle',
              params:{
                roomId:this.roomId,
                hostInfo:{
                  hostId:this.hostId,
                  hostFaceUrl:this.hostFaceUrl,
                  hostName:this.hostName,
                  hostFaceID:this.hostFaceId,
                },
                guestInfo:{
                  guestId:this.guestId,
                  guestFaceUrl:this.guestFaceId,
                  guestName:this.guestName,
                  guestFaceId:this.guestFaceId,
                }
              },
            });
          }

        })

    },
    //循环监听用户加入房间
    loop() {
      this.check();
      //每0.5s向服务器获取guest的数据
      this.loopId = setInterval(this.check, 500);
    },
    //HOST出房间弹窗
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
          switch(code) {
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
  line-height: 40px;
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
#user {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px;
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
