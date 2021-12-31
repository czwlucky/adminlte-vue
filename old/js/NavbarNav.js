var NavbarNav = {
	props: {
		fullFill: {
			type: Boolean
		}
	},
	template: `<ul class="navbar-nav" :class="{'ml-auto': fullFill}">
			  <slot></slot>
			</ul>`
}