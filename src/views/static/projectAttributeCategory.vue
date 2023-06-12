<template>
  <div style="margin-top:10px">
    <div style="width: 95%; margin:0 auto">
      <el-form-item
        label="商品属性分类编号"
        :label-width="140"
        style="display:inline-flex; margin-right: 10px;"
      >
        <el-input
          v-model="searchId"
          placeholder="请输入商品属性分类编号"
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
      :data="categories"
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
        prop="paramCount"
        label="属性数量"
        width="120"
      /> <el-table-column
        prop="attributeCount"
        label="参数数量"
        width="120"
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
    title="商品属性分类编辑"
  >
    <el-form :model="projectAttributeCategory">

      <el-form-item
        label="名称"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="projectAttributeCategory.name"
          placeholder="请输入名称"
          style="width:80%;"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="属性数量"
        :label-width="formLabelWidth"
      >
        <el-input-number
          v-model="projectAttributeCategory.attributeCount"
          style="width:80%;"
          placeholder="请输入属性数量"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        label="参数数量"
        :label-width="formLabelWidth"
      >
        <el-input-number
          v-model="projectAttributeCategory.paramCount"
          style="width:80%;"
          placeholder="请输入参数数量"
        ></el-input-number>
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
  getCategoryPage,
  getOne,
} from "../../http/projectAttributeCategory";
import { cloneDeep } from "lodash-es";
export default defineComponent({
  data() {
    return {
      categories: [],
      page: {
        total: 0,
        current: 1,
        size: 10,
      },
      searchId: null,
      dialogFormVisible: false,
      projectAttributeCategory: {
        name: "",
        id: 0,
        attributeCount: 0,
        paramCount: 0,
      },
      formLabelWidth: 80,
    };
  },
  mounted() {
    this.getCategoriesPage(1);
  },
  methods: {
    search() {
      if (this.searchId == null || this.searchId == "") {
        alert("请输入商品属性分类编号后查询");
        return;
      }
      getOne(this.searchId)
        .then((res) => {
          if (res.data == null) {
            this.categories = [];
          } else {
            this.categories = [];
            this.categories.push(res.data.help);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    research() {
      this.searchId = null;
      this.getCategoriesPage(1);
    },
    toEdit(projectAttributeCategory) {
      this.dialogFormVisible = true;
      this.projectAttributeCategory = cloneDeep(projectAttributeCategory);
    },
    getCategoriesPage(current) {
      const data = {
        current: current,
        size: 10,
      };
      getCategoryPage(data)
        .then((res) => {
          console.log(res);
          const page = res.data.page;
          this.categories = page.records;
          this.page = page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    currentchange(current) {
      // console.log(current);
      this.getCategoriesPage(current);
      this.page.current = current; //数据更新到目前显示的页面
    },
    del(id) {
      if (confirm("是否删除") == true) console.log(id);
      console.log(id);
      delOne(id)
        .then((res) => {
          if (res.success) {
            this.getCategoriesPage(this.page.current);
          } else {
            return false;
          }
        })
        .catch((err) => {});
    },
    toAdd() {
      this.dialogFormVisible = true;
      this.projectAttributeCategory = {
        name: "",
        id: 0,
        attributeCount: 0,
        paramCount: 0,
      };
    },
    save() {
      const projectAttributeCategory = this.projectAttributeCategory;
      if (projectAttributeCategory.id == 0) {
        addOne(projectAttributeCategory)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getCategoriesPage(this.page.current);
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
        updateOne(projectAttributeCategory)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getCategoriesPage(this.page.current);
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