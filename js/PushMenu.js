
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
		created() {
			this.windowed();
			if (this.windowWidh < this.autoCollapseSize) {
				this.collapse();
			}
			var that = this;
			document.addEventListener("click", function() {
				if (that.windowWidh < that.autoCollapseSize) {
					that.collapse();
				}
			});
			window.addEventListener("resize", this.windowed)
		},
		template: `<a class="nav-link" @click.prevent.stop="toggleMenu" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>`
	}