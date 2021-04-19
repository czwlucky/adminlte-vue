var Notification = {
	props: {
		total: {
			type: Number,
			default () {
				return 0
			}
		},
		notifications: Array,
		align: String,
		iconSize: String|Number,
		type: {
			type: String,
			default() {
				return "warning"
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
		}
	},
	mounted() {
		var that = this;
		this.$el.parentNode.classList.add("dropdown");
		document.addEventListener("click", function(event) {
			// $el 是占位 DOM 节点，Vue 使用它来跟踪组件在 DOM 中的位置。建议使用模板引用来直接访问 DOM 元素，而不是依赖于 $el
			// https://v3.cn.vuejs.org/guide/component-template-refs.html
			// 当点对象是自身（事件源）时不做操作，否则关闭通知
			// 不要依赖.stop特性，阻止事件传波可能会有副作用，比如点击本组件时
			// 其它组件要做动作，阻止事件传波就会导致其它组件得不到响应
			if (event.target.parentNode !== that.$refs.btn) {
				that.collapse();
			}
		});
	},
	template: `
        <a class="nav-link" ref="btn" data-toggle="dropdown" href="#" aria-expanded="true" @click.prevent="toggle">
          <i class="far fa-bell" :style="{fontSize:iconSize}"></i>
          <span class="badge navbar-badge" :class="badgeStyle" v-if="total>0">{{total > 99 ? '99+': total}}</span>
        </a>
        <div :class="{show:isShow,'dropdown-menu-right':align=='right','dropdown-menu-left':align=='left'}" class="dropdown-menu dropdown-menu-lg">
          <span class="dropdown-item dropdown-header">{{total}} Notifications</span>
          <div class="dropdown-divider"></div>
		  <template v-for="item of notifications">
          <a href="#" @click.prevent="" class="dropdown-item" style="text-decoration: none;">
            <i :class="item.icon" class="mr-2"></i> {{item.content}}
            <span class="float-right text-muted text-sm">{{item.time}}</span>
          </a>
          <div class="dropdown-divider"></div>
		  </template>
          <a href="#" @click.prevent="" class="dropdown-item dropdown-footer" style="text-decoration: none;">See All Notifications</a>
        </div>`
}
