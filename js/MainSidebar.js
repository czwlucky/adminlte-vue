const MainSidebar = {
    name: "LteMainSidebar",
    props: {
      pushMenu:  Object, // elment引用
      status: {
        type: String,
        default: "opened",
        validator(value) {
          // 由于这三个状态是互斥的，所以使用同一个属性来控制
          // 这个值必须与下列字符串中的其中一个相匹配
          // opened: 展开的 collapsed: 折叠的 hidden: 隐藏的
          return ['opened', 'collapsed', 'hidden'].includes(value)
        }
      }
    },
    setup(props, context) {
      let sidebarStyle = "sidebar-mini";
      const overlay = Vue.ref(null);
      // 是否为展开状态
      let isOpen = props.status === "opened";

      // 上报折叠状态
      const reportMainSidebarStatus = Vue.inject("reportMainSidebarStatus", ()=>{});
      // 父祖组件注入的
      const isMainSidebarCollapsed = Vue.inject("isMainSidebarCollapsed", Vue.ref(false));
      // 监听来自父祖组件入注的属性变化
      Vue.watch(isMainSidebarCollapsed, (newVal, oldVal)=> {
        console.log("watch isMainSidebarCollapsed", isMainSidebarCollapsed.value, newVal, oldVal)
        // 重点：重点：重点
        // 只有状态发生实质变化时才切换状态，如果没有本地状态的维护，会无限触发上报状态/监听变化/切换状态/上报状态
        if (isOpen != newVal) toggleMenu();
      })
      
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
        if (windowWidh < autoCollapseSize || props.status === "hidden") {
            document.body.classList.add("sidebar-closed");
        }
        isOpen = false;
        reportMainSidebarStatus(false);
      }

      const openMenu = () => {
          //console.log(document.body.classList)
          document.body.classList.remove("sidebar-collapse");
          document.body.classList.add("sidebar-open");
          if (windowWidh < autoCollapseSize) {
              document.body.classList.remove("sidebar-closed");
          }
          isOpen = true;
          reportMainSidebarStatus(true);
      }

      Vue.onBeforeMount(()=> {
        if (props.status !== "hidden") {
          document.body.classList.add(sidebarStyle);
        }
        // 侧边栏与该样式冲突，需要排除该样式
        if (document.body.classList.contains("layout-top-nav")) {
          document.body.classList.remove("layout-top-nav");
        }
        windowed();
        if (windowWidh < autoCollapseSize || props.status === "collapsed" || props.status === "hidden") {
          collapseMenu();
        }
      })

      Vue.onMounted(()=> {
        document.addEventListener("click", function(event) {
          const pushmenu = props.pushMenu;
          if (pushmenu && pushmenu.contains(event.target)) {
            console.log('注入的pushmenu被点击了', pushmenu);
            toggleMenu();
            return;
          }
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

      Vue.onUnmounted(()=> {
        // 对于该组件来说，一般该方法不会被用到
        window.removeEventListener("resize", windowed);
      })
      
      return {
          overlay,
      }
    },
    template: `
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <slot></slot>
      </aside>
      <teleport to="body"><div id="sidebar-overlay" ref="overlay"></div></teleport>
    `
  }

  Vue.components = Vue.components || [];
  Vue.components.push(MainSidebar);