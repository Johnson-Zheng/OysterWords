<template>
  <div id="root">
  <h1>单词挑战赛</h1>
  <div id="userInfo">
    <img alt="头像"/>
    <img alt="PK"/>
    <img alt="头像"/>
  </div>
  <div id="question">

  </div>


  <copyright></copyright>
  </div>
</template>

<script>
import copyright from "../components/footer/copyright";

export default {
  name: "battle",
  components: {
    copyright,
  },

  data(){
    return{
      faceURL:"../static/faces/f1.jpg",

    }
  },
  mounted() {
  },
  methods:{

  }
}

</script>


<style scoped>
#root {
  height: 700px;
  width: 400px;
  background-color: #91DDFA;
  text-align: center;
}
#userInfo{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#question{
  background-color: white;
  height: 450px;
  width: 300px;
  margin: 60px auto;
  opacity: 0.8;
}
</style>
