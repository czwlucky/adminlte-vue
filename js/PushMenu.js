const PushMenu = {
    name: "LtePushMenu",
    props: {
    },
    setup(props, context) {

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

        Vue.onMounted(()=> {
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
        })
        
        return {
            overlay,
            toggleMenu,
        }
    },
	template: `
      <a class="nav-link" @click.prevent="toggleMenu" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      <!-- 遮盖层 -->
      <teleport to="body"><div id="sidebar-overlay" ref="overlay"></div></teleport>`
}

Vue.components = Vue.components || [];
Vue.components.push(PushMenu);