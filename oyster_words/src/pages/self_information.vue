<template>
  <div id="background" align="center">

    <el-dialog
      title="修改昵称"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-row>
      <el-col span="4" :offset="3"  >昵称:</el-col>
      <el-col span="13">
        <el-input id="newname" v-model="newname" placeholder="请输入新的昵称"></el-input>
      </el-col>
      </el-row>
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
      <el-row style="margin-bottom: 20px">
        <el-col span="4" :offset="3">旧密码:</el-col>
        <el-col span="13">
          <el-input placeholder="请输入密码" v-model="oldPSW" show-password></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col span="4" :offset="3">新密码:</el-col>
        <el-col span="13">
          <el-input placeholder="请输入密码" v-model="newPSW" show-password></el-input>
        </el-col>
      </el-row>
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
      <el-row type="flex" justify="space-between">
        <el-col  :span="3">
          <el-avatar v-if="newfaceId===0" fit="cover" icon="el-icon-user-solid"></el-avatar>
          <el-avatar v-if="newfaceId!==0" fit="cover" :src="newfaceURL"></el-avatar>
        </el-col>
        <el-col   :span="5">
          <p v-if="newfaceId===0" style="height: 100%;margin: 0" >默认头像</p>
          <p v-if="newfaceId!==0" style="height: 100%;margin: 0">头像{{newfaceId}}</p>
        </el-col>
        <el-col :span="10">
          <el-input-number size="small" v-model="newfaceId" controls-position="right"  @change="selectFace(newfaceId)" :min="0" :max="20"></el-input-number>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible_2 = false" >取 消</el-button>
              <el-button type="primary" @click="changeUserface()">确 定</el-button>
      </span>
    </el-dialog>
    <div id="panel_selfInform" align="center">

      <div id="img" @click="dialogVisible_2= true">
        <el-avatar v-if="faceId===0" size="100" fit="cover" icon="el-icon-user-solid"></el-avatar>
        <el-avatar v-if="faceId!==0" size="100" fit="cover" :src="faceURL"></el-avatar>
      </div>

      <div>
         <div id="ID_self">ID:{{userId}}</div><br/>
         <div id="nickName_self">昵称:{{username}}
         </div>
         <div>
           <el-button id="BTN_change" @click="dialogVisible = true" size="small" plain>修改昵称</el-button>
           <el-button id="BTN_changePSW" @click="dialogVisible_1= true" size="small" plain>修改密码</el-button>
         </div>

         </div><br/>
             <el-button id="quit" @click="goToLogin" size="small"  type="danger" plain>注销</el-button>
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
            userId:"",
            username:"",
            newname:"",
            newPSW:"",
            oldPSW:"",
            dialogVisible: false,
            dialogVisible_1:false,
            dialogVisible_2:false,
            faceId:0,
            newfaceId:0,
            newfaceURL:"../static/faces/f1.jpg",
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
          this.faceId=localStorage.getItem("faceId")
          this.faceURL="../static/faces/f"+this.faceId+".jpg"
        },
          //修改密码
        changePSW(){
          let password=this.oldPSW  //获取input输入的旧密码
          let newPassword=this.newPSW//获取input输入的新密码


          this.$axios.post(URL.resetPassword, {
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
              this.dialogVisible_1 = false;
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
                  this.username = this.newname;
                  localStorage.setItem("username",this.newname)
                  this.dialogVisible = false;
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
            selectFace(id){
              if(id===undefined){
                this.newfaceId = 0
                this.$message.warning("头像id异常，已设置为默认头像")
                this.newfaceURL = "../static/faces/f"+id+".jpg"
              }else{
                this.newfaceURL = "../static/faces/f"+id+".jpg"
              }
            },
            changeUserface(){
              let faceId = this.newfaceId
              this.$axios.get( URL.changeFace+"?userId="+this.userId+"&faceId="+this.newfaceId).then((res)=>{
                let code = res.data.respCode
                switch (code){
                  case 1:
                    this.$message({
                      duration:2000,
                      showClose:true,
                      message: res.data.msg,
                      type: 'success'
                    });
                    this.faceURL = this.newfaceURL;
                    localStorage.setItem("faceId",this.newfaceId)
                    this.dialogVisible_2 = false;
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
  }
  #BTN_changePSW{
    width: 80px;
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
  #img{
    transition: all ease-in-out 0.3s;
    cursor: pointer;
    width: max-content;
  }
  #img:hover{
    transform: scale(1.1);
    transition: all ease-in-out 0.3s;
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
    width: 160px;
  }



</style>
