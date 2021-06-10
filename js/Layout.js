var Layout = {
	// 必须是函数形式
	data() {
		return {
			menus: menus, // 菜单应该从外部加载
			notifications: notifications,
			messages: messages,
			preloaderShow: true,
		}
	},
	methods: {
		toggleDarkMode(e) {
			//console.log(e.target.checked)
			if (window.emitter) {
				if (e.target.checked) {
					window.emitter.emit('dark-mode');
				} else {
					window.emitter.emit('un-dark-mode');
				}
			} else {
				console.warn("missed mitt.")
			}
		},
		toggleHeaderFixed(e) {
			if (window.emitter) {
				if (e.target.checked) {
					window.emitter.emit('layout-header-fixed');
				} else {
					window.emitter.emit('un-layout-header-fixed');
				}
			} else {
				console.warn("missed mitt.")
			}
		},
		toggleFooterFixed(e) {
			if (window.emitter) {
				if (e.target.checked) {
					window.emitter.emit('layout-footer-fixed');
				} else {
					window.emitter.emit('un-layout-footer-fixed');
				}
			} else {
				console.warn("missed mitt.")
			}
		},
		toggleSidebarFixed(e) {
			if (window.emitter) {
				if (e.target.checked) {
					window.emitter.emit('layout-sidebar-fixed');
				} else {
					window.emitter.emit('un-layout-sidebar-fixed');
				}
			} else {
				console.warn("missed mitt.")
			}
		}
	},
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
		
		var that = this;
		setTimeout(()=> {
			that.$refs.preloader.style.height = 0;
			setTimeout(()=> {
				that.preloaderShow = false;
			}, 200);
		}, 500);
	},
	template: `<div ref="preloader" class="preloader flex-column justify-content-center align-items-center" v-if="preloaderShow">
			<img class="animation__shake" src="img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60">
		</div>
	    <lte-navbar class="navbar-white navbar-light main-header" style="min-height:3.5rem;">
					<lte-navbar-nav>
						<lte-nav-item>
							<lte-push-menu />
						</lte-nav-item>
					</lte-navbar-nav>
					<lte-navbar-nav :full-fill="true">
						<lte-nav-item>
							<lte-messagebox :total="messages.total" :messages="messages.list" align="right" />
						</lte-nav-item>
						<lte-nav-item>
							<lte-notification :total="notifications.total" :notifications="notifications.list" align="right" />
						</lte-nav-item>
						<lte-nav-item :hide-in-phone="true">
							<lte-full-screen />
						</lte-nav-item>
						<lte-nav-item>
							<lte-push-controlsidebar />
						</lte-nav-item>
					</lte-navbar-nav>
				</lte-navbar>
				<!-- 左侧菜单 -->
				<lte-main-sidebar>
					<lte-main-sidebar-logo url="#/" title="AdminLTE 3 + Vue3" logo="img/AdminLTELogo.png"></lte-main-sidebar-logo>
					<lte-sidebar>
						<nav class="mt-2">
							<lte-treeview :items="menus"></lte-treeview>
						</nav>
					</lte-sidebar>
				</lte-main-sidebar>
				<!-- 工作区 -->
				<lte-main-content style="padding-top:5px">
					<!-- 路由出口 -->
					<!-- 路由匹配到的组件将渲染在这里 -->
					<router-view v-slot="{ Component, route }">
						<!-- 使用任何自定义过渡和回退到 fade -->
						<transition :name="route.meta.transition || 'fade'">
							<component :is="Component" />
						</transition>
					</router-view>
				</lte-main-content>
				<!-- 系统设置区 -->
				<lte-control-sidebar>
					<div class="p-3 control-sidebar-content" style="overflow-y: auto;height: 100%;">
						<h5>Customize AdminLTE</h5>
						<hr class="mb-2">
						<div class="mb-1">
							<div class="custom-control custom-switch">
								<input type="checkbox" class="custom-control-input" id="lte-vue-darkModeSwitch" @change="toggleDarkMode">
								<label class="custom-control-label" for="lte-vue-darkModeSwitch">Dark Mode</label>
							</div>
						</div>
						<div class="mb-1">
							<div class="custom-control custom-switch">
								<input type="checkbox" class="custom-control-input" id="lte-vue-headerFixed" @change="toggleHeaderFixed">
								<label class="custom-control-label" for="lte-vue-headerFixed">Header Fixed</label>
							</div>
						</div>
						<div class="mb-1">
							<div class="custom-control custom-switch">
								<input type="checkbox" class="custom-control-input" id="lte-vue-footerFixed" @change="toggleFooterFixed">
								<label class="custom-control-label" for="lte-vue-footerFixed">Footer Fixed</label>
							</div>
						</div>
						<div class="mb-4">
							<div class="custom-control custom-switch">
								<input type="checkbox" class="custom-control-input" id="lte-vue-sidebarFixed" @change="toggleSidebarFixed">
								<label class="custom-control-label" for="lte-vue-sidebarFixed">Sidebar Fixed</label>
							</div>
						</div>
					</div>
				</lte-control-sidebar>

				<!-- 底部页脚 -->
				<lte-main-footer>
					<lte-copy-right></lte-copy-right>
					<lte-version></lte-version>
				</lte-main-footer>`
}
