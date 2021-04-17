var PushControlSidebar = {
	methods: {
		toggleControlSidebar() {
			let elems = document.getElementsByClassName("control-sidebar");
			//console.log(elems);
			if (!document.body.classList.contains("control-sidebar-slide-open")) {
				// 隐藏横向滚动条
				document.documentElement.classList.add("control-sidebar-animate");
				for (let el of elems) {
					el.style.display = 'block';
				}
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
					for (let el of elems) {
						el.style.display = 'none';
					}
					document.documentElement.classList.remove("control-sidebar-animate");
				}, 350)
			}
		}
	},
	template: `<a class="nav-link" @click.prevent="toggleControlSidebar" data-widget="control-sidebar" data-slide="true" href="#" role="button">
					  <i class="fas fa-th-large"></i>
					</a>`
}
