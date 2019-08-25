<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt />
        <span>后台管理系统</span>
      </div>
      <el-button type="success" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#D7F1E6"
          text-color="#6A8BAD"
          active-text-color="#42b983"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <el-submenu :index="item.id + ''" v-for="item in menu_list" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item :index="'/' + sub_item.path" v-for="sub_item in item.children" :key="sub_item.id" v-on:click="saveNavState('/' + sub_item.path)">
              <template slot="title">
                <i :class="sub_item.icon"></i>
                <span>{{sub_item.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="4" disabled>
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menu_list: [],
      isCollapse: false,
      activePath: ''
    }
  },
  created() {
    this.get_menus()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
      this.$el_message.success('退出成功')
    },
    async get_menus() {
      const { data: res, status } = await this.$axios.get('menus')
      if (status != 200 || res.state != 0)
        return this.$el_message.error(res.msg)
      // console.log(res);
      this.menu_list = res.data
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #bbe6d6;
  display: flex;
  justify-content: space-between;
  // padding-left: 0;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
    }
    span {
      margin-left: 20px;
    }
  }
}

.el-aside {
  background-color: #e4f5ef;
  .toggle-button {
    background-color: #42b983;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
    padding: 0;
  }
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #c8ebdf;
}

.el-footer {
  background-color: #ffffff;
}
</style>