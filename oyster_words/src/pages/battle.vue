<template>
  <div id="main">
    <header>
      <h1>Battle</h1>
      <h2>单词对战</h2>

    </header>
    <div id="form" style="background-color: #98d4f3;height: 100vh;width: 100vw">
      <div class="fish" id="fish"></div>
      <div class="fish" id="fish2"></div>
      <div class="fish" id="fish3"></div>
      <div id="battle" class="panel_shadow">
        <el-progress :percentage="TimeLeft" :format="format"></el-progress>
        <div style="margin-top: 10px" class="panel_shadow">
          <el-row style="height: 40px">
            <el-col span="4">
              <el-avatar v-if="hostInfo.hostFaceId===0" :size="40" fit="cover" icon="el-icon-user-solid"></el-avatar>
              <el-avatar v-if="hostInfo.hostFaceId!==0" :size="40" fit="cover" :src="hostInfo.hostFaceUrl"></el-avatar>
            </el-col>
            <el-col span="5">
              <el-row>
                <el-col span="24">{{hostInfo.hostName}}</el-col>
                <el-col span="24">得分：{{hostInfo.hostScore}}</el-col>
              </el-row>
            </el-col>
            <el-col span="6">PK</el-col>
            <el-col span="5">
              <el-row>
                <el-col span="24">{{guestInfo.guestName}}</el-col>
                <el-col span="24">得分：{{guestInfo.guestScore}}</el-col>
              </el-row>
            </el-col>
            <el-col span="4">
              <el-avatar v-if="guestInfo.guestFaceId===0" :size="40" fit="cover" icon="el-icon-user-solid"></el-avatar>
              <el-avatar v-if="guestInfo.guestFaceId!==0" :size="40" fit="cover" :src="guestInfo.guestFaceUrl"></el-avatar>
            </el-col>
          </el-row>
        </div>
        <div style="margin-top: 10px" class="panel_shadow">
          <h4>{{qid+1}}.选择正确的字母补全单词</h4>
          <div id="qDesc">
            <p id="descEN">{{questionList[qid].desp}}</p>
            <p id="descCN">{{questionList[qid].chinese}}</p>
          </div>
          <el-row>
            <el-col style="margin-bottom: 10px" span="24">
              <el-button style="width: 100%" round>{{questionList[qid].choices[0]}}</el-button>
            </el-col>
            <el-col style="margin-bottom: 10px" span="24">
              <el-button style="width: 100%" round>{{questionList[qid].choices[1]}}</el-button>
            </el-col>
            <el-col style="margin-bottom: 10px" span="24">
              <el-button style="width: 100%" round>{{questionList[qid].choices[2]}}</el-button>
            </el-col>
            <el-col style="margin-bottom: 10px" span="24">
              <el-button style="width: 100%" round>{{questionList[qid].choices[3]}}</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "battle",
      data(){
        return{
          roomId:0,
          IsUserHost:false,
          TimeLeft:20,
          hostInfo:{
            hostId:0,
            hostFaceId:0,
            hostFaceUrl:"../static/faces/f1.jpg",
            hostName:"Host",
            hostScore:0,
          },
          guestInfo:{
            guestId:0,
            guestFaceId:0,
            guestFaceUrl:"../static/faces/f1.jpg",
            guestName:"Guest",
            guestScore:0,
          },
          qid:0,
          questionList:[
            {
              desp:"Y_llow",
              chinese:"黄色",
              answer:"A",
              choices:['a','b','c','d']
            },
          ],
        }
      },
      methods:{
        format(TimeLeft) {
          return `${TimeLeft/10}秒`;
        }
      }
    }
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/css?family=Sniglet|Raleway:900");
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
  h4{
    margin: 0 0 10px 0;
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

  header{
    height: 140px;
    background: url('../assets/golf.png') repeat-x bottom;
  }
  #battle{
    background: white;
    width: 400px;
    margin-left:50%;
    transform: translateX(-50%);

  }
  #qDesc{
    background: #fafafa;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    margin-bottom: 10px;
  }
  #descCN,#descEN{
    color:#639b61;
    font-weight: 700;
    font-family: 'Raleway', sans-serif;
    font-size: 24px;
  }
</style>
