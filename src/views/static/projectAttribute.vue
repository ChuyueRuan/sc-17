<template>
  <div style="margin-top:10px">
    <div style="width: 95%; margin:0 auto">
      <el-form-item
        label="商品属性编号"
        :label-width="110"
        style="display:inline-flex; margin-right: 10px;"
      >
        <el-input
          v-model="searchId"
          placeholder="请输入商品属性编号"
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
      :data="attributes"
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
        label="筛选样式"
        width="100"
      >
        <template #default="scope">
          {{ scope.row.filterType == 0 ? "普通" : "颜色" }}
        </template>
      </el-table-column>
      <el-table-column
        label="支持手动"
        width="100"
      >
        <template #default="scope">
          {{ scope.row.handAddStatus == 0 ? "不支持" : "支持" }}
        </template>
      </el-table-column>
      <el-table-column
        label="录入方式"
        width="120"
      >
        <template #default="scope">
          {{ scope.row.inputType == 0 ? "手工录入" : "列表中选取" }}
        </template>
      </el-table-column>
      <el-table-column
        label="是否关联"
        width="100"
      >
        <template #default="scope">
          {{ scope.row.relatedStatus == 0 ? "不关联" : "关联" }}
        </template>
      </el-table-column>
      <el-table-column
        label="检索类型"
        width="100"
      >
        <template #default="scope">
          {{ scope.row.searchType == 1 ? "关键字检索" : "范围检索" }}
        </template>
      </el-table-column>
      <el-table-column
        label="选择类型"
        width="100"
      >
        <template #default="scope">
          {{ scope.row.selectType == 0 ? "单选" : "多选" }}
        </template>
      </el-table-column>
      <el-table-column
        label="属性的类型"
        width="100"
      >
        <template #default="scope">
          {{ scope.row.type == 0 ? "规格" : "参数" }}
        </template>
      </el-table-column>
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
    title="商品属性编辑"
  >
    <el-form :model="projectAttribute">

      <el-form-item
        label="名称"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="projectAttribute.name"
          placeholder="请输入名称"
          style="width:80%;"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="筛选样式"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="projectAttribute.filterType"
          placeholder="请选择筛选样式"
          style="width:80%;"
        >
          <el-option
            label="普通"
            :value="0"
          />
          <el-option
            label="颜色"
            :value="1"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="支持手动"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="projectAttribute.handAddStatus"
          placeholder="请选择支持手动"
          style="width:80%;"
        >
          <el-option
            label="不支持"
            :value="0"
          />
          <el-option
            label="支持"
            :value="1"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="录入方式"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="projectAttribute.inputType"
          placeholder="请选择录入方式"
          style="width:80%;"
        >
          <el-option
            label="手工录入"
            :value="0"
          />
          <el-option
            label="列表中选取"
            :value="1"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="是否关联"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="projectAttribute.relatedStatus"
          placeholder="请选择是否关联"
          style="width:80%;"
        >
          <el-option
            label="不关联"
            :value="0"
          />
          <el-option
            label="关联"
            :value="1"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="商品属性分类"
        :label-width="100"
      >
        <t-pagination-select
          @page-change="pageChange"
          :optionSource="categories"
          v-model="projectAttribute.productAttributeCategoryId"
          labelKey="name"
          valueKey="id"
          style="width:80%;"
          placeholder="请选择商品属性分类"
          :paginationOption="selectPage"
        />
      </el-form-item>

      <el-form-item
        label="检索类型"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="projectAttribute.searchType"
          placeholder="请选择检索类型"
          style="width:80%;"
        >
          <el-option
            label="关键字检索"
            :value="1"
          />
          <el-option
            label="范围检索"
            :value="2"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="选择类型"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="projectAttribute.selectType"
          placeholder="请选择选择类型"
          style="width:80%;"
        >
          <el-option
            label="单选"
            :value="1"
          />
          <el-option
            label="多选"
            :value="2"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="排序"
        :label-width="formLabelWidth"
      >
        <el-input-number
          v-model="projectAttribute.sort"
          style="width:80%;"
          placeholder="请输入排序"
        ></el-input-number>
      </el-form-item>

      <el-form-item
        label="类型"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="projectAttribute.selectType"
          placeholder="请选择类型"
          style="width:80%;"
        >
          <el-option
            label="规格"
            :value="0"
          />
          <el-option
            label="参数"
            :value="1"
          />
        </el-select>
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
  getPage,
  getOne,
} from "../../http/projectAttribute";
import { getCategoryPage } from "../../http/projectAttributeCategory";
import TPaginationSelect from "./module/TPaginationSelect.vue";
import { cloneDeep } from "lodash-es";
export default defineComponent({
  data() {
    return {
      attributes: [],
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
      searchId: null,
      dialogFormVisible: false,
      projectAttribute: {
        filterType: 0,
        handAddStatus: 0,
        inputType: 0,
        name: "",
        id: 0,
        relatedStatus: 0,
        searchType: 1,
        selectType: 1,
        sort: 0,
        type: 0,
      },
      categories: [],
      formLabelWidth: 80,
    };
  },
  mounted() {
    this.getAttributesPage(1);
    this.getCategoriesPage(1);
  },
  components: {
    "t-pagination-select": TPaginationSelect,
  },
  methods: {
    search() {
      if (this.searchId == null || this.searchId == "") {
        alert("请输入商品属性编号后查询");
        return;
      }
      getOne(this.searchId)
        .then((res) => {
          if (res.data == null) {
            this.attributes = [];
          } else {
            this.attributes = [];
            this.attributes.push(res.data.help);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    research() {
      this.searchId = null;
      this.getAttributesPage(1);
    },
    toEdit(projectAttribute) {
      this.dialogFormVisible = true;
      this.projectAttribute = cloneDeep(projectAttribute);
    },
    getCategoriesPage(current) {
      const data = {
        current: current,
        size: 6,
      };
      getCategoryPage(data)
        .then((res) => {
          const page = res.data.page;
          this.categories = page.records;
          this.selectPage = page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pageChange(current) {
      this.getCategoriesPage(current);
    },
    getAttributesPage(current) {
      const data = {
        current: current,
        size: 10,
      };
      getPage(data)
        .then((res) => {
          console.log(res);
          const page = res.data.page;
          this.attributes = page.records;
          this.page = page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    currentchange(current) {
      // console.log(current);
      this.getAttributesPage(current);
      this.page.current = current; //数据更新到目前显示的页面
    },
    del(id) {
      if (confirm("是否删除") == true) console.log(id);
      console.log(id);
      delOne(id)
        .then((res) => {
          if (res.success) {
            this.getAttributesPage(this.page.current);
          } else {
            return false;
          }
        })
        .catch((err) => {});
    },
    toAdd() {
      this.dialogFormVisible = true;
      this.projectAttribute = {
        id: 0,
        filterType: 0,
        handAddStatus: 0,
        inputType: 0,
        name: "",
        relatedStatus: 0,
        searchType: 1,
        selectType: 1,
        sort: 0,
        type: 0,
      };
    },
    save() {
      const projectAttribute = this.projectAttribute;
      if (projectAttribute.id == 0) {
        addOne(projectAttribute)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getAttributesPage(this.page.current);
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
        updateOne(projectAttribute)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getAttributesPage(this.page.current);
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