<template>
  <div align="center">
    <div id="image">插入顶部图片</div>
    <div id="ranking_list">
      <div id="my_score">
        <table>
          <tr id="tr1">
            <td id="td1_1">我的成绩</td>
            <td id="td1_2">
              <el-avatar v-if="faceId===0" size="100" fit="cover" icon="el-icon-user-solid"></el-avatar>
              <el-avatar v-if="faceId!==0" size="100" fit="cover" :src="faceURL"></el-avatar>
            </td>
            <td id="td1_3">{{myname}}</td>
            <td id="td1_4">第{{myrank}}名</td>
            <td id="td1_5">{{myscore}}分</td>
          </tr>
        </table>
      </div>
      <div id="list">
        <table>
          <thead>
          <tr>
            <td id="td2_1">排名</td>
            <td id="td2_2">昵称</td>
            <td id="td2_3">分数</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in rankData" height="40px">
            <td id="td3_1">{{index+1}}</td>
            <td id="td3_2">
              <el-avatar v-if="item.faceId===0" size="100" fit="cover" icon="el-icon-user-solid"></el-avatar>
              <el-avatar v-if="item.faceId!==0" size="100" fit="cover" :src="faceList[index]"></el-avatar>
              {{item.username}}
            </td>
            <td id="td3_3">{{item.score}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <copyright></copyright>
  </div>
</template>

<script>
  import copyright from "../components/footer/copyright";
  import * as URL from "../global/interfaceURL";
  export default {
    name: "ranking_list",
    components:{
      copyright
    },
    data(){
      return{
        userId:1,
        faceId:1,
        faceURL:"../static/faces/f1.jpg",
        myname:"柚子甜",
        myrank:349,
        myscore:76532,
        rankData: [],
        faceList:[]
      }
    },
    created() {
      this.get_UserInfor()
      this.get_Rank()
    },
    methods:{
      get_UserInfor(){
        this.userId = localStorage.getItem("userId");
        this.faceId = localStorage.getItem("faceId");
        this.username = localStorage.getItem("username");
        this.score = localStorage.getItem("score");
        this.faceURL = "../static/faces/f"+this.faceId+".jpg"
      },
      get_Rank(){
        var _this = this;
        this.$axios.get(URL.getRank+"?userId="+this.userId)
          .then((res)=>{
            let rank = res.data.yourRank
            if(rank){
              this.myrank = rank
              this.rankData = res.data.allRank
              for(let i=0;i<10;i++){
                this.faceList[i]="../static/faces/f"+this.rankData[i].faceId+".jpg"
              }
            }else {
              this.$message.error("系统异常")
            }
        })
      }
    }
  }
</script>

<style scoped>
  #image{
    width: 100%;
    height: 200px;
    background-color: darkorchid;
  }
  #my_score{
    padding: 20px;
    height: max-content;
    width: max-content;
    border-radius: 10px;
    margin-top: 20px;
    box-shadow: lightgray 10px 10px 30px 5px ;
  }
  #tr1{
    height: 60px;
  }
  #td1_1{
    width: 40px;
    color: darkorchid;
  }
  #td1_2{
    width: 40px;
  }
  #td1_3{
    width: 240px;
  }
  #td1_4{
    width: 100px;
    color: darkorchid;
  }
  #td1_5{
    width: 100px;
    color: darkorchid;
  }
  #list{
    padding: 20px;
    width: max-content;
    height: max-content;
    border-radius: 10px;
    box-shadow: lightgray 10px 10px 30px 5px ;
    margin-top: 20px;
  }
  #td2_1,#td3_1{
    width: 80px;
    text-align: center;
  }
  #td2_2,#td3_2{
    width: 280px;
  }
  #td2_3,#td3_3{
    width: 100px;
    text-align: center;
  }
</style>
