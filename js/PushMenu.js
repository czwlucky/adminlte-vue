
var PushMenu = {
		data() {
			return {
				// 该值应该是个常量，暂时放在这里
				autoCollapseSize: 992,
				windowWidh: 1028
			}
		},
		methods: {
			toggleMenu() {
				//console.log("has sidebar-collapse?",document.body.classList.contains("sidebar-collapse"));
				//console.log(document.body.classList);
				//console.log(window.emitter)
				if (window.emitter) {
					window.emitter.emit('toggle-menu');
				} else {
					console.warn("missed mitt.")
				}
			}
		},
		template: `<a class="nav-link" @click.prevent="toggleMenu" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>`
	}