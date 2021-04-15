
// TODO: 需要验证在其它样式干扰下是否可以正常工作
function slideDown(el, option) {
	option = option || {};
	// 必须设置overflow="hidden"才可以读到正确的offsetHeight
	el.style.overflow = "hidden";
	// 执行动画
	animation({
		speed: option.speed || 300,
		distance: el.offsetHeight,
		before: function() {
			option.before && option.before();
		},
		action: function(value) {
			//console.log("expand action", value);
			el.style.height = value + "px";
		},
		after: function() {
			option.after && option.after();
		}
	})
}

function slideUp(el, option) {
	option = option || {};
	// 设置overflow = "hidden"，变更height时内容才可以被遮盖，
	// 否则高度虽然变了，内容依然会显示（与其它元素产生重合）
	el.style.overflow = "hidden";
	const height = el.offsetHeight;
	animation({
		speed: option.speed || 300,
		distance: height,
		before: function() {
			option.before && option.before();
		},
		action: function(value) {
			el.style.height = (height - value) + "px";
		},
		after: function() {
			option.after && option.after();
		}
	})
}

function animation(option) {
	var speed = option.speed || 0; // 动画时长
	var distance = option.distance || 0; // 运动距离
	var before = option.before || empty; // 动画开始前
	var action = option.action || empty; // 动画执行中
	var after = option.after || empty; // 动画结束后
	
	// 动画执行前执行
	before();

    // speed: 毫秒, 60:每秒执行频率
	 // 步长 = 运动距离 / (执行总时长 / 1000毫秒 * 每秒执行频率)
	var step = distance / (speed / 1000 * 60);
	var start;

	//console.log("step", step);
	if (step == 0) return;

	var w = window || {};
	if (!w.requestAnimationFrame) {
		w.requestAnimationFrame = w.webkitRequestAnimationFrame ||
			w.mozRequestAnimationFrame ||
			w.msRequestAnimationFrame ||
			w.oRequestAnimationFrame ||
			(function(cb) {
				setTimeout(cb, 16)
			});
	}

	function empty() {}

	function doAction(timestamp) {
		if (start === undefined) {
			start = 0;
		}
		// 执行动画
		action(Math.min(start, distance));

		// 判断是否停止动画
		if (start <= distance) {
			//console.log("animation executing", start)
			w.requestAnimationFrame(doAction);
		} else {
			//console.log("animation execute after", start)
			// 动画结束后执行
			after();
		}

		// 增加步长
		start += step;
	}

	w.requestAnimationFrame(doAction);
}