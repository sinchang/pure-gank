require(['util'], function (util) {
	var dateEl = util.getEleById('date');
	var param = util.getUrlParam('day');
	var date = param || util.formatDate(new Date());
	if (!util.isDate(date)) {
		window.location.href = 'index.html';
	}

	getData(date);

	/**
	 * 获取每日的数据并渲染
	 * @param date
	 */
	function getData(date) {
		util.ajaxGet(util.APIURL + 'history/content/day/' + date + '', function (res) {
			var data = res.data.results;
			if (!data.length) {
				if (date === util.formatDate(new Date())) {
					getData(util.changeDate(date, 'subtract', 1));
					return;
				}
				dateEl.innerHTML = date;
				util.getEleById('index_container').innerHTML = '非常抱歉，今日无数据！';
				return;
			}
			data = data[0];
			dateEl.innerHTML = date;
			util.renderTpl('index_container', 'index_container_tpl', data);
		})
	}
	/**
	 * 点击 next 执行操作
	 */
	util.getEleById('next').onclick = function () {
		var now = dateEl.innerHTML;
		var next = util.changeDate(now, 'add', 1);
		if (next > util.formatDate(new Date())) {
			return;
		}
		dateEl.innerHTML = next;
		util.setUrlParam('day', next);
		getData(next);
	};

	/**
	 * 点击 prev 执行操作
	 */
	util.getEleById('prev').onclick = function () {
		var now = dateEl.innerHTML;
		var prev = util.changeDate(now, 'subtract', 1);
		if (prev < '2015/05/18') {
			return;
		}
		dateEl.innerHTML = prev;
		util.setUrlParam('day', prev);
		getData(prev);
	}
});
