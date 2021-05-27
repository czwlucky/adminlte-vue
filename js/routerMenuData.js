var menus = [{
	title: '导航菜单',
	type: 'label'
}, {
	id: 'home',
	title: 'Home',
	url: '/',
	icon: 'far fa-circle text-danger',
	type: 'menu'
}, {
	id: 'b',
	title: 'About',
	url: '/about',
	icon: 'far fa-circle text-warning',
	type: 'menu'
}, {
	id: 'c',
	title: 'Baidu',
	url: 'http://www.baidu.com',
	target: '_blank',
	icon: 'far fa-circle text-info',
	type: 'menu'
},{
	id: 1,
	title: '父菜单1',
	icon: 'far fa-user',
	children: [
		{
			id: 2,
			parentId:1,
			title: '子菜单1',
			url: '/menu1'
		},{
			id: 3,
			parentId:1,
			title: '子菜单2',
			url: '/menu2'
		}
	]
},{
	id: 4,
	title: '父菜单2',
	children: [
		{
			id: 5,
			parentId:4,
			title: '子菜单3',
			url: '/menu3'
		},{
			id: 6,
			parentId:4,
			title: '子菜单4',
			url: '/menu4'
		}
	]
}]
