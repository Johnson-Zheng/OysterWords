<template>
  <div id="container">
    <div class="bg"></div>
    <div id="panel" class="panel_shadow">
          <div id="login-panel">
              <el-tabs v-model="tabSelect" align="center">
                  <el-tab-pane label="登陆" name="first">
                      <el-form label-position="left"
                              ref="form"
                              :rules="login_rules"
                              status-icon :model="login_form" label-width="80px" class="mt-30">
                          <el-form-item label="用户名" prop="username" style="margin-top:40px">
                              <el-input v-model="login_form.username" placeholder="请输入用户名"/>
                          </el-form-item>
                          <el-form-item label="密码" prop="password" style="margin-bottom:40px">
                              <el-input placeholder="请输入密码" v-model="login_form.password" show-password/>
                          </el-form-item>
                          <el-col :span="24" class="mt-30" style="margin-bottom:10px">
                            <el-button round type="primary" style="width:100%;" @click="user_login(login_form)" :loading='loginLoading'>登陆</el-button>
                          </el-col>
                        </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="注册" name="second">
                      <el-form label-position="left"
                               ref="register_form"
                               :rules="register_rules"
                               status-icon :model="register_form" label-width="80px" class="mt-30">
                        <el-form-item label="头像" prop="faceid" style="margin-top:40px">
                          <el-row type="flex" justify="space-between">
                            <el-col  :span="3">
                              <el-avatar v-if="register_form.faceid===0" size="100" fit="cover" icon="el-icon-user-solid"></el-avatar>
                              <el-avatar v-if="register_form.faceid!==0" size="100" fit="cover" :src="faceURL"></el-avatar>
                            </el-col>
                            <el-col   :span="5">
                              <p v-if="register_form.faceid===0" style="height: 100%;margin: 0" >默认头像</p>
                              <p v-if="register_form.faceid!==0" style="height: 100%;margin: 0">头像{{register_form.faceid}}</p>
                            </el-col>
                            <el-col :span="10">
                              <el-input-number size="small" v-model="register_form.faceid" controls-position="right"  @change="selectFace(register_form.faceid)" :min="0" :max="20"></el-input-number>
                            </el-col>
                          </el-row>


                        </el-form-item>
                          <el-form-item label="用户名" prop="username" >
                              <el-input v-model="register_form.username" placeholder="请输入用户名"/>
                          </el-form-item>
                          <el-form-item label="密码" prop="password">
                              <el-input placeholder="请输入密码" v-model="register_form.password" show-password/>
                          </el-form-item>
                          <el-form-item label="重复密码" prop="password2">
                              <el-input placeholder="请再次输入密码" v-model="register_form.password2" show-password/>
                          </el-form-item>

                          <el-col :span="24">
                            <el-button type="primary" style="width:100%;" :loading='regLoading' @click="register(register_form)">注册</el-button>
                          </el-col>
                      </el-form>
                  </el-tab-pane>
              </el-tabs>
          </div>
          <copyright style="margin-bottom: 0;"> </copyright>

      </div>
  </div>
</template>

<script>
  import Copyright from "../components/footer/copyright";
  import * as URL from "../global/interfaceURL"
  export default {
    name: "login",
    components: {Copyright},
  data() {
    let checkName = (rule, value, callback) => {
        if (value.trim() === '') {
            callback(new Error('用户名不能为空'))
        }else {
            callback()
        }
    }
    let validatePass = (rule, value, callback) => {
        if (value === "") {
            callback(new Error("请输入密码"))
        } else {
            callback()
        }
    }
    let validatePass2 = (rule, value, callback) => {
        let pass1 = this.register_form.password
        if(pass1){
            if (value==='') {
                callback(new Error("请再次输入密码"))
            }else if (value!==pass1) {
                callback(new Error("两次输入密码不一致!"))
            }else {
                callback();
            }
        }else{
            callback(new Error("请输入您的密码"))
        }

    }
    return {
      loginLoading:false,
      regLoading:false,
      tabSelect:"first",
      login_form: {
        username: '',
        password: '',
      },
      login_rules: {
        username: [
            { required: true, message: '用户名不能为空', trigger: 'change' },
        ],
        password: [
            { required: true, message: '密码不能为空', trigger: 'change' },
        ]
      },
      register_form:{
        username:'',
        password:'',
        password2:'',
        faceid:0,
      },
      faceURL:"../static/faces/f1.jpg",
      register_rules: {
        username: [{required:true, validator: checkName, trigger: 'blur' },
          { min: 4,  message: '用户名至少为4位', trigger: 'blur' }
          ],
        password: [{ required:true,validator: validatePass, trigger: 'blur' },
          { min: 4,  message: '密码至少为4位', trigger: 'blur' }],
        password2: [{ required:true,validator: validatePass2, trigger: 'blur' }],
        faceid:[{ required:true, trigger: 'blur' }],
      },
    }
  },
  methods:{
  //登陆表单提交及验证
    user_login(form_name){
        this.loginLoading = true
        var _this = this
        let username = this.login_form.username
        let password = this.login_form.password
        if(username && password){
          this.$axios.post(URL.login, {
                username: username,
                password: password
            }).then((res)=>{
              let code = res.data.respCode
              switch (code){
                case 1:
                  this.$message({
                    duration:2000,
                    showClose:true,
                    message: '登陆成功',
                    type: 'success'
                  });
                  let userdata = res.data.data
                  localStorage.setItem("username",userdata.username)
                  localStorage.setItem("score",userdata.score)
                  localStorage.setItem("faceId",userdata.faceId)
                  localStorage.setItem("userId",userdata.userId)
                  localStorage.setItem("winCnt",userdata.winCnt)
                  this.$router.push('/index')
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
        }else if(username==='' || password===''){
            this.$message({
                message: '用户名或密码不能为空',
                type: 'warning'
            });
        }

    },
    register(register_form) {
      this.regLoading = true
      let username = register_form.username
      let password = register_form.password
      let password2 = register_form.password2
      let faceid = register_form.faceid
      if(username && password && password2){
        this.$axios.post(URL.register, {
          username: username,
          password: password,
          faceId:faceid
        }).then((res)=>{
          let code = res.data.respCode
          switch (code){
            case 1:
              this.$message({
                duration:2000,
                showClose:true,
                message: '用户'+username+'注册成功',
                type: 'success'
              });
              this.tabSelect="first",
              this.login_form.username = username
              this.login_form.password = password
              break;
            case 2:
              this.$message.error(res.data.msg)
              this.regLoading = false
              break;
            default:
              this.$message.error("系统异常")
              this.regLoading = false
              break;
          }
        });
      }else{
        this.regLoading= false
        this.$message({
          message: '注册信息不全',
          type: 'warning'
        });
      }
    },
    selectFace(id){
      if(id===undefined){
        this.register_form.faceid = 0
        this.$message.warning("头像id异常，已设置为默认头像")
        this.faceURL = "../static/faces/f"+id+".jpg"
      }else{
        this.faceURL = "../static/faces/f"+id+".jpg"
      }

    }
  }
};
</script>

<style scoped>
    .bg{
      width: 100vw;
      height: 100vh;
      background-color: #58a1ff;
    }
    #container{
      min-height: 100%;

    }

    #logo{
        position: absolute;
        left: 10vw;
        top:5vh;
        height:66px;
        object-fit: cover;
    }
    #img1{
        position: absolute;
        left: 10vw;
        top: 15vh;
        width: 711px;
        height:546px;
        object-fit: cover;
    }

  #panel{
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    width:350px;
    position: absolute;
    transition: all ease-in-out 0.3s;
  }

  #login-panel >>> .el-tabs__item {
      width: 175px;
  }
  #login-panel >>> .el-tabs__item {
      width: 175px;
  }
  #login-panel >>> .el-input-number{
      width: 100%;
  }




</style>

