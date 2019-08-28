<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>每日推荐</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="wareList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="expand_item">
              <el-form label-position="left" inline class="expand_form">
                <el-form-item label="商品名称">
                  <span>{{ props.row.title }}</span>
                </el-form-item>
                <el-form-item label="商品链接">
                  <span>{{ props.row.itemUrl }}</span>
                </el-form-item>
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.vid }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="优惠券金额">
                  <span>{{ props.row.couponInfo.couponMoney }}</span>
                </el-form-item>
              </el-form>
              <div>
                <img :src="props.row.coverImage" alt />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品id" prop="id" width="140px"></el-table-column>
        <el-table-column label="商品名称" prop="title"></el-table-column>
        <el-table-column label="商品价格" prop="price" width="100px"></el-table-column>
        <el-table-column label="佣金比例" prop="couponInfo.couponRates" width="100px"></el-table-column>
        <el-table-column label="推荐排序" prop="order + ''" width="140px"></el-table-column>
        <el-table-column label="更新时间" prop="updateDate" width="140px"></el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button
              type="success"
              icon="el-icon-edit-outline"
              size="mini"
              v-on:click="editWare(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteWare(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      wareList: []
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    deleteWare(id) {},
    editWare(id) {
      this.$router.push({
        path: '/wares/edit',
        query: {
          pid: id
        }
      })
    },
    async getGoodsList() {
      const { data: res, status } = await this.$axios.get('search_wares', {
        params: this.queryInfo
      })

      if (status == 200 && res.state == 0) {
        this.$el_message.success('获取商品成功')
        console.log(res.data)
        this.wareList = res.data.goods
        this.total = res.data.total
      } else {
        this.$el_message.error('没有相关商品')
      }
    }
  },

  handleSizeChange(newSize) {
    this.queryInfo.pagesize = newSize
    this.getGoodsList()
  },
  handleCurrentChange(newPage) {
    this.queryInfo.pagenum = newPage
    this.getGoodsList()
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

.el-table {
  margin-top: 15px;
  font-size: 12px;
}

.expand_item {
  display: flex;
  .expand_form {
    flex: 2;
    width: 90px;
    color: #333333;
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 70%;
    }
  }
  > div {
    flex: 1;
    width: 200px;
    height: 200px;
    img {
      height: 100%;
    }
  }
}
</style>