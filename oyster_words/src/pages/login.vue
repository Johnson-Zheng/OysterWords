<template>
  <div id="container">
<!--        <img id="logo" src="../assets/logo/横向@2x.png">-->
<!--        <img id="img1" src="../assets/images/login_img1.png">-->
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
                          <el-form-item label="用户名" prop="username" style="margin-top:40px">
                              <el-input v-model="register_form.username" placeholder="请输入用户名"/>
                          </el-form-item>
                          <el-form-item label="密码" prop="password">
                              <el-input placeholder="请输入密码" v-model="register_form.user_password" show-password/>
                          </el-form-item>
                          <el-form-item label="重复密码" prop="password2">
                              <el-input placeholder="请再次输入密码" v-model="register_form.password2" show-password/>
                          </el-form-item>
                          <el-col :span="24"><el-button type="primary" style="width:100%;" >注册</el-button></el-col>
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
  import httpServer from "../global/httpServer";
  import * as URL from "../global/interfaceURL"
  export default {
    name: "login",
    components: {
    Copyright
  },
        data() {
            let checkName = (rule, value, callback) => {
                if (value.trim() === '') {
                    callback(new Error('用户名不能为空'))
                } else {
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
                let pass1 = this.register_form.user_password
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
                tabSelect:"first",
                login_form: {
                    username: '',
                    password: '',
                },
                login_rules: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'change' },
                    ],
                    user_password: [
                        { required: true, message: '密码不能为空', trigger: 'change' },
                    ]
                },
                register_au_form:{
                    password2:'',
                    code:'',
                },
                register_form:{
                    username:'',
                    user_password:'',
                    password2:'',
                    email:'',
                    role:1,
                    enabled:true,
                    uno:'',
                    phone:' '
                },

                register_rules: {
                    username: [{required:true, validator: checkName, trigger: 'blur' }],
                    user_password: [{ required:true,validator: validatePass, trigger: 'blur' }],
                    password2: [{ required:true,validator: validatePass2, trigger: 'blur' }],
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
                  this.$axios.post(
                    URL.login,
                    {
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
        //     submitregister() {
        //         this.$refs.register_form.validate((valid) => {
        //             if (valid) {
        //                 this.$axios
        //                     .post('register?code='+this.register_au_form.code, this.register_form).then(resp => {
        //                     if (resp && resp.data.rspCode === '200') {
        //                         this.$message.success(resp.data.data+"注册成功")
        //                         this.tabSelect = 'first'
        //                         this.login_form.username  = this.register_form.username
        //                         this.login_form.password = this.register_form.password
        //
        //                     }
        //                     else {
        //                         this.loading = false;
        //                         this.$message.warning(resp.data.data+",请重新尝试")
        //                     }
        //                 })
        //             } else {
        //                 this.$message.error('请核验表单信息是否遗漏');
        //                 return false;
        //             }
        //         });
        //     },
        //     clearCache(){
        //         window.sessionStorage.clear()
        //         window.localStorage.clear()
        //     }
        //
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




</style>

