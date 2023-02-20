import {
	mapState,
	mapGetters,
	mapMutations
} from 'vuex'

export default {
	computed: {
		...mapState([
			'totalSeconds',
			'playSeconds', 
			'progress', 
			'playState', 
			'playMode',
			'musicIsReady',
			'playList',
			'lrc',
			'lrcs',
			'playIndex',
			'playName',
			'playImg',
			'playUrl',
			'showPlayBar']),
		...mapGetters([
			'totalDuration',
			'playDuration'])
	},
	methods: {
		...mapMutations([
			'setPlayIndex',
			'setShowPlayBar', 
			'setPlayMode', 
			'setPlayState',
			'setProgress', 
			'setMusicIsReady', 
			'setTotalSeconds',
			'setPlaySeconds',
			'setLrcStr',
			'setLrc',
			'setLrcs',
			'setPlayList'])
	}
}