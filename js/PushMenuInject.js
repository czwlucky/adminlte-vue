const PushMenuInject = {
    name: "LtePushMenu",
    setup(props, context) {
        // 引入外部可复用组件 toggleMenu
        return {
            toggleMenu: toggleMenu.toggle()
        }
    },
	template: `
      <a class="nav-link" @click.prevent="toggleMenu" data-widget="pushmenu" href="#" role="button">
        <slot><i class="fas fa-bars"></i></slot>
      </a>
    `
}

Vue.components = Vue.components || [];
Vue.components.push(PushMenuInject);