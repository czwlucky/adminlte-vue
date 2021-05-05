var MessageBox = {
	props: {
		total: {
			type: Number,
			default () {
				return 0
			}
		},
		messages: Array,
		align: String,
		iconSize: String | Number,
		type: {
			type: String,
			default () {
				return "danger"
			}
		}
	},
	data() {
		return {
			isShow: false
		}
	},
	computed: {
		badgeStyle() {
			return "bg-" + this.type;
		}
	},
	methods: {
		toggle() {
			if (this.isShow) {
				this.collapse();
			} else {
				this.open();
			}
		},
		collapse() {
			this.isShow = false;
			this.$el.parentNode.classList.remove("show");
		},
		open() {
			this.isShow = true;
			this.$el.parentNode.classList.add("show");
		},
		getIconClass(style) {
			return "text-" + style;
		},
		iconShow(icon) {
			return !!icon;
		}
	},
	mounted() {
		var that = this;
		this.$el.parentNode.classList.add("dropdown");
		document.addEventListener("click", function(event) {
			if (event.target.parentNode !== that.$refs.btn) {
				that.collapse();
			}
		});
	},
	template: `
        <a class="nav-link" ref="btn" data-toggle="dropdown" href="#" aria-expanded="true" @click.prevent="toggle">
          <i class="far fa-comments" :style="{fontSize:iconSize}"></i>
          <span class="badge navbar-badge" :class="badgeStyle" v-if="total>0">{{total > 99 ? '99+': total}}</span>
        </a>
        <div :class="{show:isShow,'dropdown-menu-right':align=='right','dropdown-menu-left':align=='left'}" class="dropdown-menu dropdown-menu-lg">
		  <template v-for="item of messages">
		  <a href="#" @click.prevent class="dropdown-item" style="text-decoration: none;">
			<div class="media">
			<img :src="item.avatar" alt="User Avatar" class="img-size-50 mr-3 img-circle">
			<div class="media-body">
			  <h3 class="dropdown-item-title">
				{{item.name}}
				<span class="float-right text-sm" v-if="iconShow(item.icon)" :class="getIconClass(item.iconStyle)"><i :class="item.icon"></i></span>
			  </h3>
			  <p class="text-sm">{{item.message}}</p>
			  <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> {{item.time}}</p>
			</div>
			</div>
		  </a>
          <div class="dropdown-divider"></div>
		  </template>
          <a href="#" @click.prevent="" class="dropdown-item dropdown-footer" style="text-decoration: none;">See All Messages</a>
        </div>`
}
