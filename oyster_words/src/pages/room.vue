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

export default {
  name: "battleRoom",
  components: {
    copyright,
  },

  data() {
    return {
      header_content: "等待好友进入...",
      roomId: localStorage.getItem("roomId"),

      hostId: 0,
      hostName: "",
      hostScore: 0,
      hostWinCnt: 0,
      hostFaceId: 0,
      hostFaceURL: "../static/faces/f1.jpg",

      guestId: 0,
      guestName: "",
      guestScore: 0,
      guestWinCnt: 0,
      guestFaceId: 0,
      guestFaceURL: "../static/faces/f1.jpg",

    }

  },
  mounted() {
    this.getUserData();

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
      this.guestId = localStorage.getItem("guestId");
      this.guestName = localStorage.getItem("guestName");
      this.guestScore = localStorage.getItem("guestScore");
      this.guestWinCnt = localStorage.getItem("guestWinCnt");
      this.guestFaceId = localStorage.getItem("guestFaceId");
      this.guestFaceURL = "../static/faces/f" + this.guestFaceId + ".jpg";
    },
    //
    //退出房间弹窗
    exit() {
      this.$confirm('是否要退出当前房间?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$router.push('/index');
        this.$message({
          type: 'success',
          message: '成功退出'
        });
      })

    }
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
