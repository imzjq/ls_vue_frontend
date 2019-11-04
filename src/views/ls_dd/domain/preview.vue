<template>
    <div>
      <el-row v-for="(item,index) in data" :key="index">
        {{item}}
      </el-row>
    </div>
</template>

<script>
  export default {
    name: 'preview',
    props:['data'],
  }
</script>

<style scoped>

</style>
