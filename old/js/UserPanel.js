var UserPanel = {
	props: {
		title: {
			type: String,
			default: function() {
				return 'Alexander Pierce'
			}
		},
		avatar: {
			type: String,
			default: function() {
				return 'img/user2-160x160.jpg'
			}
		}
	},
	template: `<div class="user-panel mt-3 pb-3 mb-3 d-flex">
		    <div class="image">
		      <img :src="avatar" class="img-circle elevation-2" alt="User Image">
		    </div>
		    <div class="info">
		      <a href="#" class="d-block">{{title}}</a>
		    </div>
		  </div>`
}
