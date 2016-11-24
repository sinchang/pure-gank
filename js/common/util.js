define(['axios'], function (axios) {
	var util = {
		APIURL: 'http://gank.io/api/',
		getEleById: function (id) {
			return document.getElementById(id);
		},
		/**
		 * 显示loading
		 */
		getLoading: function () {
			var loading = document.createElement('div');
			loading.className = 'loading';
			loading.innerHTML = '<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>';
			document.body.appendChild(loading);
		},
		/**
		 * 隐藏loading
		 */
		removeLoading: function () {
			document.body.removeChild(document.querySelector('.loading'));
		},
		/**
		 * 获取url参数
		 * @param name
		 * @param url
		 * @returns {string}
		 */
		getUrlParam: function (name, url) {
			if (!name) {
				return '';
			}
			url = url || location.search;
			name = name.replace(/(?=[\\^$*+?.():|{}])/, '\\');
			var reg = new RegExp('(?:[?&]|^)' + name + '=([^?&#]*)', 'i');
			var match = url.match(reg);
			return !match ? '' : match[1];
		},
		/**
		 * 设置url参数
		 * @param key
		 * @param value
		 */
		setUrlParam: function (key, value) {
			var s = document.location.search;
			var kvp = key + "=" + value;
			var r = new RegExp("(&|\\?)" + key + "=[^\&]*");
			s = s.replace(r, "$1" + kvp);
			if (!RegExp.$1) {
				s += (s.length > 0 ? '&' : '?') + kvp;
			}
			if (typeof(window.history.pushState) == 'function') {
				window.history.pushState(null, null, s);
			} else {
				alert('你的浏览器不支持「history.pushState」，请更换成最新的浏览器！');
			}
		},
		/**
		 * artTemplate 渲染
		 * @param containerId
		 * @param tplId
		 * @param data
		 */
		renderTpl: function (containerId, tplId, data) {
			util.getEleById(containerId).innerHTML = template(tplId, data);
		},
		/**
		 * ajax 请求
		 * @param url
		 * @param callback
		 */
		ajaxGet: function (url, callback) {
			util.getLoading();
			axios.get(url)
				.then(function (res) {
					callback(res);
					util.removeLoading();
				})
				.catch(function (error) {
					util.removeLoading();
					console.log(error);
				});
		},
		navbarToggle: (function () {
			var navbar = document.querySelector('.navbar-toggle');
			var collapse = document.querySelector('.navbar-collapse');
			navbar.onclick = function () {
				if (this.classList.contains('collapsed')) {
					collapse.classList.add('collapse');
					this.classList.remove('collapsed');
					return;
				}
				this.classList.add('collapsed');
				collapse.classList.remove('collapse');
			}
		})(),
		/**
		 * 日期返回年月日
		 * @param date
		 * @returns {string}
		 */
		formatDate: function (date) {
			date = new Date(date);
			var isDate = util.isDate(date);
			if (isDate) {
				return date.getFullYear() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getDate();
			} else {
				console.log('传入的日期不正确！');
			}
		},
		/**
		 * 增加或者减少日期根据天数
		 * @param date
		 * @param type
		 * @param days
		 * @returns {*|string}
		 */
		changeDate: function (date, type, days) {
			date = new Date(date);
			if (!util.isDate(date)) {
				console.log('传入的日期不正确！');
				return false;
			}
			if (type === 'add') {
				date = date.setDate(date.getDate() + days);
			} else if (type === 'subtract') {
				date = date.setDate(date.getDate() - days);
			}
			return util.formatDate(date);
		},
		/**
		 * 判断是否是日期格式
		 * @param date
		 * @returns {boolean}
		 */
		isDate: function (date) {
			date = new Date(date);
			return date instanceof Date && !isNaN(date.valueOf());
		}
	};

	return util;
});
