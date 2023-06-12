<template>
  <div style="margin-top:10px">
    <div style="width: 95%; margin:0 auto">
      <el-form-item
        label="商品编号"
        :label-width="80"
        style="display:inline-flex; margin-right: 10px;"
      >
        <el-input
          v-model="searchId"
          placeholder="请输入商品编号"
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
      :data="projects"
      style="width: 95%; margin:0 auto"
    >
      <el-table-column
        prop="id"
        label="编号"
        width="80"
      />

      <el-table-column
        label="货号"
        width="120"
        prop="productSn"
      />

      <el-table-column
        prop="name"
        label="名称"
        width="120"
      />

      <el-table-column
        prop="originalPrice"
        label="市场价"
        width="100"
      />
      <el-table-column
        label="新品状态"
        width="100"
      >
        <template #default="scope">
          {{scope.row.level == 0 ? "不是新品":"新品"}}
        </template>
      </el-table-column>
      <el-table-column
        label="预告商品"
        width="100"
      >
        <template #default="scope">
          {{scope.row.previewStatus == 0 ? "不是":"是"}}
        </template>
      </el-table-column>

      <el-table-column
        label="价格"
        width="100"
        prop="price"
      />

      <el-table-column
        label="上架状态"
        width="100"
      >
        <template #default="scope">
          {{scope.row.publishStatus == 0 ? "下架":"上架"}}
        </template>
      </el-table-column>

      <el-table-column
        label="单位"
        width="100"
        prop="unit"
      />

      <el-table-column
        label="审核状态"
        width="100"
      >

        <template #default="scope">
          {{scope.row.verifyStatus == 0 ? "未审核":"审核通过"}}
        </template>
      </el-table-column>

      <el-table-column
        label="描述"
        width="150"
        prop="description"
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
    title="商品编辑"
  >
    <el-form :model="project">

      <el-form-item
        label="货号"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="project.productSn"
          placeholder="请输入货号"
          style="width:80%;"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="名称"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="project.name"
          placeholder="请输入名称"
          style="width:80%;"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="商品分类"
        :label-width="formLabelWidth"
      >
        <t-pagination-select
          @page-change="pageChange"
          :optionSource="categories"
          v-model="project.productCategoryId"
          labelKey="name"
          valueKey="id"
          style="width:90%;"
          placeholder="请选择商品分类"
          :paginationOption="selectPage"
        />
      </el-form-item>

      <el-form-item
        label="所属品牌"
        :label-width="formLabelWidth"
      >
        <t-pagination-select
          @page-change="pageBrandChange"
          :optionSource="brands"
          v-model="project.brandId"
          labelKey="name"
          valueKey="id"
          style="width:90%;"
          placeholder="请选择所属品牌"
          :paginationOption="selectBrandPage"
        />
      </el-form-item>

      <el-form-item
        label="市场价"
        :label-width="formLabelWidth"
      >
        <el-input-number
          v-model="project.originalPrice"
          placeholder="请输入市场价"
          style="width:80%;"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        label="新品状态"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="project.newStatus"
          placeholder="请选择新品状态"
          style="width:80%;"
        >
          <el-option
            label="不是新品"
            :value="0"
          />
          <el-option
            label="新品"
            :value="1"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="预告商品"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="project.previewStatus"
          placeholder="请选择预告商品"
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
        label="价格"
        :label-width="formLabelWidth"
      >
        <el-input-number
          v-model="project.price"
          placeholder="请输入价格"
          style="width:80%;"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        label="上架状态"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="project.publishStatus"
          placeholder="请选择上架状态"
          style="width:80%;"
        >
          <el-option
            label="下架"
            :value="0"
          />
          <el-option
            label="上架"
            :value="1"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="单位"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="project.unit"
          placeholder="请输入单位"
          style="width:80%;"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="审核状态"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="project.verifyStatus"
          placeholder="请选择审核状态"
          style="width:80%;"
        >
          <el-option
            label="未审核"
            :value="0"
          />
          <el-option
            label="审核通过"
            :value="1"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="描述"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="project.description"
          placeholder="请输入描述"
          type="textarea"
          style="width:80%"
          :rows="3"
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
  getProjectPage,
  getOne,
} from "../../http/project";
import { getProjectCategoryPage } from "../../http/projectCategory";
import { getBrandPage } from "../../http/brand";
import TPaginationSelect from "./module/TPaginationSelect.vue";
import { cloneDeep } from "lodash-es";
export default defineComponent({
  data() {
    return {
      projects: [],
      categories: [],
      page: {
        total: 0,
        current: 1,
        size: 10,
      },
      selectPage: {
        total: 0,
        current: 1,
        size: 6,
        pagerCount: 5,
      },
      selectBrandPage: {
        total: 0,
        current: 1,
        size: 6,
        pagerCount: 5,
      },
      searchId: null,
      brands: [],
      dialogFormVisible: false,
      project: {
        id: 0,
        name: "",
        newStatus: 0,
        originalPrice: 0,
        previewStatus: 0,
        price: 0,
        productSn: "",
        publishStatus: 0,
        unit: "",
        verifyStatus: 0,
      },
      formLabelWidth: 80,
    };
  },
  components: {
    "t-pagination-select": TPaginationSelect,
  },
  mounted() {
    this.getProjectsPage(1);
    this.getCategoriesPage(1);
    this.getBrandsPage(1);
  },
  methods: {
    getBrandsPage(current) {
      const data = {
        current: current,
        size: 6,
      };
      getBrandPage(data)
        .then((res) => {
          const page = res.data.page;
          this.brands = page.records;
          this.selectBrandPage = page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCategoriesPage(current) {
      const data = {
        current: current,
        size: 6,
      };
      getProjectCategoryPage(data)
        .then((res) => {
          const page = res.data.page;
          this.categories = page.records;
          this.selectPage = page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pageBrandChange(current) {
      this.getBrandsPage(current);
    },
    pageChange(current) {
      this.getCategoriesPage(current);
    },
    search() {
      if (this.searchId == null || this.searchId == "") {
        alert("请输入商品编号后查询");
        return;
      }
      getOne(this.searchId)
        .then((res) => {
          if (res.data == null) {
            this.projects = [];
          } else {
            this.projects = [];
            this.projects.push(res.data.help);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    research() {
      this.searchId = null;
      this.getProjectsPage(1);
    },
    toEdit(project) {
      this.dialogFormVisible = true;
      this.project = cloneDeep(project);
    },
    getProjectsPage(current) {
      const data = {
        current: current,
        size: 10,
      };
      getProjectPage(data)
        .then((res) => {
          console.log(res);
          const page = res.data.page;
          this.projects = page.records;
          this.page = page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    currentchange(current) {
      // console.log(current);
      this.getProjectsPage(current);
      this.page.current = current; //数据更新到目前显示的页面
    },
    del(id) {
      if (confirm("是否删除") == true) console.log(id);
      console.log(id);
      delOne(id)
        .then((res) => {
          if (res.success) {
            this.getProjectsPage(this.page.current);
          } else {
            return false;
          }
        })
        .catch((err) => {});
    },
    toAdd() {
      this.dialogFormVisible = true;
      this.project = {
        id: 0,
        name: "",
        newStatus: 0,
        originalPrice: 0,
        previewStatus: 0,
        price: 0,
        productSn: "",
        publishStatus: 0,
        unit: "",
        verifyStatus: 0,
      };
    },
    save() {
      const project = this.project;
      if (project.id == 0) {
        addOne(project)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getProjectsPage(this.page.current);
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
        updateOne(project)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getProjectsPage(this.page.current);
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