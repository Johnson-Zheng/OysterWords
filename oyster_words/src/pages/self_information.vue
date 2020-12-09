<template>
  <div id="background" align="center">

    <el-dialog
      title="修改昵称"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>昵称:</span>
      <span>
        <el-input v-model="newname" placeholder="请输入新的昵称"></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="changeUserName()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible_1 "
      width="30%"
      :before-close="handleClose">
      <span>旧密码:</span>
      <span>
        <el-input placeholder="请输入密码" v-model="oldPSW" show-password></el-input>
      </span>
      <span>新密码:</span>
      <span>
        <el-input placeholder="请输入密码" v-model="newPSW" show-password></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible_1 = false" >取 消</el-button>
              <el-button type="primary" @click="changePSW()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible_2"
      width="30%"
      :before-close="handleClose">
      <span>昵称:</span>
      <span>
        <el-input v-model="newname" placeholder="请输入新的昵称"></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible_2 = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible_2 = false">确 定</el-button>
      </span>
    </el-dialog>
    <div id="panel_selfInform" align="center">

      <div @click="dialogVisible_2= true">
      <el-avatar v-if="faceId===0" size="100" fit="cover" icon="el-icon-user-solid"></el-avatar>
      <el-avatar v-if="faceId!==0" size="100" fit="cover" :src="faceURL"></el-avatar>
      </div>

      <div>
         <div id="ID_self">ID:{{userId}}</div><br/>
         <div id="nickName_self">昵称:{{username}}
         </div>
         <div>
           <button id="BTN_change" @click="dialogVisible = true" >修改昵称</button>
           <button id="BTN_changePSW" @click="dialogVisible_1= true">修改密码</button>
         </div>

         </div><br/>
             <button id="quit" @click="goToLogin()">注销</button>
             <copyright/>
         </div>
        </div>

</template>

<script>
  import copyright from "../components/footer/copyright";
  import * as URL from "../global/interfaceURL"
    export default {
        name: "self_information",
      components:{
        copyright
      },
      data(){
          return{
            userId:"11",
            username:"pppp",
            newname:"",
            newPSW:"",
            oldPSW:"",
            dialogVisible: false,
            dialogVisible_1:false,
            dialogVisible_2:false,
            faceId:"",
            faceURL:"../static/faces/f1.jpg"
          };
      },
      created() {
        this.getUserdata()
      },
      methods: {

        goToLogin(){
          window.localStorage.clear()
          this.$router.push('/login')
        },

        getUserdata(){
          this.userId=localStorage.getItem("userId")
          this.username=localStorage.getItem("username")
          //this.faceId=localStorage.getItem("faceId")
          //this.faceURL="../static/faces/f"+this.faceId+".jpg"
        },
          //修改密码
        changePSW(){
          let password=this.oldPSW  //获取input输入的旧密码
          let newPassword=this.newPSW//获取input输入的新密码
          //let username=this.username;//获取当前用户的username   //？？？


          this.$axios.post(URL.resetPassword, {      //URL??
            username:this.username,
            password: password,
            newPassword:newPassword
          }).then((res)=>{
            if(newPassword!=password){
                this.$message({
                  duration:2000,
                  showClose:true,
                  message: '修改成功',
                  type: 'success'
                });
            }
            else{
              this.$message.error("修改失败")
              this.loginLoading = false
            }
          })
          },
            //修改用户昵称
          changeUserName() {
            let username = this.username
            this.$axios.get( URL.changeUsername+"?userId="+this.userId+"&username="+this.newname).then((res)=>{
              let code = res.data.respCode
              switch (code){
                case 1:
                  this.$message({
                    duration:2000,
                    showClose:true,
                    message: res.data.msg,
                    type: 'success'
                  });
                  break;
                case 2:
                  this.$message.error(res.data.msg)
                  this.loginLoading = false
                  break;
                default:
                  this.$message.error("系统异常")
                  this.loginLoading = false
                  break;
              }
            })
            },

            //修改头像
            changeUserface(){

            }
        },
    }
</script>


<style scoped>
  #newNickName,#oldPSW,#newPSW{
    height: 30px;
    border: 1.5px solid #8c939d;  /*input输入框的边框样式*/
    border-radius: 4px;
  }
  #oldPSW{
    margin-bottom: 10px;
  }
  #BTN_change{
    width: 80px;
    height: 30px;
    background-color: rgba(255,255,255,0.98);
    border: 1px solid #e9e9eb;
    border-radius: 4px;
  }
  #BTN_changePSW{
    width: 80px;
    height: 30px;
    background-color: rgba(255,255,255,0.98);
    border: 1px solid #e9e9eb;
    border-radius: 4px;
    margin-top: 10px;
  }
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
    margin-top: 10px;
    margin-bottom: 10px;
  }
  #quit{
    width: 60px;
    height: 30px;
    background-color: rgba(255,255,255,0.98);
    border: 1px solid #e9e9eb;
    border-radius: 4px;
  }

</style>
