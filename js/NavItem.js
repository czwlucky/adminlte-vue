var NavItem = {
	props: {
		hideInPhone: {
			type: Boolean,
			default () {
				return false;
			}
		}
	},
	template: `<li class="nav-item" :class="{'d-none d-sm-inline-block':hideInPhone}">
				<slot></slot>
			  </li>`
}
