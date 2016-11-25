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
		},
		/**
		 * 提交干货
		 * @constructor
		 */
		Newpost: function () {
			this.open = false;
			this.bindEvent();
		},
		/**
		 * 检验字符串是否是网址
		 * @param url
		 */
		checkUrl: function (url) {
			var regexp = new RegExp("(http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?", "gi");
			return regexp.test(url);
		}
	};

	util.Newpost.prototype = {
		render: function () {
			var tpl = '<div class="modal-dialog modal-lg"> ' +
				'<form class="modal-content"> ' +
				'<div class="modal-header"> ' +
				'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> ' +
				'<h4 class="modal-title">提交干货</h4> ' +
				'</div> ' +
				'<div class="modal-body"> ' +
				'<div class="form-horizontal"> ' +
				'<fieldset> ' +
				'<div class="form-group"> ' +
				'<label for="url" class="col-lg-2 control-label">网页地址：</label> ' +
				'<div class="col-lg-10"> ' +
				'<input type="url" class="form-control" id="url" placeholder="请输入想要提交的网页地址" autocomplete="off"> ' +
				'</div> ' +
				'</div> ' +
				'<div class="form-group"> ' +
				'<label for="desc" class="col-lg-2 control-label">内容描述：</label> ' +
				'<div class="col-lg-10"> ' +
				'<textarea class="form-control" rows="3" id="desc"></textarea> ' +
				'</div> ' +
				'</div> ' +
				'<div class="form-group"> ' +
				'<label for="username" class="col-lg-2 control-label">您的网络ID：</label> ' +
				'<div class="col-lg-10"> ' +
				'<input type="text" class="form-control" id="username" placeholder="请输入您的网络ID" autocomplete="off"> ' +
				'</div> ' +
				'</div> ' +
				'<div class="form-group"> ' +
				'<label class="col-lg-2 control-label">干货类型</label> ' +
				'<div class="col-lg-10"> ' +
				'<select class="form-control" id="select"> ' +
				'<option value="Android">Android</option> ' +
				'<option value="iOS">iOS</option> ' +
				'<option value="休息视频">休息视频</option> ' +
				'<option value="福利">福利</option> ' +
				'<option value="拓展资源">拓展资源</option> ' +
				'<option value="前端">前端</option> ' +
				'<option value="瞎推荐">瞎推荐</option> ' +
				'<option value="App">App</option> ' +
				'</select> </div> ' +
				'</div> ' +
				'</fieldset> </div> ' +
				'</div> ' +
				'<div class="modal-footer"> ' +
				'<button type="button" class="btn btn-default" data-dismiss="modal">取消</button> ' +
				'<button type="button" class="btn btn-primary" id="submit">提交</button> ' +
				'</div> ' +
				'</form> ' +
				'</div> ';
			this.modal = document.createElement('div');
			this.modal.className = 'modal';
			this.modal.innerHTML = tpl;
			document.body.appendChild(this.modal);
		},
		bindEvent: function () {
			var self = this;
			var btn = util.getEleById('new_post_btn');
			// 提交干货按钮点击时间
			btn.addEventListener('click', function () {
				if (self.open) {
					self.show();
					return;
				}
				self.render();
				self.show();
				self.open = true;
			});
			document.addEventListener('click', function (e) {
				var target = e.target || e.srcElement;
				if (target.getAttribute('data-dismiss') === 'modal') {
					self.hide();
				} else if (target.getAttribute('id') === 'submit') {
					if (target.classList.contains('clicked')) {
						return;
					}
					target.classList.add('clicked');
					var data = self.getValue();
					if (!data.url) {
						alert('网页地址填写错误！');
						target.classList.remove('clicked');
						return;
					}
					self.submit(data, function () {
						target.classList.remove('clicked');
					});
				}
			}, false);
		},
		show: function () {
			this.modal.style.display = 'block';
		},
		hide: function () {
			this.modal.style.display = 'none';
			this.modal.querySelector('form').reset();
		},
		getValue: function () {
			return {
				url: util.checkUrl(util.getEleById('url').value) ? util.getEleById('url').value : null,
				desc: util.getEleById('desc').value,
				who: util.getEleById('username').value,
				type: util.getEleById('select').value,
				debug: false
			};
		},
		submit: function (data, cb) {
			axios.post('https://gank.io/api/add2gank', data)
				.then(function (res) {
					cb();
					if (res.data.error) {
						alert(res.data.msg);
						return;
					}
					alert('提交成功！');
					this.hide();
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	};
	return util;
});
