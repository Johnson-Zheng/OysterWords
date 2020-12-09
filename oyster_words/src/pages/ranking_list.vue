<template>
  <div align="center">
    <div id="image">插入顶部图片</div>
    <div id="rankinglist">
      <div id="myscore">
        <table>
          <tr id="tr1">
            <td id="td1_1">我的成绩</td>
            <td id="td1_2"><div id="image0"/></td>
            <td id="td1_3">{{myname}}</td>
            <td id="td1_4">{{myrank}}</td>
            <td id="td1_5">{{myscore}}</td>
          </tr>
        </table>
      </div>
      <div id="list">
        <table id="t2">
          <tr id="tr2_1">
            <td id="td2_1_1">排名</td>
            <td id="td2_1_2">昵称</td>
            <td id="td2_1_3">得分</td>
          </tr>
          <tr id="tr2_2">
            <td id="td">第1名图片</td>
            <td><span>头像1  </span>{{username1}}</td>
            <td>{{userscore1}}</td>
          </tr>
          <tr id="tr2_3">
            <td>第2名图片</td>
            <td><span>头像2  </span>{{username2}}</td>
            <td>{{userscore2}}</td>
          </tr>
          <tr id="tr2_4">
            <td>第3名图片</td>
            <td><span>头像3  </span>{{username3}}</td>
            <td>{{userscore3}}</td>
          </tr>
          <tr id="tr2_5">
            <td id="td2_5_1">4</td>
            <td><span>头像4  </span>{{username4}}</td>
            <td>{{userscore4}}</td>
          </tr>
          <tr id="tr2_6">
            <td id="td2_6_1">5</td>
            <td><span>头像5  </span>{{username5}}</td>
            <td>{{userscore5}}</td>
          </tr>
          <tr id="tr2_7">
            <td  id="td2_7_1">6</td>
            <td><span>头像6  </span>{{username6}}</td>
            <td>{{userscore6}}</td>
          </tr>
          <tr id="tr2_8">
            <td id="td2_8_1">7</td>
            <td><span>头像7  </span>{{username7}}</td>
            <td>{{userscore7}}</td>
          </tr>
          <tr id="tr2_9">
            <td id="td2_9_1">8</td>
            <td><span>头像8  </span>{{username8}}</td>
            <td>{{userscore8}}</td>
          </tr>
          <tr id="tr2_10">
            <td id="td2_10_1">9</td>
            <td><span>头像9  </span>{{username9}}</td>
            <td>{{userscore9}}</td>
          </tr>
          <tr id="tr2_11">
            <td id="td2_11_1">10</td>
            <td><span>头像10  </span>{{username10}}</td>
            <td>{{userscore10}}</td>
          </tr>
        </table>
      </div>
    </div>
    <copyright></copyright>
  </div>
</template>

<script>
import copyright from "../components/footer/copyright";
export default {
  name: "ranking_list",
  components:{
    copyright
  },
  data(){
    return{
      myname:"柚子甜",
      myrank:349,
      myscore:76532,
      username1:"a",
      userscore1:10,
      username2:"b",
      userscore2:9,
      username3:"c",
      userscore3:8,
      username4:"d",
      userscore4:7,
      username5:"e",
      userscore5:6,
      username6:"f",
      userscore6:5,
      username7:"g",
      userscore7:4,
      username8:"h",
      userscore8:3,
      username9:"i",
      userscore9:2,
      username10:"j",
      userscore10:1,
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
  #myscore{
    height: 60px;
    width: 400px;
    border-radius: 10px;
    margin-top: 20px;
    box-shadow: lightgray 10px 10px 30px 5px ;
  }
  #image0,#image1,#image2,#image3,#image4,#image5,#image6,#image7,#image8,#image9,#image10{
    width: 30px;
    height: 30px;
    background-color: darksalmon;
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
    width: 180px;
  }
  #td1_4{
    width: 40px;
    color: darkorchid;
  }
  #td1_5{
    width: 60px;
    color: darkorchid;
  }
  #list{
    width: 400px;
    height: 460px;
    /*border: 1px solid black;*/
    border-radius: 10px;
    box-shadow: lightgray 10px 10px 30px 5px ;
    margin-top: 20px;
  }
  #t2{
    margin: auto;
  }
  #tr2_1{
    color: lightgray;
  }
  #tr2_2,#tr2_3,#tr2_4,#tr2_5,#tr2_6,#tr2_7,#tr2_8,#tr2_9,#tr2_10,#tr2_11{
    height: 40px;
  }
  #td2_1_1{
    width: 80px;
  }
  #td2_1_2{
    width: 220px;
  }
  #td2_1_3{
    width: 60px;
  }
  #td2_5_1,#td2_6_1,#td2_7_1,#td2_8_1,#td2_9_1,#td2_10_1,#td2_11_1{
    color: lightgray;
  }
</style>
