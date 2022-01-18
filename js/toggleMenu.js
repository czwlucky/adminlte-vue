// 抽取可复用部分代码，使用者可以引入到组件的setup中进行“安装”
const toggleMenu = {
    toggle: ()=> {
        return Vue.inject('toggleMenu', ()=> {console.warn("没有引入Layout组件，不可实现toggleMenu效果")});
    }
} 