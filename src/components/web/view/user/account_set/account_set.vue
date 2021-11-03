<template>
  <div class="container">
    <header class="header"></header>
    <div class="content-box">
      <div class="content">
        <div class="breadCrumbs"><i class="el-icon-s-home"></i>>账号设置</div>
        <div class="info-box">
          <div class="title">账号设置</div>
          <div class="nav-box">
            <span class="nav-item active">基本信息</span>
            <span class="nav-item">安全设置</span>
            <span class="nav-item">我的读者证</span>
          </div>
          <div class="user-box">
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="头像" class="form-item">
                <div class="avatar">
                  <!-- <img src="" alt=""> -->
                </div>
              </el-form-item>
              <el-form-item label="姓名" class="form-item">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="用户昵称" class="form-item">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio-group v-model="form.name">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="出生日期">
                <el-date-picker v-model="form.name" type="date" placeholder="请选择"></el-date-picker>
              </el-form-item>
              <el-form-item label="所在地区" class="form-item">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="详细地址" class="form-item">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="所在单位" class="form-item">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="edu-box">
            <h2 class="edu-title">学历信息</h2>
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label="学历">
                <el-select v-model="form.name" placeholder="请选择">
                  <el-option label="label" value="value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="院系">
                <el-select v-model="form.name" placeholder="请选择">
                  <el-option label="label" value="value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="专业">
                <el-select v-model="form.name" placeholder="请选择">
                  <el-option label="label" value="value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年级">
                <el-select v-model="form.name" placeholder="请选择">
                  <el-option label="label" value="value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="班级">
                <el-select v-model="form.name" placeholder="请选择">
                  <el-option label="label" value="value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer"></footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: ''
      },
      n: ''
    }
  },
  created() {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 96px;
  background: #a21e1e;
}
.footer {
  width: 100%;
  height: 100px;
  background: #cccccc;
}
.content-box {
  width: 100%;
  background: #eeeeee;

  .content {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding-bottom: 20px;
  }
}
.breadCrumbs {
  padding: 20px 0;
}
.info-box {
  width: 100%;
  background: #ffffff;
  border-radius: 16px;

  .title {
    width: 100%;
    height: 64px;
    border-bottom: 1px solid #ddd;
    font-size: 20px;
    font-weight: bold;
    line-height: 64px;
    padding-left: 20px;
  }

  .nav-box {
    padding: 20px;
    .nav-item {
      display: inline-block;
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      font-size: 18px;
    }
    .active {
      border-bottom: 2px solid #a21e1e;
      font-weight: bold;
    }
  }
  .user-box {
    display: inline-block;
    width: 45%;
    .avatar {
      width: 158px;
      height: 158px;
      background: #ddd;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .edu-box {
    display: inline-block;
    width: 45%;
    .edu-title {
      font-size: 18px;
      font-weight: bold;
      line-height: 25px;
      color: rgba(0, 0, 0, 0.65);
      padding-left: 120px;
      margin-bottom: 20px;
      vertical-align: top;
    }
  }
}
.form-item {
  width: 530px;
}
</style>