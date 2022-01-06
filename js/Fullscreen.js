const Fullscreen = {
    name: "LteFullscreen",
    props: {
    },
    setup(props, context) {

        const isFullScreen = Vue.ref(false);

        const toggleFullscreen = () => {
            let main = document.body;
            if (isFullScreen.value) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (main.requestFullscreen) {
                    main.requestFullscreen();
                } else if (main.mozRequestFullScreen) {
                    main.mozRequestFullScreen();
                } else if (main.webkitRequestFullScreen) {
                    main.webkitRequestFullScreen();
                } else if (main.msRequestFullscreen) {
                    main.msRequestFullscreen();
                }
            }
        }

        Vue.onMounted(()=> {
            document.addEventListener('fullscreenchange', () => {
                isFullScreen.value = !isFullScreen.value;
            });
            document.addEventListener('mozfullscreenchange', () => {
                isFullScreen.value = !isFullScreen.value;
            });
            document.addEventListener('webkitfullscreenchange', () => {
                isFullScreen.value = !isFullScreen.value;
            });
            document.addEventListener('msfullscreenchange', () => {
                isFullScreen.value = !isFullScreen.value;
            });
        })
        
        return {
            isFullScreen,
            toggleFullscreen,
        }
    },
	template: `
      <a class="nav-link" @click.prevent="toggleFullscreen" data-widget="fullscreen" href="#" role="button">
        <i class="fas" :class="{'fa-expand-arrows-alt': !isFullScreen,'fa-compress-arrows-alt': isFullScreen}"></i>
      </a>`
}

Vue.components = Vue.components || [];
Vue.components.push(Fullscreen);