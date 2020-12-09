<template>
  <div id="background" align="center">
    <el-dialog
      title="昵称修改"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>昵称:</span>
      <span>
             <input id="newNickName" placeholder="请输入新的昵称"/>
      </span>
      <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button><!--  修改了el-button的大小之后会导致字体无法居中 -->
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button><!--  修改了el-button的大小之后会导致字体无法居中 -->
      </span>
    </el-dialog>
    <div id="panel_selfInform" align="center">

       <div id="img_self" style="color: #67c23a"><!-- 个人信息的头像-->
         个人信息的头像
       </div>


       <div>
         <div id="ID_self">ID:{{ID}}</div><br/>
         <div id="nickName_self">昵称:{{nickName}}
             <el-button id="BTN_change" @click="dialogVisible = true">修改</el-button><!--  修改了el-button的大小之后会导致字体无法居中 -->
         </div>

         </div><br/>
             <button id="quit">注销</button>
             <copyright/>
         </div>
        </div>

</template>

<script>
  import copyright from "../components/footer/copyright";
    export default {
        name: "self_information",
      components:{
        copyright
      },
      data(){
          return{
            ID:"001",
            nickName:"小柚子",
            dialogVisible: false
          };
      },
      methods: {
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        }
      }
    }
</script>


<style scoped>
  #newNickName{
    height: 30px;
    border: 1px solid #000000;
    border-radius: 4px;
  }
  /*“修改”按钮的样式，但是设置样式之后会导致字体无法居中
  #BTN_change{
    height: 30px;
    width: 60px;
    align-content: center;
  }*/
  #background{
    width: 100vw;
    height: 100vh;
    background-color: #58a1ff;
  }
  #panel_selfInform{
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    width:350px;
    height: 250px;
    position: absolute;
    transition: all ease-in-out 0.3s;
    background: rgba(255,255,255,0.98);
    border-radius: 15px;
    padding-top: 5%;
  }
  #img_self{
    margin-bottom: 20px;
  }
  #ID_self{
    position: absolute;
    left: 150px;
  }
  #nickName_self{
    position: relative;
    left: 37px;
  }
  #quit{
    width: 60px;
    height: 30px;
    background-color: rgba(255,255,255,0.98);
    border: 1px solid #e9e9eb;
    border-radius: 4px;
  }

</style>
