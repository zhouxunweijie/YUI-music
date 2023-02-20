/**
 * 秒数转时长  1 → 00:01
 */
export function secondToDuration(second, fixed = 0) {
	var sec = (second % 60).toFixed(fixed);
	var min = Math.floor(second / 60);
	if (min.toString().length < 2) {
		min = '0' + min;
	}
	if (sec < 10) {
		sec = '0' + sec;
	}
	return min + ':' + sec
}

/**
 * 判断两个对象是否相等
 * @param {Object} o1
 * @param {Object} o2
 */
export function objEquals(o1, o2) {
	if (o1 && o2) {
		return o1.platform == o2.platform && o1.id == o2.id;
	} else {
		return false;
	}
}

export function isExist(list, obj) {
	for (let itemIndex in list) {
		const item = list[itemIndex];
		if (objEquals(item, obj)) {
			return true;
		}
	}
	return false;
}

export function findIndex(list, obj) {
	for (let itemIndex in list) {
		const item = list[itemIndex];
		if (objEquals(item, obj)) {
			return parseInt(itemIndex);
		}
	}
	return -1;
}

export function findObj(list, obj) {
	const index = findIndex(list, obj);
	if (inde != -1) {
		return list[index];
	}
	return null;
}

export function isFind(list, obj) {
	const index = findIndex(list, obj);
	if (index != -1) {
		return true;
	}
	return false;
}

export function showToast(title, duration = 5000, icon = "none", position = "bottom") {
	uni.showToast({
		title,
		icon,
		duration,
		position
	});
}
/**
 * 格式化歌词
 * @param {String} lrcStr 歌词文本
 * @param {String} mode 格式 object 对象模式，array 数组模式
 */
export function formatLrc(lrcStr, mode = 'object') {
	const reg = /\[\d*:\d*(\.|:)\d*]/g
	const timeReg = /\[(\d{2,})\:(\d{2})(?:\.(\d{1,3}))?\]/g; // eslint-disable-line no-useless-escape
	let timeResult = [];
	let index = 0;
	if (mode == 'object') {
		let lrcs = {};
		lrcStr.split("\n").forEach(item => {
			const timeRegAry = item.match(reg);
			if (timeRegAry) {
				const time = timeRegAry[0];
				const min = parseInt(time.match(/\[\d*/i).toString().slice(1))
				const sec = parseInt(time.match(/\:\d*/i).toString().slice(1))
				const second = min * 60 + sec
				const content = item.replace(timeRegAry, "")
				lrcs[second] = {
					time,
					content
				};
			}
		})
		return lrcs;
	} else {
		let lrcs = [];
		lrcStr.split("\n").forEach(item => {
			const timeRegAry = item.match(reg);
			if (timeRegAry) {
				const time = timeRegAry[0];
				const min = parseInt(time.match(/\[\d*/i).toString().slice(1))
				const sec = parseInt(time.match(/\:\d*/i).toString().slice(1))
				const second = min * 60 + sec
				const content = item.replace(timeRegAry, "")
				lrcs.push([time + content]);
			}
		})
		return lrcs;
	}

}
//下面三个为酷我音乐解析歌词
export function sortLrcArr(arr) {
	const lrcSet = new Set()
	let lrc = []
	let lrcT = []

	for (const item of arr) {
		if (lrcSet.has(item.time)) {
			lrc.push(item)
		} else {
			lrcT.push(item)
			lrcSet.add(item.time)
		}
	}
	if (lrc.length) {
		lrc.unshift(lrcT.shift())
	} else {
		lrc = lrcT
		lrcT = []
	}

	return {
		lrc,
		lrcT,
	}
}

export function formatTime(time) {
	let m = parseInt(time / 60)
	let s = (time % 60).toFixed(2)
	return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)
}

export function transformLrc(songinfo, lrclist) {
	return `[ti:${songinfo.songName}]\n[ar:${songinfo.artist}]\n[al:${songinfo.album}]\n[by:]\n[offset:0]\n${lrclist ? lrclist.map(l => `[${this.formatTime(l.time)}]${l.lineLyric}\n`).join('') : '暂无歌词'}`
}


//是否能够使用流量进行播放、下载
export function isUseNetWork(bool){
	var network
	uni.getNetworkType({
	    success: function (res) {
	       network = res.networkType
	    }
	});
	if(!bool && (network == "2g" ||network == "3g" ||network == "4g" ||network == "5g" )){
		// if(!bool && (network == "wifi" )){
		return false
	}else{
		return true
	}
}