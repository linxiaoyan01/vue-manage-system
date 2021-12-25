import Cookie from 'js-cookie'
export default{
    state:{
        isCollapse:false,
        menu:[],
        currentMenu: null,
        tabList: [
            {
                path:'/',
                name: 'home',
                label:'首页',
                icon:'s-home'
            },
        ]
    },
    mutations:{
        selectMenu(state, val){
            if(val.name !== 'home'){
                state.currentMenu = val
                let result = state.tabList.findIndex(item => item.name === val.name)
                result == -1 ? state.tabList.push(val) : ''               
            }else{
                state.currentMenu = null
            }          
        },
        closeTab(state, val){
            let result = state.tabList.findIndex(item => item.name === val.name)
            state.tabList.splice(result, 1)
        },
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        setMenu(state, val){
             state.menu = val
             Cookie.set('menu', JSON.stringify(val))   
        },
        clearMenu(state){
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state, router) {
            if (!Cookie.get('menu')) {
              return
            }
            let menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            let currentMenu = [
              {
                path: '/',
                component: () => import(`@/views/Main.vue`),
                children: []
              }
            ]
            menu.forEach(item => {
              if (item.children) {
                item.children = item.children.map(item => {
                  item.component = () => import(`@/views/${item.url}`)
                  return item
                })
                currentMenu[0].children.push(...item.children)
              } else {
                item.component = () => import(`@/views/${item.url}`)
                currentMenu[0].children.push(item)
              }
            })
            router.addRoutes(currentMenu)
        },
        getMenu(state) {
            if (Cookie.get('tagList')) {
              let tagList = JSON.parse(Cookie.get('tagList'))
              state.tabsList = tagList
            }
        },
    },
    actions:{}
}