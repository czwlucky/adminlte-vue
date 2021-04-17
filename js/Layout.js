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
	},
	template: "<slot></slot>"
}
