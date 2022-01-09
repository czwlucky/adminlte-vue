const PushMenuMixinInject = {
    name: "LtePushMenu",
    props: {
    },
    setup(props, context) {
        console.log("Inject(toggleMenu)")
        const toggleMenu = Vue.inject('toggleMenu');
        return {
            toggleMenu
        }
    },
	template: `
      <a class="nav-link" @click.prevent="toggleMenu" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
    `
}

Vue.components = Vue.components || [];
Vue.components.push(PushMenuMixinInject);