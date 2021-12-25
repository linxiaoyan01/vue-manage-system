<template>
    <el-menu
        :collapse="isCollapse"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff">

        <el-menu-item active-text-color="#409EFF" :index="item.name" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
            <i :class="'el-icon-' +item.icon"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        
        <el-submenu index="0" v-for="(item,index) in hasChildren" :key="index">
            <template slot="title">
                <i :class="'el-icon-'+ item.icon"></i>
                <span>{{ item.label }}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item :index="subItem.name" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="clickMenu(subItem)">
                    <i :class="'el-icon-' + subItem.icon"></i>
                    <span slot="title">{{ subItem.label }}</span>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>

    export default {
        computed:{
            noChildren(){
                return this.menu.filter(item => !item.children)
            },
            hasChildren(){
                return this.menu.filter(item => item.children)
            },
            isCollapse(){
                return  this.$store.state.tab.isCollapse
            },
            menu(){
                return this.$store.state.tab.menu
            }
        },
        data(){
            return{
                asideMenu:[
                    {
                        path:'/',
                        name: 'home',
                        label:'首页',
                        icon:'s-home'
                    },
                    {
                        path:'/video',
                        name: 'video',
                        label:'视频管理',
                        'icon':'video-play'
                    },
                    {
                        path:'/user',
                        name: 'user',
                        label:'用户管理',
                        icon:'user'
                    },
                    {
                        label:'其他',
                        icon:'user',
                        children:[
                            {
                                path: '/page1',
                                name: 'page1',
                                label:'页面1',
                                icon:'setting'
                            },
                            {
                                path: 'page2',
                                name: 'page2',
                                label:'页面2',
                                icon:'setting'
                            }
                        ]
                    }
                ]
            }
        },
        methods:{
            clickMenu(item){
                this.$router.push({name: item.name})
                this.$store.commit('selectMenu',item)
            }  
        }
    }
</script>

<style lang="scss" scoped>
.el-menu{
    height: 100%;
    border: none
}
.el-menu-vertical-demo:not(.el-menu--collapse){
    width: 200px;
    min-height: 400px;
}
</style>