var menus = [{
	id: 1,
	title: 'Dashboard',
	url: '',
	target: 'xxx',
	icon: 'fas fa-tachometer-alt',
	type: 'menu', // label
	//isNew: true,
	//messageCount: 15, // 优先级高于isNew，当该值不为空也不为0时，忽略isNew
	children: [{
		id: 2,
		parentId: 1,
		title: 'Dashboard v1',
		url: '#',
		target: 'xxx',
		icon: 'far fa-circle',
		type: 'menu'
	}, {
		id: 3,
		parentId: 1,
		title: 'Dashboard v2',
		url: '#',
		target: 'xxx',
		icon: 'far fa-circle',
		type: 'menu'
	}, {
		id: 4,
		parentId: 1,
		title: 'Dashboard v3',
		url: '#',
		target: 'xxx',
		icon: 'far fa-circle',
		type: 'menu'
	}]
}, {
	id: 5,
	title: 'Widgets',
	url: 'https://adminlte.io/',
	target: '_blank',
	icon: 'fas fa-th',
	type: 'menu',
	isNew: true
}, {
	id: 6,
	title: 'Layout Options',
	url: '#',
	target: '_blank',
	icon: 'fas fa-copy',
	type: 'menu',
	messageCount: 6,
	children: [{
		id: 7,
		parentId: 6,
		title: 'Top Navigation',
		url: '#',
		target: 'xxx',
		icon: 'far fa-circle',
		type: 'menu'
	}, {
		id: 8,
		parentId: 6,
		title: 'Top Navigation + Sidebar',
		url: '#',
		target: 'xxx',
		icon: 'far fa-circle',
		type: 'menu'
	}, {
		id: 9,
		parentId: 6,
		title: 'Fixed Sidebar',
		url: '#',
		target: 'xxx',
		icon: 'far fa-circle',
		type: 'menu'
	}]
}, {
	title: "EXAMPLES",
	type: "label"
}, {
	id: 10,
	title: 'Calendar',
	url: '#',
	//target: '_blank',
	icon: 'far fa-calendar-alt',
	type: 'menu'
}, {
	id: 11,
	title: 'Gallery',
	url: '#',
	//target: '_blank',
	icon: 'far fa-image',
	type: 'menu'
}, {
	title: 'LABELS',
	type: 'label'
}, {
	id: 'a',
	title: 'Important',
	url: '#',
	//target: '_blank',
	icon: 'far fa-circle text-danger',
	type: 'menu'
}, {
	id: 'b',
	title: 'Warning',
	url: '#',
	//target: '_blank',
	icon: 'far fa-circle text-warning',
	type: 'menu'
}, {
	id: 'c',
	title: 'Informational',
	url: '#',
	//target: '_blank',
	icon: 'far fa-circle text-info',
	type: 'menu'
}]
