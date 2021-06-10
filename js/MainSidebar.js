var MainSidebar = {
	data() {
		return {
			autoCollapseSize: 992
		}
	},
	methods: {
		toggle() {console.log("main sidebar toggle")
			if (!document.body.classList.contains("sidebar-collapse")) {
				this.collapse()
			} else {
				this.open();
			}
		},
		collapse() {
			//console.log("..............")
			document.body.classList.add("sidebar-collapse");
			//document.body.classList.add("sidebar-is-opening");
			document.body.classList.remove("sidebar-open");
			if (this.windowWidh < this.autoCollapseSize) {
				document.body.classList.add("sidebar-closed");
			}
		},
		open() {
			//console.log(document.body.classList)
			document.body.classList.remove("sidebar-collapse");
			document.body.classList.add("sidebar-open");
			if (this.windowWidh < this.autoCollapseSize) {
				document.body.classList.remove("sidebar-closed");
			}
		},
		windowed() {
			this.windowWidh = window.innerWidth || document.documentElement.clientWidth;
		}
	},
	mounted() {
		if (window.emitter) {
			//console.log("on toggle-menu", window.emitter.all, window.emitter.all.get('toggle-menu'));
			window.emitter.on('toggle-menu', this.toggle);
		}
		this.windowed();
		if (this.windowWidh < this.autoCollapseSize) {
			this.collapse();
		}
		var that = this;
		document.addEventListener("click", function(event) {
			// 只有点击overlay层时才关闭菜单（手机上该层才会出现）
			if (event.target !== that.$refs.overlay) {
				return;
			}
			if (that.windowWidh < that.autoCollapseSize) {
				that.collapse();
			}
		});
		window.addEventListener("resize", this.windowed)
	},
	unmounted() {
		window.emitter.off('toggle-menu', this.toggle);
	},
	template: `<aside class="main-sidebar sidebar-dark-primary elevation-4">
			<slot><p style="color:white;">MainSideBar</p></slot>
		</aside>
		<teleport to="body"><div id="sidebar-overlay" ref="overlay"></div></teleport>
		`
}
