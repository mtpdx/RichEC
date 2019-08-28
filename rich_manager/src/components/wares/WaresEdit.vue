<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品编辑</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-form :model="ware" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="ware.title" disabled></el-input>
        </el-form-item>
        <el-form-item label="推荐排序">
          <el-input v-model="ware.order"></el-input>
        </el-form-item>
        <el-form-item label="商品ID">
          <el-input v-model="ware.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品链接">
          <el-input v-model="ware.itemUrl" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pid: '',
      ware: {}
    }
  },
  created() {
    this.pid = this.$route.query.pid
    this.wareDetail()
  },
  methods: {
    async wareDetail() {
      const { data: res, status } = await this.$axios.get('ware_detail', {
        params: { pid: this.pid }
      })

      if (status == 200 && res.state == 0) {
        this.$el_message.success('获取商品成功')
        this.ware = res.data
      } else {
        this.$el_message.error('没有相关商品')
      }
    },
    async onSubmit() {
      const { data: res, status } = await this.$axios.get('ware_update', {
        params: { pid: this.pid, order: this.ware.order }
      })

      if (status == 200 && res.state == 0) {
        this.$el_message.success('修改成功')
        this.$router.go(-1)
      } else {
        this.$el_message.error('修改失败')
      }
      
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}

.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
</style>