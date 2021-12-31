
var Logo = {
		props: {
			logo: {
				type: String,
				// 提供默认值
				default: function() {
					return "img/AdminLTELogo.png"
				}
			},
			title: {
				type: String,
				default: function() {
					return "AdminLTE 3"
				},
				// 验证提供的值是否合法，这里判断是否为空
				// 不提供值时，使用的是默认值，如果提供的是空值，进行警告
				validator: function(value) {
					return !!value;
				}
			},
			// 如果点击logo希望跳转页面，可在父组件中指定url
			url: String
		},
		template: `<a :href="url" class="brand-link">
		  <img :src="logo" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
		  <span class="brand-text font-weight-light">{{title}}</span>
		</a>`
	}