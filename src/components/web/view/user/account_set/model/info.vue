<template>
  <div>
    <div class="user-box">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="头像">
          <div class="avatar">
            <!-- <img src="" alt=""> -->
          </div>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="form.name" placeholder="请输入" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.name" style="width:400px">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="form.name" type="date" placeholder="请选择" style="width:400px"></el-date-picker>
        </el-form-item>
        <el-form-item label="所在地区">
          <el-input v-model="form.name" placeholder="请输入" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.name" placeholder="请输入" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="所在单位">
          <el-input v-model="form.name" placeholder="请输入" style="width:400px"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="edu-box">
      <h2 class="edu-title">学历信息</h2>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="学历">
          <el-select v-model="form.name" placeholder="请选择" style="width:400px">
            <el-option label="label" value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="院系">
          <el-select v-model="form.name" placeholder="请选择" style="width:400px">
            <el-option label="label" value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="form.name" placeholder="请选择" style="width:400px">
            <el-option label="label" value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="form.name" placeholder="请选择" style="width:400px">
            <el-option label="label" value="value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="form.name" placeholder="请选择" style="width:400px">
            <el-option label="label" value="value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-box">
        <el-button type="info" size="medium" >取消</el-button>
        <el-button type="primary" size="medium">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {},
  components: {},
  data() {
    return {
      form: {
        name: ''
      },
      n: ''
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style scoped lang="less">
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
  vertical-align: top;
  margin-top: 135px;

  .edu-title {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
    color: rgba(0, 0, 0, 0.65);
    padding-left: 120px;
    margin-bottom: 20px;
  }
}
.btn-box{
    padding: 20px 120px 30px;
}
</style>

