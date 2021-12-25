<template>
    <header>
        <div class="l-content">
            <el-button type="primary" icon="el-icon-menu" size="mini" @click="collapse"></el-button>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="currentMenu.path" v-if="currentMenu">
                    {{ currentMenu.label }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
            <span class="el-dropdown-link">
                <img :src="userImg" class="userImg">
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        </div>
        
    </header>
</template>

<script>
import {mapState} from 'vuex'
 export default{
    computed:{
        ...mapState({
            currentMenu: state => state.tab.currentMenu
        })
    },
    data(){
        return {
            userImg: require('../assets/images/user.png')
        }
    },
    methods:{
        collapse(){
            this.$store.commit('collapseMenu')
        },
        logOut() {
            this.$store.commit('clearToken')
            this.$store.commit('clearMenu')
            location.reload()
        }   
    }
 }
</script>

<style lang="scss" scoped>
header{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.el-button{
    background-color: rgb(255, 255, 255);
    color: #000;
}
.r-content{
    .userImg {
        width: 40px;
        height: 40px;
        border-radius: 50%
    }
}
.l-content{
    display: flex;
    align-items: center;
    .el-button{
        margin-right: 20px;
    }
}
</style>
<style lang="scss">
.el-breadcrumb__item{
    .el-breadcrumb__inner{
        color: #666666;
        font-weight: normal;
    }
    &:last-child{
        .el-breadcrumb__inner{
            color: #ffffff;
        }
    }
}
</style>