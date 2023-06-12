<template>
  <el-row class="tac">
    <el-col :span="3">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="/projectCategory" @click="goTo('/projectCategory')">
          <span >商品分类</span>
        </el-menu-item>
        <el-menu-item index="/brand" @click="goTo('/brand')">
          <span >品牌管理</span>
        </el-menu-item>
        <el-menu-item index="/projectAttributeCategory" @click="goTo('/projectAttributeCategory')">
          <span >商品属性分类</span>
        </el-menu-item>
        <el-menu-item index="/projectAttribute" @click="goTo('/projectAttribute')">
          <span >商品属性</span>
        </el-menu-item>
        <el-menu-item index="/project" @click="goTo('/project')">
          <span>商品管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="21">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>
<script>
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { useUserStore } from "../../store/user";
export default defineComponent({
  setup() {
    //组合api
    const store = useUserStore();
    const { count } = storeToRefs(store);
    console.log(count);
    return {
      count,
    };
  },
  data() {
    return {
      msg: "this is vue app",
      msgHtml: "<h3>this is v-html 指令</h3>",
      home: "home",
      ok: true,
      number1: 1, //数量增加
      data: [],
      obj: {
        name: "rose",
        children: {
          name: "22",
        },
      },
      product: {
        name: "mac book",
        price: 99,
        count: 10,
        total: 0,
      },
    };
  },
  computed: {
    //商品的价格计算
    //简单数字计算
    sum() {
      this.product.total = this.product.price * this.product.count;
      return this.product.total;
    },
  },
  mounted() {
    // this.increate();
    // this.sum();
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goTo(path) {
      this.$router.replace(path);
    },
    componentEvent(data) {
      console.log("组件自定义事件", data);
    },
    componentEmitEvent(data) {
      console.log("$emit组件自定义事件", data);
    },
    btnTemple() {
      let str = "home";
      let str1 = `this is vue string temple ${str}`; //字符串模板写法
      console.log(str1);
    },
    // increate() {
    //     this.number1++
    // },
    btnDeep() {
      this.obj.children.age = 23;
    },
    // sum() {
    //     this.product.total = this.product.price * this.product.count;
    // }
  },
  components: {
    //HelloWorld
  },
});
</script>

<style lang="scss" scoped>
.home {
  background-color: $blue;
}

.index {
  background-color: red;
}
</style>
