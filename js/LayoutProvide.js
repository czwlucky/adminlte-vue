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
        menuClose: Boolean
    },
    setup(props) {
        // 预加载遮盖层
        const preloader = Vue.ref(null);
        // 预加载遮盖层是否显示，默认不显示
        const preloaderShow = Vue.ref(props.preloaderVisible);

        if (!props.menuClose) {
            document.body.classList.add("sidebar-open");
        } else {
            document.body.classList.add("sidebar-collapse");
            document.body.classList.add("sidebar-closed");
        }

        // PushMenu相关
        const overlay = Vue.ref(null);

        let autoCollapseSize = 992;
        let windowWidh = null;

        const toggleMenu = () => {
            if (!document.body.classList.contains("sidebar-collapse")) {
              collapseMenu();
            } else {
              openMenu();
            }
        }

        const windowed = () => {
            windowWidh = window.innerWidth || document.documentElement.clientWidth;
        }

        const collapseMenu = () => {
            document.body.classList.add("sidebar-collapse");
            //document.body.classList.add("sidebar-is-opening");
            document.body.classList.remove("sidebar-open");
            if (windowWidh < autoCollapseSize) {
                document.body.classList.add("sidebar-closed");
            }
        }

        const openMenu = () => {
            //console.log(document.body.classList)
            document.body.classList.remove("sidebar-collapse");
            document.body.classList.add("sidebar-open");
            if (windowWidh < autoCollapseSize) {
                document.body.classList.remove("sidebar-closed");
            }
        }

        console.log("provide(toggleMenu)")
        Vue.provide('toggleMenu', toggleMenu);

        Vue.onBeforeMount(() => {
            // 阻止动画效果
            document.body.classList.add("hold-transition")
            // 最小化sidebar
            document.body.classList.add("sidebar-mini")
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

            // PushMenu相关
            windowed();

            if (windowWidh < autoCollapseSize) {
                collapseMenu();
            }

            document.addEventListener("click", function(event) {
              //console.log("overlay click", overlay, event)
              // 只有点击overlay层时才关闭菜单（手机上该层才会出现）
              if (event.target !== overlay.value) {
                return;
              }
              if (windowWidh < autoCollapseSize) {
                collapseMenu();
              }
            });
            window.addEventListener("resize", windowed);
        });

        return {
            preloader,
            preloaderShow,
            overlay,
        }
    },
	template: `
      <div class="wrapper">
        <div ref="preloader" class="preloader flex-column justify-content-center align-items-center" v-if="preloaderShow">
		  <img class="animation__shake" :src="logo" alt="Logo" height="60" width="60">
	    </div>
        <slot></slot>
      </div>
      <teleport to="body"><div id="sidebar-overlay" ref="overlay"></div></teleport>
    `
}

Vue.components = Vue.components || [];
Vue.components.push(ClassicLayout);