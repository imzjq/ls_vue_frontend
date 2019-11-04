<template>
    <div class="app-container">
        <el-form ref="form" :model="listQuery"  label-width="80px">
            <el-form style="margin-bottom: 10px;">
                <el-select v-model="listQuery.url" clearable  filterable placeholder="选择域名">
                    <el-option v-for="item in urlOptions" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
                <el-button @click="onSubmit" type="success">下载</el-button>
            </el-form>

        </el-form>

        <div class="filter-container">
            <p>只能下载前一天数据</p>


        </div>


    </div>
</template>

<script>
    import {curd} from '@/api/flow/index'
    import {topLogUrl} from '@/api/public'
    import { getToken } from "@/utils/auth"
    import axios from 'axios'
    export default {
        data() {
            return {
                urlOptions : [],
                listQuery: {
                    url :'',
                },
                disableStatus:true,

                update :false
            }
        },
        created:function(){
            this.getOptions();
        },
        mounted:function(){

        },
        methods: {
            getOptions(){
                topLogUrl().then(response => {
                    //动态添加搜索下拉框的选择列信息
                    this.urlOptions = response.data

                })
            },

            onSubmit() {
                if(this.listQuery.url != '') {
                    axios({
                        method: 'post',
                        url: '/api/flow/link',
                        data: this.listQuery,
                        headers: {'token': getToken()},
                        responseType: 'blob'
                    }).then(response => {
                       if(response.data.code != 200)
                       {
                           this.$notify({
                               title: '注意',
                               message: response.data.msg,
                               type: 'error',
                               duration: 2000
                           })
                           return false;
                       }
                        let url = window.URL.createObjectURL(new Blob([response.data.data.data]))
                        let link = document.createElement('a')
                        link.style.display = 'none'
                        link.href = url
                        link.setAttribute('download', response.data.data.filename)
                        document.body.appendChild(link)
                        link.click()

                    }).catch((error) => {

                    })
                }else{
                    this.$notify({
                        title: '注意',
                        message: '请选择域名',
                        type: 'error',
                        duration: 2000
                    })
                }

            },






        },
    }
</script>

<style scoped>

</style>
