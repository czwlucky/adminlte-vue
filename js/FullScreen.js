// TODO: 通过ESC键退出全屏时，图标不能触发改变
var FullScreent = {
	data() {
		return {
			maximized: false
		}
	},
	methods: {
		toggle() {
			if (document.fullscreenElement ||
				document.mozFullScreenElement ||
				document.webkitFullscreenElement ||
				document.msFullscreenElement) {
				this.windowed()
			} else {
				this.fullscreen()
			}
		},
		fullscreen() {
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen()
			} else if (document.documentElement.webkitRequestFullscreen) {
				document.documentElement.webkitRequestFullscreen()
			} else if (document.documentElement.msRequestFullscreen) {
				document.documentElement.msRequestFullscreen()
			}

			//this.maximized = true;
		},
		windowed() {
			if (document.exitFullscreen) {
				document.exitFullscreen()
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen()
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen()
			}

			//this.maximized = false;
		}
	},
	mounted() {
		var that = this;
		window.addEventListener("resize", function() {
			//console.log("status", document.fullscreenElement)
			that.maximized = !!(document.fullscreenElement ||
				document.mozFullScreenElement ||
				document.webkitFullscreenElement ||
				document.msFullscreenElement);
			//console.log(that.maximized)
		})
		
	},
	template: `<a class="nav-link" @click.prevent="toggle" data-widget="fullscreen" href="#" role="button"><i :class="{'fa-expand-arrows-alt': !maximized,'fa-compress-arrows-alt': maximized}" class="fas"></i></a>`
}
