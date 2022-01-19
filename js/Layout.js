const Layout = {
    name: "LteLayout",
    props: {
        /* 预加载遮盖层Logo图标 */
        logo: {
            type: String,
            default: "img/AdminLTELogo.png"
        },
        /* 是否显示预加载遮盖层 */
        preloaderVisible: {
            type: Boolean,
            default: false
        },
        // 默认样式
        initialClass: {
            type: Array,
            default() {
                return ['layout-top-nav']
            }
        }
    },
    setup(props) {
        // 预加载遮盖层
        const preloader = Vue.ref(null);
        // 预加载遮盖层是否显示，默认不显示
        const preloaderShow = Vue.ref(props.preloaderVisible);

        // toggle mainsidebar
        const isMainSidebarCollapsed= Vue.ref(false);
        // 向子孙组件提供MainSidebar组件的折叠状态
        Vue.provide('isMainSidebarCollapsed', isMainSidebarCollapsed);
        // 上报折叠状态，为MainSidebar组件提供的方法
        Vue.provide('reportMainSidebarStatus', isCollapsed=> {
            console.log("接收到上传的MainSidebar折叠状态为", isCollapsed)
            isMainSidebarCollapsed.value = isCollapsed;
        })
        // 切换MainSidebar组件折叠状态
        Vue.provide('toggleMenu', ()=> {
            console.log("Provide(toggleMenu)被触发了")
            isMainSidebarCollapsed.value = !isMainSidebarCollapsed.value;
        })

        Vue.onBeforeMount(() => {
            // 阻止动画效果
            document.body.classList.add("hold-transition")
            // 最小化sidebar
            //document.body.classList.add("sidebar-mini")
            // 初始化布局样式
            const initialClass = props.initialClass;
            if (initialClass && initialClass.length) {
                initialClass.forEach( item => {
                    document.body.classList.add(item)
                });
            }
        })

        Vue.onMounted(()=> {
            // 如果预加载遮盖层显示，停一段时间之后，使其收起并隐藏
            if (preloaderShow.value) {
                setTimeout(()=> {
                    preloader.value.style.height = 0;
                    setTimeout(()=> {
                        preloaderShow.value = false;
                    }, 200);
                }, 500);
            }
            // 为父组件添加样式，该样式是adminlte的关键样式之一
			//preloader.value.parentNode.classList.add("wrapper");
			document.body.classList.remove("hold-transition");
        });

        return {
            preloader,
            preloaderShow,
        }
    },
	template: `
      <div class="wrapper">
        <div ref="preloader" class="preloader flex-column justify-content-center align-items-center" v-if="preloaderShow">
		  <img class="animation__shake" :src="logo" alt="Logo" height="60" width="60">
	    </div>
        <slot></slot>
      </div>`
}

Vue.components = Vue.components || [];
Vue.components.push(Layout);