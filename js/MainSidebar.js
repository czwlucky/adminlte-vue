var MainSidebar = {
	methods: {
		toggle() {
			if (!document.body.classList.contains("sidebar-collapse")) {
				this.collapse()
			} else {
				this.open();
			}
		},
		collapse() {
			document.body.classList.add("sidebar-collapse");
			//document.body.classList.add("sidebar-is-opening");
			if (this.windowWidh < this.autoCollapseSize) {
				document.body.classList.add("sidebar-closed");
				document.body.classList.remove("sidebar-open");
			}
		},
		open() {
			document.body.classList.remove("sidebar-collapse");
			if (this.windowWidh < this.autoCollapseSize) {
				document.body.classList.add("sidebar-open");
				document.body.classList.remove("sidebar-closed");
			}
		},
		windowed() {
			this.windowWidh = window.innerWidth || document.documentElement.clientWidth;
		}
	},
	mounted() {
		if (window.emitter) {
			window.emitter.on('toggle-menu', () => {
				this.toggle();
			});
		}
		this.windowed();
		if (this.windowWidh < this.autoCollapseSize) {
			this.collapse();
		}
		var that = this;
		document.addEventListener("click", function(event) {
			if (that.windowWidh < that.autoCollapseSize) {
				that.collapse();
			}
		});
		window.addEventListener("resize", this.windowed)
	},
	template: `<aside class="main-sidebar sidebar-dark-primary elevation-4">
			<slot><p style="color:white;">MainSideBar</p></slot>
		</aside>`,
}
