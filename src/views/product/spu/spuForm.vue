<template>
  <el-form label-width="120px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU名称">
      <el-select placeholder="请选择分类">
        <el-option label="选项1" value="1"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU图标">
      <el-upload v-model:file-list="fileList" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <div style="width: 200px;">
        <el-select>
          <el-option label="选项1" value="1"></el-option>
        </el-select>
      </div>
      <el-button type="primary" size="default" icon="Plus" style="margin-left: 10px;">添加属性值</el-button>
      <!-- table展示销售属性与属性值的地方 -->
      <el-table border style="margin: 10px 0px">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="销售属性名字" type="index" align="center" width="120px"></el-table-column>
        <el-table-column label="销售属性值" type="index" align="center"></el-table-column>
        <el-table-column label="操作" type="index" align="center" width="120px"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
    
  </el-form>
</template>

<script lang="ts" setup>
  let $emit = defineEmits(['changeScene'])

  // 点击取消按钮：通知父组件切换场景
  const cancel = () => {
    $emit('changeScene', 0)
  }
</script>

<style scoped lang="scss"></style>