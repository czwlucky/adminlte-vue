/**
 * 该组件可展示无限级菜单
 * menu.title > menu.label > menu.name，优先展示名称顺序
 * menu.type，如果type=='label'，只做为标签进行显示，其它值视为菜单
 * menu对象的isNew属性，可展示NEW标签
 * menu对象的messageCount属性，可展示数字标签
 * {
        title:String, label:String, name:String,
        icon:String,
        url:String, path:String,
        type:String,
	      target:String,
        id:String|Number,
        parentId:String|Number,
        isNew: Boolean,
        messageCount: Number
  }
 */
const MenuItem = {
  name: "LteTreeMenuItem",
  props: {
      menu: Object,
      router: Object,
  },
  setup(props, context) {
    const selectMenu = Vue.inject("selectMenu");
    const menuItemRoot = Vue.ref(null);
    const subMenus = Vue.ref(null);

    const router = props.router;
    //console.log("menuitem router", router)

    const clickHandler = event => {
      let menu = props.menu;
      // 如果是外链，不改变菜单选中状态，直接返回，触发默认行为
      if (menu.url && menu.url.indexOf("http") === 0) {
        return;
      }
      
      // 如果有路由时，阻止默认行为
      router && event.preventDefault();

      // 没有子菜单，直接触发菜单回调
      if (!menu.children || menu.children.length == 0) {
        router && (menu.url || menu.path) && router.push(menu.url || menu.path);
        selectMenu(menu);
        return;
      }

      // 没有路由时阻止默认行为
      !router && event.preventDefault();

      // 展开或关闭子菜单
      let subMenuEl = subMenus.value;
      if (!menu._opened_) {
        // 必须先设置该样式，才可以以动画形式展开，否则动画脚本将得不到子菜单的实际高度，无法展开动画
        menuItemRoot.value.classList.add("menu-open");
        slideDown(subMenuEl, {
          after: anmiationDone,
          speed: 300 /*为了演示动画速度*/
        });
      } else {
        //console.log("selectMenu close", subMenuEl)
        slideUp(subMenuEl, {
          after: anmiationDone,
          speed: 300
        })
      }
      // 动画结束之后，触发菜单回调
      function anmiationDone() {
        subMenuEl.style.overflow = "";
        subMenuEl.style.height = "";
        selectMenu(menu);
      }
    }

    return {
      menuItemRoot,
      subMenus,
      clickHandler,
      router,
    }
  },
  template: `
    <li ref="menuItemRoot" :class="{
      'nav-item': menu.type != 'label',
      'nav-header': menu.type == 'label',
      'menu-open': menu._opened_ && menu.children != null && menu.children.length > 0
       }">
      <template v-if="menu.type == 'label'">{{menu.title}}</template>
      <a class="nav-link"
        :href="menu.url||menu.path||'#'"
        :target="menu.target"
        :class="{'active':menu._active_ }"
        v-if="menu.type!='label'"
        @click="clickHandler">
        <i class="nav-icon" :class="menu.icon || 'far fa-circle'"></i>
        <p>
        {{menu.title || menu.label || menu.name}}
        <i class="right fas fa-angle-left" v-if="menu.children != null && menu.children.length > 0"></i>
				<span class="right badge badge-danger" v-if="menu.isNew && !menu.messageCount">New</span>
				<span class="badge badge-info right" v-if="menu.messageCount > 0">{{menu.messageCount}}</span>
        </p>
      </a>
      <ul class="nav nav-treeview" ref="subMenus" v-if="menu.type!='label' && menu.children != null && menu.children.length > 0">
        <lte-tree-menu-item v-for="child of menu.children" :menu="child" :router="router"></lte-tree-menu-item>
      </ul>
    </li>
  `
}

// 树型菜单主类
const TreeMenu = {
    name: "LteTreeMenu",
    emits: ['menuChange'],
    props: {
        menus: Array,
        defaultMenuId: Number|String,
        defaultMenuUrl: String,
        router: Object
    },
    setup(props, context) {
      //console.log("menu router", props.router)
      // 包装成响应式对象，更新时，子组件才会发生变动
      const list = Vue.reactive(props.menus);

      const menuStyle = Vue.inject('menuStyle');
      console.log("inject menuStyle", menuStyle)

      const defaultMenu = Vue.inject('defaultMenu');

      const setCurrentMenu = Vue.inject("setCurrentMenu");

      const selectMenu = menu=> {
        // 如果有子菜单，表示要执行菜单的开合
        if (menu.children && menu.children.length) {
          menu._opened_ = !menu._opened_;
          return;
        }
        // 当前菜单如果是选中状态，不做处理
        // 否则重新判断选中状态
        if (menu._active_) {
          return
        }

        // 上报当前选中的菜单，任何兄弟组件及其子孙组件都可以随时获取当前选中的菜单
        setCurrentMenu(menu);
        // 产生事件，捕获该事件可以获得当前选中的菜单
        context.emit("menuChange", menu);
        
        // 重置选中状态
        list.forEach( item=> {
          item._active_ = isActive(item);
        })
        function isActive(item) {
          if (item.children && item.children.length) {
            let ret = false;
            for (const child of item.children) {
              // 只要子孙有一个是被选中的，当前节点就是选中的
              child._active_ = isActive(child);
              if (child._active_) {
                ret = true;
              }
            }
            return ret;
          }

          return item == menu; //(item.id && item.id == menu.id) || (item.url && item.url == menu.url) || (item.path && item.path == menu.path) || (item.title && item.title == menu.title) || (item.label && item.label == menu.label) || (item.name && item.name == menu.name);
        }
      }
      // 向子组件暴漏选中菜单方法
      Vue.provide("selectMenu", selectMenu);
      
      // 默认菜单
      let id = props.defaultMenuId;
      let url = props.defaultMenuUrl;
      if (id || url) {
        for (const menu of list) {
          if ((id && menu.id == id) || (url && (menu.url == url || menu.path == url))) {
            selectMenu(menu);
          } else if (menu.children && menu.children.length > 0) {
            let m = findDefaultMenu({id: id, url: url}, menu.children);
            if (m) {
              menu._opened_ = true;
              selectMenu(m);
            }
          }
        }
      }

      // 监听默认菜单变化，选中新指定的菜单
      Vue.watch(
        () => props.defaultMenuUrl,
        (newVal, oldVal) => {
          //console.log("默认菜单URL发生变化", newVal, oldVal);
          let menu = findDefaultMenu({url: newVal}, list);
          if (menu) {
            selectMenu(menu);
          }
        }
      )
      Vue.watch(
        () => props.defaultMenuId,
        (newVal, oldVal) => {
          //console.log("默认菜单ID发生变化", newVal, oldVal);
          let menu = findDefaultMenu({id: newVal}, list);
          if (menu) {
            selectMenu(menu);
          }
        }
      )

      function findDefaultMenu(defaultMenu, menus) {
        for (const menu of menus) {
          let {id, url} = defaultMenu;
          if ((id && menu.id == id) || (url && (menu.url == url || menu.path == url))) {
            return menu;
          }
          if (menu.children && menu.children.length > 0) {
            let m = findDefaultMenu(defaultMenu, menu.children);
            if (m) {
              menu._opened_ = true;
              return m;
            }
          }
        }
        return null;
      }

      return {
        list,
        menuStyle,
      }
    },
    template: `
      <ul class="nav nav-pills nav-sidebar flex-column" :class="menuStyle.styles" data-widget="treeview" role="menu" data-accordion="false" style="overflow-x:hidden;">
        <lte-tree-menu-item v-for="menu of list" :menu="menu" :router="router"></lte-tree-menu-item>
      </ul>
    `
}

Vue.components = Vue.components || [];
Vue.components.push(TreeMenu);
// TODO: 本想使该组件只注册在TreeMenu组件内，但是自引用时有问题
Vue.components.push(MenuItem);