var PushControlSidebar = {
	methods: {
		toggle() {
			if (window.emitter) {
				window.emitter.emit('toggle-control-sidebar');
			} else {
				console.warn("missed mitt.")
			}
		}
	},
	template: `<a class="nav-link" @click.prevent="toggle" data-widget="control-sidebar" data-slide="true" href="#" role="button">
				<i class="fas fa-th-large"></i>
			</a>`
}
