const ClassicLayout = {
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
        preloaderAutoClose: Boolean,
        menuCollapse: Boolean
    },
    setup(props) {
        // 预加载遮盖层
        const preloader = Vue.ref(null);
        // 预加载遮盖层是否显示，默认不显示
        const preloaderShow = Vue.ref(props.preloaderVisible);
        const closePreloader = ()=> {
            preloader.value.style.height = 0;
            setTimeout(()=> {
                preloaderShow.value = false;
            }, 200);
        }
        // 向子组件暴漏关闭遮盖层方法
        Vue.provide("closePreloader", closePreloader);
        
        const message = Vue.ref("");
        const setPreloaderMessage = msg=> {
            message.value = msg;
        }
        // 向子组件暴漏设置消息方法
        Vue.provide("setPreloaderMessage", setPreloaderMessage);

        // PushMenu相关
        const overlay = Vue.ref(null);

        let sidebarStyle = "sidebar-mini";
        let autoCollapseSize = 992;
        let windowWidth = null;

        const toggleMenu = () => {
            if (!document.body.classList.contains("sidebar-collapse")) {
              collapseMenu();
            } else {
              openMenu();
            }
        }

        const windowed = () => {
            windowWidth = window.innerWidth || document.documentElement.clientWidth;
        }

        const collapseMenu = () => {
            document.body.classList.add(sidebarStyle)
            document.body.classList.add("sidebar-collapse");
            document.body.classList.remove("sidebar-open");
            if (windowWidth < autoCollapseSize) {
                document.body.classList.add("sidebar-closed");
            }
        }

        const openMenu = () => {
            document.body.classList.remove(sidebarStyle)
            document.body.classList.remove("sidebar-collapse");
            document.body.classList.remove("sidebar-closed");
            document.body.classList.add("sidebar-open");
        }

        console.log("provide(toggleMenu)");
        // 向子组件暴漏开合菜单栏方法
        Vue.provide('toggleMenu', toggleMenu);

        // 向子组件暴漏设置或读取当前菜单方法
        let currentMenu = null;
        const refMenu = Vue.reactive({menu:null});
        Vue.provide("getCurrentMenu", ()=>currentMenu);
        Vue.provide("setCurrentMenu", menu=> {
            currentMenu = menu;
            refMenu.menu = menu;
            //console.log("当前菜单：", menu);
        });
        Vue.provide("defaultMenu", refMenu);

        Vue.onBeforeMount(() => {
            // 阻止动画效果
            document.body.classList.add("hold-transition")

            if (!props.menuCollapse) {
                openMenu();
            } else {
                collapseMenu();
            }
        })

        // TODO: 需要深入研究Povide/Inject
        // Array类型的变量，子组件只响应一次，后面即丢失响应性，不知为何
        // 采用reactive进行包装之后，赋值时须用ref进行包装，子组件才可以保持响应性
        const menuStyle = Vue.reactive({styles:[]});
        // 向子组件暴漏菜单风格属性
        Vue.provide('menuStyle', menuStyle);
        const setMenuStyle = style=> {
            // 如果不重新赋值为响应式对象，子组件中会丢失响应性
            menuStyle.styles = Vue.ref(style);
            console.log("menustyle", menuStyle)
        }
        Vue.provide('setMenuStyle', setMenuStyle);

        Vue.onMounted(()=> {
            // 如果预加载遮盖层显示，停一段时间之后，使其收起并隐藏
            if (preloaderShow.value && props.preloaderAutoClose) {
                setTimeout(()=> {
                    closePreloader();
                }, 500);
            }
            // 为父组件添加样式，该样式是adminlte的关键样式之一
			//preloader.value.parentNode.classList.add("wrapper");
			document.body.classList.remove("hold-transition");

            // PushMenu相关
            windowed();

            if (windowWidth < autoCollapseSize) {
                collapseMenu();
            }

            document.addEventListener("click", function(event) {
              //console.log("overlay click", overlay, event)
              // 只有点击overlay层时才关闭菜单（手机上该层才会出现）
              if (event.target !== overlay.value) {
                return;
              }
              if (windowWidth < autoCollapseSize) {
                collapseMenu();
              }
            });
            window.addEventListener("resize", windowed);
        });

        return {
            preloader,
            preloaderShow,
            message,
            overlay,
        }
    },
	template: `
      <div class="wrapper">
        <div ref="preloader" class="preloader flex-column justify-content-center align-items-center" v-if="preloaderShow">
		  <img class="animation__shake" :src="logo" alt="Logo" height="60" width="60">
          <span style="position: absolute; bottom: 20px;">{{message}}</span>
	    </div>
        <slot></slot>
      </div>
      <teleport to="body"><div id="sidebar-overlay" ref="overlay"></div></teleport>
    `
}

Vue.components = Vue.components || [];
Vue.components.push(ClassicLayout);