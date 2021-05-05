var Layout = {
	beforeCreate() {
		// 阻止动画效果
		document.body.classList.add("hold-transition");
		// 最小化sidebar
		document.body.classList.add("sidebar-mini");
	},
	mounted() {
		this.$el.parentNode.classList.add("wrapper");
		document.body.classList.remove("hold-transition");
		
		if (window.emitter) {
			window.emitter.on('dark-mode', () => {
				if (!document.body.classList.contains("dark-mode")) {
					document.body.classList.add("dark-mode");
				}
			});
			window.emitter.on('un-dark-mode', () => {
				if (document.body.classList.contains("dark-mode")) {
					document.body.classList.remove("dark-mode");
				}
			});
			window.emitter.on('layout-header-fixed', () => {
				if (!document.body.classList.contains("layout-navbar-fixed")) {
					document.body.classList.add("layout-navbar-fixed");
				}
			});
			window.emitter.on('un-layout-header-fixed', () => {
				if (document.body.classList.contains("layout-navbar-fixed")) {
					document.body.classList.remove("layout-navbar-fixed");
				}
			});
			window.emitter.on('layout-footer-fixed', () => {
				if (!document.body.classList.contains("layout-footer-fixed")) {
					document.body.classList.add("layout-footer-fixed");
				}
			});
			window.emitter.on('un-layout-footer-fixed', () => {
				if (document.body.classList.contains("layout-footer-fixed")) {
					document.body.classList.remove("layout-footer-fixed");
				}
			});
			window.emitter.on('layout-sidebar-fixed', () => {
				if (!document.body.classList.contains("layout-fixed")) {
					document.body.classList.add("layout-fixed");
				}
			});
			window.emitter.on('un-layout-sidebar-fixed', () => {
				if (document.body.classList.contains("layout-fixed")) {
					document.body.classList.remove("layout-fixed");
				}
			});
		}
	},
	template: "<slot></slot>"
}
