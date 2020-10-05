<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区 -->
            <div class="avatar_box">
               <img src="../assets/logo.png">
            </div>
            <!-- 登录表单区 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="0px" class="login_form">
                <el-form-item prop="username">
                    <el-input  v-model="loginForm.username" prefix-icon="iconfont icon-usra"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="iconfont icon-tuceng" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login('loginFormRef')">登录</el-button>
                    <el-button type="info" @click="resetForm('loginFormRef')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
    // 登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 表单验证规则
      loginRules: {
        //   用户名验证规则
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 密码验证规则
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置登录表单
    resetForm (forname) {
    //   console.log(this)
      this.$refs[forname].resetFields()
    },
    // 使用calidate来进行验证，是否通过
    login (forname) {
      this.$refs[forname].validate(async valid => {
        if (valid) {
          await this.service.post('login', this.loginForm)
            .then(res => {
              console.log(res, '请求成功')
              if (res.data.status === '200') {
                this.$message({
                  message: '恭喜你登录成功，即将自动跳转',
                  type: 'success',
                  duration: 1500
                })
                setTimeout(() => {
                  this.$router.push('/home')
                }, 1500)
                window.sessionStorage('token', res.data.token)
              } else {
                console.log(res.data.msg)
                this.$message.error('登录失败')
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          console.log('error submit')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login_container{
    height: 700px;
    background-color: #2b4b6b;
    .login_box{
        position: absolute;
        width: 450px;
        height: 300px;
        background-color: #fff;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        .avatar_box{
            height: 130px;
            width: 130px;
            border:1px solid #eee;
            border-radius: 50%;
            padding:10px;
            box-shadow:0 0 10px #ddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            background-color: #fff;
            img{
                width: 100%;
                height:100%;
                border-radius: 50% ;
                background-color: #eee;
            }
        }
        .login_form{
            position: absolute;
            bottom:0;
            width: 100%;
            padding:0 20px;
            box-sizing: border-box;
            .btns{
                // position: absolute;
                margin-left:50%;
                transform: translate(-40%);
            }
        }
    }
}
</style>
