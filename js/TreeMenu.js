const MenuItem = {
  name: "LteTreeMenuItem",
  props: {
      menu: {
        title:String,
        label:String,
        name:String,
        icon:String
      },
      opened: Boolean
  },
  setup(props, context) {
    
  },
  template: `
    <li class="nav-item" :class="{
      'menu-open': menu.opened,
      'nav-item': menu.type != 'label',
      'nav-header': menu.type == 'label'
       }">
      <template v-if="menu.type == 'label'">{{menu.title}}</template>
      <a href="#" class="nav-link" :class="menu.isActive ? 'active':''" v-if="menu.type!='label'">
        <i class="nav-icon" :class="menu.icon"></i>
        <p>
        {{menu.title || menu.label || menu.name}}
        <i class="right fas fa-angle-left" v-if="menu.children != null && menu.children.length > 0"></i>
				<span class="right badge badge-danger" v-if="menu.isNew && !menu.messageCount">New</span>
				<span class="badge badge-info right" v-if="menu.messageCount > 0">{{menu.messageCount}}</span>
        </p>
      </a>
      <ul class="nav nav-treeview" v-if="menu.type!='label' && menu.children != null && menu.children.length > 0">
        <lte-tree-menu-item v-for="child of menu.children" :menu="child"></lte-tree-menu-item>
      </ul>
    </li>
  `
}

// 树型菜单主类
const TreeMenu = {
    name: "LteTreeMenu",
    props: {
        menus: Array,
    },
    setup() {
      const menuStyle = Vue.inject('menuStyle');
      console.log("inject menuStyle", menuStyle)

      return {
        menuStyle,
      }
    },
    template: `
      <ul class="nav nav-pills nav-sidebar flex-column" :class="menuStyle.styles" data-widget="treeview" role="menu" data-accordion="false" style="overflow-x:hidden;">
        <lte-tree-menu-item v-for="menu of menus" :menu="menu"></lte-tree-menu-item>
      </ul>
    `
}

Vue.components = Vue.components || [];
Vue.components.push(TreeMenu);
// TODO: 本想使该组件只注册在TreeMenu组件内，但是自引用时有问题
Vue.components.push(MenuItem);