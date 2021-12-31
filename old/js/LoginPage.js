const LoginPage = {
	methods: {
		login() {
			window.emitter.emit('logined');
			//setTimeout(() => {
				this.$router.push("/");
			//},2000)
		}
	},
	template: `<div class="login-page">
	    <div class="login-box">
	      <!-- /.login-logo -->
	      <div class="card card-outline card-primary">
	        <div class="card-header text-center">
	          <a href="#" class="h1"><b>Admin</b>LTE</a>
	        </div>
	        <div class="card-body">
	          <form method="post">
	            <div class="input-group mb-3">
	              <input type="text" class="form-control" placeholder="用户名">
	              <div class="input-group-append">
	                <div class="input-group-text">
	                  <span class="fas fa-user"></span>
	                </div>
	              </div>
	            </div>
	            <div class="input-group mb-3">
	              <input type="password" class="form-control" placeholder="密码">
	              <div class="input-group-append">
	                <div class="input-group-text">
	                  <span class="fas fa-lock"></span>
	                </div>
	              </div>
	            </div>
	            <div class="row">
	              <div class="col-8">
					<div class="custom-control custom-switch">
						<input type="checkbox" class="custom-control-input" id="remember">
						<label class="custom-control-label" for="remember">记住用户名</label>
					</div>
	              </div>
	              <!-- /.col -->
	              <div class="col-4">
	                <button type="button" class="btn btn-primary btn-block" @click="login">登录</button>
	              </div>
	              <!-- /.col -->
	            </div>
	          </form>
	        </div>
	        <!-- /.card-body -->
	      </div>
	      <!-- /.card -->
	    </div>
	</div>`
}
