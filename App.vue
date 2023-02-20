

<script>
	import Audio from '@/mixins/audio'
	export default {
		extends:Audio,
		onLaunch: function() {
			this.init()
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("static/css/publice.css");
	/* 全局默认字体 */
	@import url("static/css/reset.css");
	/* iconfont 图标 */
	@import url("static/iconfont/iconfont.css");
</style>
