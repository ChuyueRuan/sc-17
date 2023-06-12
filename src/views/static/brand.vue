<template>
  <div style="margin-top:10px">
    <div style="width: 95%; margin:0 auto">
      <el-form-item
        label="品牌编号"
        :label-width="80"
        style="display:inline-flex; margin-right: 10px;"
      >
        <el-input
          v-model="searchId"
          placeholder="请输入品牌编号"
        ></el-input>
      </el-form-item>
      <el-button
        type="primary"
        @click="search"
      >查询</el-button>
      <el-button
        type="warning"
        @click="research"
      >重置</el-button>
      <el-button
        type="success"
        @click="toAdd"
      >添加</el-button>
    </div>
    <el-table
      :data="brands"
      style="width: 95%; margin:0 auto"
    >
      <el-table-column
        prop="id"
        label="编号"
        width="80"
      />
      <el-table-column
        prop="name"
        label="名称"
        width="120"
      />

      <el-table-column
        label="是否是制造商"
        width="120"
      >
        <template #default="scope">
          {{scope.row.factoryStatus == 0 ? "不是":"是"}}
        </template>
      </el-table-column>

      <el-table-column
        prop="productCount"
        label="产品数量"
        width="120"
      />

      <el-table-column
        prop="productCommentCount"
        label="评论数量"
        width="120"
      />

      <el-table-column
        prop="brandStory"
        label="品牌故事"
        width="300"
      />

      <el-table-column
        fixed="right"
        label="功能管理"
        width="120"
      >
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="toEdit(scope.row)"
          >更新</el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="del(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="page.size"
      :total="page.total"
      style="width: 95%; margin:0 auto"
      @current-change="currentchange"
    />
  </div>
  <el-dialog
    v-model="dialogFormVisible"
    title="品牌编辑"
  >
    <el-form :model="brand">

      <el-form-item
        label="名称"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="brand.name"
          placeholder="请输入名称"
          style="width:80%;"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="制造商"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="brand.factoryStatus"
          placeholder="请选择是否为制造商"
          style="width:80%;"
        >
          <el-option
            label="不是"
            :value="0"
          />
          <el-option
            label="是"
            :value="1"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="评论数量"
        :label-width="formLabelWidth"
      >
        <el-input-number
          v-model="brand.productCommentCount"
          placeholder="请输入评论数量"
          style="width:80%;"
        >
        </el-input-number>
      </el-form-item>

      <el-form-item
        label="产品数量"
        :label-width="formLabelWidth"
      >
        <el-input-number
          v-model="brand.productCount"
          placeholder="请输入产品数量"
          style="width:80%;"
        >
        </el-input-number>
      </el-form-item>

      <el-form-item
        label="品牌故事"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="brand.brandStory"
          placeholder="请输入描述"
          type="textarea"
          style="width:80%;"
          :rows="5"
        ></el-input>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="save"
        >保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
            
            <script>
import { defineComponent } from "vue";
import {
  updateOne,
  addOne,
  delOne,
  getBrandPage,
  getOne,
} from "../../http/brand";
import { cloneDeep } from "lodash-es";
export default defineComponent({
  data() {
    return {
      brands: [],
      page: {
        total: 0,
        current: 1,
        size: 10,
      },
      searchId: null,
      dialogFormVisible: false,
      brand: {
        brandStory: "",
        factoryStatus: 0,
        id: 0,
        name: "",
        productCommentCount: 0,
        productCount: 0,
      },
      formLabelWidth: 80,
    };
  },
  mounted() {
    this.getBrandsPage(1);
  },
  methods: {
    search() {
      if (this.searchId == null || this.searchId == "") {
        alert("请输入品牌编号后查询");
        return;
      }
      getOne(this.searchId)
        .then((res) => {
          if (res.data == null) {
            this.brands = [];
          } else {
            this.brands = [];
            this.brands.push(res.data.help);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    research() {
      this.searchId = null;
      this.getBrandsPage(1);
    },
    toEdit(brand) {
      this.dialogFormVisible = true;
      this.brand = cloneDeep(brand);
    },
    getBrandsPage(current) {
      const data = {
        current: current,
        size: 10,
      };
      getBrandPage(data)
        .then((res) => {
          console.log(res);
          const page = res.data.page;
          this.brands = page.records;
          this.page = page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    currentchange(current) {
      // console.log(current);
      this.getBrandsPage(current);
      this.page.current = current; //数据更新到目前显示的页面
    },
    del(id) {
      if (confirm("是否删除") == true) console.log(id);
      console.log(id);
      delOne(id)
        .then((res) => {
          if (res.success) {
            this.getBrandsPage(this.page.current);
          } else {
            return false;
          }
        })
        .catch((err) => {});
    },
    toAdd() {
      this.dialogFormVisible = true;
      this.brand = {
        brandStory: "",
        factoryStatus: 0,
        id: 0,
        name: "",
        productCommentCount: 0,
        productCount: 0,
      };
    },
    save() {
      const brand = this.brand;
      if (brand.id == 0) {
        addOne(brand)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getBrandsPage(this.page.current);
              ElMessage(res.msg);
            } else {
              ElMessage(res.msg);
              return false;
            }
          })
          .catch((err) => {
            ElMessage("网络错误联系管理员");
          });
      } else {
        updateOne(brand)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getBrandsPage(this.page.current);
              ElMessage(res.msg);
            } else {
              ElMessage(res.msg);
              return false;
            }
          })
          .catch((err) => {
            ElMessage("网络错误联系管理员");
          });
      }
    },
  },
});
</script>
        <style scoped>
.el-col-12 {
  width: 15%;
}
</style>