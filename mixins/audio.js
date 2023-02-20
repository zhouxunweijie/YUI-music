import playStore from './playStore.js';
import * as util from '@/common/util';
import Vue from 'vue'

export default {
	extends: playStore,
	methods: {
		init(){
			let Audio = uni.getBackgroundAudioManager();
			
			// 音频加载成功，可以播放
			Audio.onCanplay(() => {
				console.log('音频加载成功', this.Audio.duration);
				this.setMusicIsReady(true);
			});
			
			Audio.onPlay(() => {
				console.log('开始播放');
			});
			
			Audio.onPause(() => {
				console.log('播放暂停');
				this.setPlayState(false)
			});
			
			Audio.onStop(() => {
				console.log('播放非自然停止');
				this.setPlayState(false)
				setTimeout(() => {
					this.next()
				}, 3000)
			});
			
			Audio.onEnded(() => {
				console.log('播放自然停止');
				this.setPlayState(false)
				this.next()
			});
			
			Audio.onTimeUpdate(() => {
				// console.log('播放进度更新事件');
				this.setPlaySeconds(this.Audio.currentTime)
				this.setTotalSeconds(Audio.duration);
				let progress = Number((this.Audio.currentTime / this.totalSeconds * 100).toFixed(0));
				if(progress) {
					this.setProgress(progress)
				}
				
			});
			
			Audio.onError((res) => {
				console.log('播放失败')
				this.setPlayState(false)
				this.next()
			});
			Vue.prototype.Audio = Audio;
			Vue.prototype.prev = this.prev;
			Vue.prototype.next = this.next;
			Vue.prototype.stop = this.stop;
			Vue.prototype.pause = this.pause;
			Vue.prototype.play = this.play;
			Vue.prototype.loadLrc = this.loadLrc;
			Vue.prototype.setMusic = this.setMusic;
			Vue.prototype.getMusicPlayUrl = this.$api.getPlayUrl;
			Vue.prototype.getLrc = this.$api.getLrc;
			Vue.prototype.getMusicOtherInfo = this.$api.getMusicOtherInfo;
		},
		async setMusic(index = 0, progress = {}, call) {
			if(this.playList && this.playList.length > 0) {
				
				// 重置进度条
				this.setProgress(progress.progress || 0)
				// 重置秒数
				this.setPlaySeconds(progress.playSeconds || 0)
				
				// 设置音乐状态为未准备
				this.setMusicIsReady(false)
				let music = this.playList[index];
				// 设置当前播放索引
				this.setPlayIndex(index)
				console.log(this.playIndex, 'playIndex')
				if (music.canPlay) {
					//此处酷狗音乐接口需要获取歌曲的封面图片
					if(!music.coverImage) {
						await this.getMusicOtherInfo(music).then(musicResult => {
							music.coverImage = musicResult;
						})
					}
					//获取歌曲地址
					await this.getMusicPlayUrl(music).then(res => {
						if (res == "" || res == null || JSON.stringify(res) == "{}") {
							music.url = "";
						} else {
							music.url = res
						}
					})
					//尝试获取酷我地址
					if (music.url == '') {
						let newUrl = await this.$api.isCanPlayInKuwo(music.name + " " + music.singer)	
						if (newUrl != 'res not found' ) {
							music.url = newUrl
						} else {
							//说明该歌曲无法播放
							music.canPlay = false
							index = this.getNextIndex(index);
							util.showToast('当前音乐不支持播放，自动播放下首音乐');
							this.setMusic(index, null, () => {});
						}
					}
					// 判断时候播放源和id是否相同
					const oldPlayMusic = this.playList[this.playIndex];
					if (!util.objEquals(oldPlayMusic, music)) {
						// 重置歌词
						this.setLrc({
							time: '[00:00.00]',
							content: '歌词加载中'
						})
					}
					// 加载歌词
					this.loadLrc(music);
					this.Audio.src = music.url;
					this.Audio.title = music.name;
					this.Audio.singer = music.singer;
					this.Audio.coverImgUrl = music.coverImg;
					
					this.setPlayList(this.playList)
					let timer = setInterval(() => {
						if (this.musicIsReady) {
							// this.setTotalSeconds(this.Audio.duration);
							// this.setPlayUrl(this.Audio.src);
							if (this.playSeconds > 0) {
								this.Audio.seek(this.playSeconds)
							}
							this.setMusicIsReady(false)
							clearInterval(timer);
							if (call) {
								this.setPlayState(true)
								call();
							}
						}
					}, 200);
				} else {
					index = this.getNextIndex(index);
					util.showToast('当前音乐不支持播放，自动播放下首音乐');
					this.setMusic(index, {}, () => {});
				}
			}
		},
		/**
		 * 加载歌词
		 */
		loadLrc(music, call) {
			Vue.prototype.getLrc && Vue.prototype.getLrc(music).then(lrcStr => {
				if (lrcStr) {
					this.setLrcStr(lrcStr)
					if (call) {
						call();
					}
				} else {
					this.setLrcStr('[00:00.00]无歌词')
				}
			})
		},
		/**
		 * 	获取下一首索引
		 */
		getNextIndex(index){
			index = ++index;
			const length = this.playList.length;
			if (index == length - 1) {
				index = 0;
			}
			return index
		},
		/*
		* 播放
		*/
	   play(){
		   const music = this.playList[this.playIndex];
		   console.log(music, 'music')
		   if(!this.Audio.src) {
			   this.Audio.src = music.url;
			   this.Audio.title = music.name;
			   this.Audio.singer = music.singer;
			   this.Audio.coverImgUrl = music.coverImg;
			   this.Audio.seek(this.playSeconds)
			  
		   }
		   console.log(this.Audio.src, 'src')
			this.Audio.play();
			this.setPlayState(true)
		   
		   
		  
	   },
		/*
		* 暂停
		*/
	   pause(){
		   this.Audio.pause();
		   this.setPlayState(false)
	   },
	   /*
		* 停止
		*/
	   stop(){
			console.log('停止了')
			this.Audio.stop();
			this.setPlayState(false);
			this.setProgress(0);
			this.setPlaySeconds(0);
			this.setTotalSeconds(0);
	   },
	   /**
		*  下一曲
		*/
	   next(){
		   console.log('下一首')
		   const length = this.playList.length;
		   let index = this.playIndex == length - 1 ? 0 : this.playIndex + 1;
			this.setMusic(index, {}, () => {})
	   },
	   /**
		*  上一曲
		*/
	   prev(){
		   console.log('上一首')
		   const length = this.playList.length;
		   
		   let index = this.playIndex == 0 ? length - 1 : this.playIndex - 1;
			this.setMusic(index, {}, () => {})
   }
	},
}