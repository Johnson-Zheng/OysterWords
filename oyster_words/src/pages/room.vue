<template>
  <div id="root">
    <h1>对战房间</h1>
    <p>{{ header_content }}</p>
    <p>房间{{ roomId }}</p>
    <div id="container">
      <div class="user_info">
        <img alt="头像"/>
        <p>{{hostName}}</p>
      </div>
      <p id="vs">VS</p>
      <div class="user_info">
        <img alt="头像"/>
        <p>{{guestName}}</p>
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

      hostId: localStorage.getItem("hostId"),
      hostName: localStorage.getItem("hostName"),
      hostScore: localStorage.getItem("hostScore"),
      hostWinCnt: localStorage.getItem("hostWinCnt"),
      hostFaceId: localStorage.getItem("hostFaceId"),

      guestId: localStorage.getItem("guestId"),
      guestName: localStorage.getItem("guestName"),
      guestScore: localStorage.getItem("guestScore"),
      guestWinCnt: localStorage.getItem("guestWinCnt"),
      guestFaceId: localStorage.getItem("guestFaceId"),
    }

  },
  mounted() {

  },
  methods: {
    //退出房间
    exit(){
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
