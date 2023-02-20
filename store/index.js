import Vue from 'vue'
import Vuex from 'vuex'
import {
	secondToDuration
} from "@/common/util.js"
import moduleName from "@/store/moduleName/index.js"
import * as util from "@/common/util.js"
import StorageUtil from "@/common/StorageUtil.js"
import {
	playModeConfig
} from '@/core/playMode.js'

// const modulesFiles = require.context('./modules', false, /\.js$/)

// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
// 	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
// 	const value = modulesFiles(modulePath)
// 	modules[moduleName] = value.default
// 	modules[moduleName]['namespaced'] = true;
// 	return modules
// }, {})

Vue.use(Vuex)



const store = new Vuex.Store({
	//modules,
	strict: false,
	state: {
		// 总秒数
		totalSeconds: StorageUtil.get(moduleName.totalSeconds, 0),
		// 播放秒数
		playSeconds: StorageUtil.get(moduleName.playSeconds, 0),
		// 进度条
		progress: StorageUtil.get(moduleName.progress, 0),
		// 播放状态
		playState: false,
		// 播放模式 list:列表循环，single:单曲循环
		playMode: StorageUtil.getJson(moduleName.playMode, playModeConfig.list),
		// 音乐是否准备完毕
		musicIsReady: false,
		// 播放列表
		playList: StorageUtil.getJson(moduleName.playList, []),
		// 当前播放的下标
		playIndex: StorageUtil.get(moduleName.playIndex, -1),
		lrcStr: StorageUtil.getJson("lrcStr", null),
		// 歌词
		lrcs: StorageUtil.getJson("lrcs", null),
		// 当前歌词
		lrc: StorageUtil.getJson("lrc", {
			time: '[00:00.00]',
			content: '歌词加载中'
		}),
		playName: StorageUtil.get(moduleName.playName, ""),
		playImg: StorageUtil.get(moduleName.playImg, ""),
		//当前播放地址
		playUrl: StorageUtil.get(moduleName.playUrl, ""),
		recentlyPlayList: [],
		// 参数：歌单
		paramSongList: [],
		// 是否首次运行
		isFirstRun: true,
		showPlayBar: StorageUtil.get(moduleName.showPlayBar, false), // 是否显示播放控件
	},
	getters:{
		// 总时长 00:00
		totalDuration(state) {
			return secondToDuration(state.totalSeconds)
		},
		// 播放时长
		playDuration(state) {
			return secondToDuration(state.playSeconds)
		},
	},
	mutations: {
		setTotalSeconds(state, num){
			state.totalSeconds = num;
			StorageUtil.set(moduleName.totalSeconds, num)
		},
		setPlaySeconds(state, num){
			state.playSeconds = num;
			StorageUtil.set(moduleName.playSeconds, num)
		},
		setPlayIndex(state, playIndex) {
			state[moduleName.playIndex] = playIndex;
			StorageUtil.set(moduleName.playIndex, playIndex)
		},
		setShowPlayBar(state, status) {
			state.showPlayBar = status;
			StorageUtil.set(moduleName.showPlayBar, status)
		},
		setMusicIsReady(state, musicIsReady) {
			state.musicIsReady = musicIsReady;
		},
		setPlayMode(state, status) {
			state[moduleName.playMode] = status;
			StorageUtil.setJson(moduleName.playMode, status)
		},
		setProgress(state, status) {
			state[moduleName.progress] = status;
			StorageUtil.set(moduleName.progress, status)
		},
		setPlayList(state, list) {
			state[moduleName.playList] = list;
			StorageUtil.setJson(moduleName.playList, list)
		},
		setPlayState(state, status) {
			state[moduleName.playState] = status;
		},
		setLrcs(state, lrcs) {
			state.lrcs = lrcs;
		},
		setLrc(state, lrc) {
			state.lrc = lrc;
		},
		setLrcStr(state, lrc) {
			if (lrc) {
				const lrcArray = util.formatLrc(lrc, 'array');
				if (lrcArray.length > 0) {
					const lrcs = util.formatLrc(lrc, 'array');
					state.lrcStr = lrc;
					state.lrcs = lrcs;
					state.lrc = lrcs[lrcArray[0].second];
					StorageUtil.setJson("lrcSlrcr", lrc)
					StorageUtil.setJson("lrcs", lrcs)
					StorageUtil.setJson("lrc", state.lrc)
				}
			}
		},
	},
	actions: {

	}
})

export default store
