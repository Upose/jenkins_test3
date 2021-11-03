<template>
  <div class="footer-page">
      <div class="form-warp">
        <p class="title">后台管理系统</p>
        <el-form :model="ruleForm" size="small" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户账号" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="记住密码" prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item class="b-center">
            <el-button class="btn-block" size="mall" type="primary" @click="submitForm('ruleForm')">确定</el-button>
            <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import http from "@/assets/js/http";
export default {
  name: 'login',
  created(){},
  data () {
    return {
      ruleForm: {
          name: 'admin',
          password: '123456',
          delivery: false,
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名称', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
        }
    }
  },
  mounted(){},
  methods:{
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({message: '登录成功',type: 'success'});
            // http.getPlain('AssetNewest','PlateId=109&PageSize=9&PageIndex=1').then(res=>{ //学生专区
            //     this.list1 = res.result.dtos||[];
            // }).catch(err=>{
            //     console.log(err);
            // })
            this.$store.commit('login',{token:'d54fsd65f46s5d4f6erw6874gdf41g5df4g654gh98et7re1tg'});
            this.$router.push('/appInfo')
          } else {
            this.$message.error('登录失败');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
}
</script>

<style lang="less" scoped>
@import "../../assets/css/color.less";/**通用文件 */
    .footer-page{
      width: 100%;
      height: 100%;
      background-color: #f1f1f1;
      padding: 100px;
      // background-image: linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%);
    }
    .form-warp{
      background-color: @fff;
      box-shadow: 0px 1px 5px 0px @F4F7FC;
      border-radius: 5px;
      width: 500px;
      margin-left: auto;
      margin-right: auto;
      padding: 50px;
      .title{
        font-size: 24px;
        padding-bottom: 50px;
        text-align: center;
      }
      .b-center{
        text-align: right;
        margin-top: 30px;
      }
      .btn-block{
        width: 300px;
      }
    }
</style>
