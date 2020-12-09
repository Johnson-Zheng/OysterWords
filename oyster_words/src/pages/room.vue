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
      </div>
      <p id="vs">VS</p>
      <div class="user_info">
        <el-avatar v-if="guestFaceId===0" size="100" fit="cover" icon="el-icon-user-solid"></el-avatar>
        <el-avatar v-if="guestFaceId!==0" size="100" fit="cover" :src="guestFaceURL"></el-avatar>
        <p>{{ guestName }}</p>
      </div>
    </div>
    <el-button id="exit" @click="exit()">退出房间</el-button>


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
      header_content: "等待好友进入...",
      roomId: 0,

      hostId: 0,
      hostName: "",
      hostScore: 0,
      hostWinCnt: 0,
      hostFaceId: 0,
      hostFaceURL: "../static/faces/f1.jpg",

      guestId: 0,
      guestName: "等待用户加入...",
      guestScore: 0,
      guestWinCnt: 0,
      guestFaceId: 0,

      loopId:null,
      roomStatus:0,
      hostStatus:0,
      guestStatus:0,


    }

  },
  created() {
    this.roomId = this.$route.query.roomId;
    this.getUserData();
  },
  mounted() {
    // this.loop();


  },
  methods: {
    //获取用户信息
    getUserData() {
      //房主信息
      this.hostId = localStorage.getItem("hostId");
      this.hostName = localStorage.getItem("hostName");
      this.hostScore = localStorage.getItem("hostScore");
      this.hostWinCnt = localStorage.getItem("hostWinCnt");
      this.hostFaceId = localStorage.getItem("hostFaceId");
      this.hostFaceURL = "../static/faces/f" + this.hostFaceId + ".jpg";

      //加入房间用户信息

    },
    //退出房间
    quitRoom(){
      this.$axios.get(URL.quitRoom, {params: {roomId: this.roomId}})
        .then((res) => {
          let code = res.data.respCode;
          switch (code) {
            case 1:
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              // localStorage.removeItem("hostName");
              // localStorage.removeItem("hostScore");
              // localStorage.removeItem("hostFaceId");
              // localStorage.removeItem("hostId");
              // localStorage.removeItem("hostWinCnt");
              // localStorage.removeItem("roomId");
              this.$router.push('/index');
              break;

            default:
              this.$message.error("系统异常");
              break;
          }
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
    //监听用户加入房间
    // checkGuest(){
    //
    // },
    //循环监听用户加入房间
    // loop(){
    //   this.checkGuest();
    //   this.loopId = setInterval(checkGuest(),500)
    //
    // }
  }
}
</script>

<style scoped>
#root {
  height: 700px;
  width: 400px;
  background-color: #37D0B1;
  text-align: center;
}

#container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

</style>
