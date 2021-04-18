var ControlSidebar = {
	data() {
		return {
			display: 'none'
		}
	},
	methods: {
		toggle() {
			if (!document.body.classList.contains("control-sidebar-slide-open")) {
				// 隐藏横向滚动条
				document.documentElement.classList.add("control-sidebar-animate");
				this.display = 'block';

				setTimeout(function() {
					document.body.classList.add("control-sidebar-slide-open");
					setTimeout(function() {
						document.documentElement.classList.remove("control-sidebar-animate");
					}, 350)
				}, 10)
			} else {
				// 隐藏横向滚动条
				document.documentElement.classList.add("control-sidebar-animate");
				document.body.classList.remove("control-sidebar-slide-open");
				var that = this;
				setTimeout(function() {
					that.display = 'none';
					document.documentElement.classList.remove("control-sidebar-animate");
				}, 350)
			}
		}
	},
	mounted() {
		if (window.emitter) {
			window.emitter.on('toggle-control-sidebar', () => {
				this.toggle();
			});
		}
	},
	template: `<aside class="control-sidebar control-sidebar-dark" :style="{display:display}">
			<slot>
			<div class="p-3">
			  <h5>Title</h5><p>Sidebar content</p>
			</div>
			</slot>
		  </aside>`
}
