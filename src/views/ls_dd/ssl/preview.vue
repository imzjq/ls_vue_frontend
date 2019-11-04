<template>
    <div class="app-container">
        <el-row >
            <el-col >上传成功个数{{data.success}}</el-col>
        </el-row>
            <div class="filter-container"  v-if="data.errer.length > 0"  style="margin: 30px 0;" >
                <el-row >
                    <el-col >错误证书</el-col>
                </el-row>
                <el-row >
                    <el-col v-for="(item,index) in data.errer" :key="index" :span="6">
                        {{item}}
                    </el-col>
                </el-row>
            </div>

        <div class="filter-container" v-if="data.valid.length > 0" style="margin: 30px 0;">
            <el-row >
                <el-col >无效证书</el-col>
            </el-row>
            <el-row >
                <el-col v-for="(item,index) in data.valid" :key="index" :span="6">
                    {{item}}
                </el-col>
            </el-row>
        </div>
        <div class="filter-container"  v-if="data.exist.length > 0" style="margin: 30px 0;">
            <el-row >
                <el-col >存在证书</el-col>
            </el-row>
            <el-row >
                <el-col v-for="(item,index) in data.exist" :key="index" :span="6">
                    {{item}}
                </el-col>
            </el-row>
        </div>
        <div class="filter-container" v-if="data.match.length > 0" style="margin: 30px 0;">
            <el-row >
                <el-col >匹配无效</el-col>
            </el-row>
            <el-row >
                <el-col v-for="(item,index) in data.match" :key="index" :span="6">
                    {{item}}
                </el-col>
            </el-row>
        </div>
    </div>

    <!--<div class="app-container">-->
    <!--<el-form-item label="错误证书">-->
    <!--<div class="filter-container" >-->
        <!--<div style="margin: 15px 0;"></div>-->
        <!--<el-row  >-->
            <!--<el-col :span="5" v-for="(item,index) in data.error" :key="index">-->
                <!--{{item}}-->
            <!--</el-col>-->
        <!--</el-row>-->
    <!--</div>-->
    <!--</el-form-item>-->

    <!--<el-form-item label="无效证书">-->
        <!--<div class="filter-container" >-->
            <!--<div style="margin: 15px 0;"></div>-->
            <!--<el-row  >-->
                <!--<el-col :span="5" v-for="(item,index) in data.valid" :key="index">-->
                    <!--{{item}}-->
                <!--</el-col>-->
            <!--</el-row>-->
        <!--</div>-->
    <!--</el-form-item>-->

    <!--<el-form-item label="匹配无效">-->
        <!--<div class="filter-container" >-->
            <!--<div style="margin: 15px 0;"></div>-->
            <!--<el-row  >-->
                <!--<el-col :span="5" v-for="(item,index) in data.match" :key="index">-->
                    <!--{{item}}-->
                <!--</el-col>-->
            <!--</el-row>-->
        <!--</div>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="存在证书">-->
        <!--<div class="filter-container" >-->
            <!--<div style="margin: 15px 0;"></div>-->
            <!--<el-row  >-->
                <!--<el-col :span="5" v-for="(item,index) in data.exist" :key="index">-->
                    <!--{{item}}-->
                <!--</el-col>-->
            <!--</el-row>-->
        <!--</div>-->
    <!--</el-form-item>-->
    <!--</div>-->

</template>

<script>
  export default {
    name: 'preview',
    props:['data'],
  }
</script>

<style scoped>

</style>
