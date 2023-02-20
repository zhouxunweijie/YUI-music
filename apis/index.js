import {
	http
} from '@/apis/service.js'
import storage from "@/common/StorageUtil.js"
import storageName from "@/store/moduleName/index.js"
//api地址
const base_url = 'http://api.uniquestfq.ltd'
// const base_url = 'http://api.music.canace.cn'

export default {
	//导出api接口地址
	base_url,

	/**
	 * 因为酷我音乐接口可以免费获取付费音乐，这里增加一个付费音乐调取酷我接口
	 */

	async isCanPlayInKuwo(music) {
		let params = {
			key: music,
			offset: 1,
			limit: 1
		}
		let data = await this.search_kuwo("kuwo", params)
		console.log(data)
		//如果酷我搜索不到歌曲，则跳过该歌曲
		if(data == "no data"){
			return "res not found"
		}else{
			return await http.get('/v1/kuwo/song?rid=' + data[0].id).then(res => {
				return res.data;
			})
		}

	},
	/**
	 * 搜索
	 */
	//判断是哪个搜索
	search(platform, params) {
		console.log(platform, 'platform')
		switch (platform) {
			case 'qq':
				return this.search_qq(platform, params)
				break
			case 'kuwo':
				return this.search_kuwo(platform, params)
				break
			case 'migu':
				return this.search_migu(platform, params)
				break
			case 'kugou':
				return this.search_kugou(platform, params)
				break
			case 'wyy':
				return this.search_wyy(platform, params)
				break
		}
	},
	//1.qq
	async search_qq(platform, params) {
		return await http.get('/v1/qq/search', {
			params
		}).then(res => {
			let data = res.data.data.song.list.map((item) => this.searchBuildMusic(platform, item));
			// console.log(data)
			return data;
		})
	},
	//2.酷我
	async search_kuwo(platform, params) {
		return await http.get('/v1/kuwo/search', {
			params
		}).then(res => {
			//搜索不到该歌曲则返回“no data”
			if(res.data.code == -1){
				return "no data"
			}else{
				let data = res.data.data.list.map((item) => this.searchBuildMusic(platform, item));
				console.log(data)
				return data;
			}
			
		})
	},
	//3.咪咕
	async search_migu(platform, params) {
		return await http.get('/v1/migu/search', {
			params
		}).then(res => {
			let data = res.data.musics.map((item) => this.searchBuildMusic(platform, item));
			return data;
		})
	},
	//4.酷狗
	async search_kugou(platform, params) {
		return await http.get('/v1/kugou/search', {
			params
		}).then(res => {
			let data = res.data.data.lists.map((item) => this.searchBuildMusic(platform, item));
			return data;
		})
	},
	//5.网易云
	async search_wyy(platform, params) {
		return await http.get('/v1/wyy/search', {
			params
		}).then(res => {
			let data = res.data.result.songs.map((item) => this.searchBuildMusic(platform, item));
			return data;
		})
	},

	/**
	 * 搜索结果转换
	 */

	//判断搜索结果转换
	searchBuildMusic(platform, params) {
		switch (platform) {
			case 'qq':
				return this.searchBuildMusic_qq(params)
				break
			case 'kuwo':
				return this.searchBuildMusic_kuwo(params)
				break
			case 'migu':
				return this.searchBuildMusic_migu(params)
				break
			case 'kugou':
				return this.searchBuildMusic_kugou(params)
				break
			case 'wyy':
				return this.searchBuildMusic_wyy(params)
				break
		}
	},
	//1.qq
	searchBuildMusic_qq(item) {
		return {
			id: item.songmid,
			name: item.songname,
			singer: item.singer[0].name,
			platform: 'qq',
			album: item.albumname,
			coverImage: `https://y.qq.com/music/photo_new/T002R300x300M000${item.albummid}.jpg`,
			lyric_url: base_url + `/v1/qq/lyric/?mid=${item.songmid}`,
			tlyric_url: '',
			// canPlay: item.pay.payplay != 1,
			// canPlay: item.pay.payplay != 1 ? true : (this.isCanPlayInKuwo(item.songname + " " + item.singer[0].name) !=
			// 	"res not found" ? true : false),
			canPlay: true,
			loadOtherInfo: false,
			isLike: false, // 是否喜欢
			url: '',
			lyric: '',
		}
	},

	//2.酷我
	searchBuildMusic_kuwo(item) {
		return {
			id: item.rid,
			name: item.name,
			singer: item.artist,
			platform: 'kuwo',
			album: item.album,
			coverImage: item.pic,
			// lyric_url: `https://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=${item.rid}`,
			lyric_url: base_url + `/v1/kuwo/lyric?rid=${item.rid}`,
			tlyric_url: '',
			/* canPlay:item.payInfo.play == '1100', */
			// canPlay: item.payInfo.play != '1111',
			isLike: false,
			canPlay: true,
			loadOtherInfo: false
		}
	},
	//3.咪咕
	searchBuildMusic_migu(item) {
		return {
			id: item.copyrightId,
			name: item.songName,
			singer: item.singerName,
			platform: 'migu',
			album: item.albumName,
			coverImage: item.cover,
			lyric_url: base_url + `/v1/migu/lyric?id=${item.copyrightId}`,
			tlyric_url: '',
			isLike: false,
			canPlay: true,
			loadOtherInfo: false
		}
	},
	//4.酷狗
	searchBuildMusic_kugou(item) {
		let name = item.SongName.indexOf("<em>") ? item.SongName : item.SongName.substring(item.SongName.indexOf(
			"<em>") + 4, item.SongName.indexOf("</em>")) + item.SongName.slice(item.SongName.indexOf("</em>") + 5)
		let singer = item.SingerName.indexOf("<em>") ? item.SingerName : item.SingerName.substring(item.SingerName
			.indexOf(
				"<em>") + 4, item.SingerName.indexOf("</em>")) + item.SingerName.slice(item.SingerName.indexOf(
			"</em>") + 5)
		return {
			id: item.AlbumID,
			hash: item.FileHash,
			name: name,
			singer: singer,
			platform: 'kugou',
			album: item.AlbumName,
			coverImage: '',
			lyric_url: base_url + `/v1/kugou/lyric?hash=${item.FileHash}`,
			tlyric_url: '',
			// canPlay: item.AlbumPrivilege == 8 ? true : (this.isCanPlayInKuwo(name + " " + singer) !=
			// 	"res not found" ? true : false),
			isLike: false,
			canPlay: true,
			loadOtherInfo: true
		}
	},
	//5.网易云
	searchBuildMusic_wyy(item) {
		return {
			id: item.id,
			name: item.name,
			singer: item.artists[0].name,
			platform: 'wyy',
			album: item.album.name,
			coverImage: '',
			lyric_url: '',
			tlyric_url: '',
			// canPlay: item.copyrightId == 0 ? true : (this.isCanPlayInKuwo(item.name + " " + item.artists[0].name) !=
			// 	"res not found" ? true : false),
			isLike: false,
			canPlay: true,
			loadOtherInfo: true
		}
	},

	//获取其他信息（这里是图片地址）
	getMusicOtherInfo(params) {
		switch (params.platform) {
			case 'kugou':
				return this.$H.getCoverImage_kugou(params)
				break
			case 'wyy':
				return this.$H.getCoverImage_wyy(params)
				break
		}
	},


	/**
	 * 判断歌曲地址
	 */

	async getPlayUrl(params) {
		switch (params.platform) {
			case 'qq':
				return this.$H.getPlayUrl_qq(params)
				break
			case 'kuwo':
				return this.$H.getPlayUrl_kuwo(params)
				break
			case 'migu':
				return this.$H.getPlayUrl_migu(params)
				break
			case 'kugou':
			console.log()
				return this.$H.getPlayUrl_kugou(params)
				break
			case 'wyy':
				return this.$H.getPlayUrl_wyy(params)
				break
		}
	},
	/**
	 * 获取歌词
	 */

	getLrc(params) {
		switch (params.platform) {
			case 'qq':
				return this.$H.getLrc_qq(params)
				break
			case 'kuwo':
				return this.$H.getLrc_kuwo(params)
				break
			case 'migu':
				return this.$H.getLrc_migu(params)
				break
			case 'kugou':
				return this.$H.getLrc_kugou(params)
				break
			case 'wyy':
				return this.$H.getLrc_wyy(params)
				break
		}
	},

	/**
	 * 获取歌单
	 */
	getSongListGroup(platform, params) {
		switch (platform) {
			case 'local':
				return this.getSongListGroup_local()
				break
			case 'qq':
				return this.getSongListGroup_qq(params)
				break
			case 'kuwo':
				return this.getSongListGroup_kuwo(params)
				break
			case 'migu':
				return this.getSongListGroup_migu(params)
				break
			case 'kugou':
				return this.getSongListGroup_kugou(params)
				break
			case 'wyy':
				return this.getSongListGroup_wyy(params)
				break
		}
	},

	getSongListGroup_local() {
		return new Promise((resolve, reject) => {
			const allSongList = storage.getJson(storageName.playList, [])
			resolve(allSongList);
		})
	},

	async getSongListGroup_qq(params) {
		return await http.get('/v1/qq/playlist', {
			params
		}).then(res => {
			if (res.data.data.list) {
				const list = res.data.data.list.map((item) => {
					return {
						coverImage: item.imgurl,
						name: item.dissname,
						id: item.dissid,
						url: null,
						singer: item.creator.name,
						desc: null,
						platform: 'qq',
						album: null
					}
				})
				return list;
			}
			return list;
		})
	},
	async getSongListGroup_kuwo(params) {
		return await http.get('/v1/kuwo/playlist/tag', {
			params
		}).then(res => {
			if (res.data.data.data) {
				const list = res.data.data.data.map((item) => {
					return {
						coverImage: item.img,
						name: item.name,
						id: item.id,
						url: null,
						singer: item.uname,
						desc: null,
						platform: 'kuwo',
						album: null
					}
				})
				return list;
			}
		})
	},
	async getSongListGroup_migu(params) {
		// page = page + 1
		return await http.get('/v1/migu/playlist', {
			params
		}).then(res => {
			if (res.data.data.contentItemList[0].itemList) {
				const list = res.data.data.contentItemList[0].itemList.map((item) => {
					const match = /id=([0-9]+)&/.exec(item.actionUrl);
					const id = match ? match[1] : '';
					return {
						coverImage: item.imageUrl,
						name: item.title,
						id: id,
						url: null,
						singer: item.subTitle,
						desc: null,
						platform: 'migu',
						album: null
					}
				})
				return list;
			}
			return []
		})
	},
	async getSongListGroup_kugou(params) {
		return await http.get('/v1/kugou/playlist/tag', {
			params
		}).then(res => {
			if (res.data.special_db) {
				const list = res.data.special_db.map((item) => {
					return {
						coverImage: item.img,
						name: item.specialname,
						id: item.specialid,
						url: null,
						singer: item.nickname,
						desc: null,
						platform: 'kugou',
						album: null,
						intro: item.intro
					}
				})
				return list;
			}
			return list;
		})
	},
	async getSongListGroup_wyy(params) {
		return await http.get('/v1/wyy/playlist', {
			params
		}).then(res => {
			if (res.data.playlists) {
				const list = res.data.playlists.map((item) => {
					return {
						coverImage: item.coverImgUrl,
						name: item.name,
						id: item.id,
						url: null,
						singer: item.creator.nickname,
						desc: null,
						platform: 'wyy',
						album: null,
						intro: item.description,
						updateTime: item.updateTime
					}
				})
				return list;
			}
			return list;
		})
	},


	/**
	 * @param {Object} params
	 * 获取歌单详情,以及歌单列表
	 */
	getSongListDetails(params) {
		switch (params.platform) {
			case 'local':
				return this.getSongListDetails_local(params)
				break
			case 'qq':
				return this.getSongListDetails_qq(params)
				break
			case 'kuwo':
				return this.getSongListDetails_kuwo(params)
				break
			case 'migu':
				return this.getSongListDetails_migu(params)
				break
			case 'kugou':
				return this.getSongListDetails_kugou(params)
				break
			case 'wyy':
				return this.getSongListDetails_wyy(params)
				break
		}
	},
	getSongListDetails_local(params) {
		return new Promise((resolve, reject) => {
			const allSongList = storage.getJson(storageName.playList, [])
			const songList = allSongList.find(item => item.id == params.id);
			resolve(songList);
			console.log(songList);
		})
	},
	async getSongListDetails_qq(params) {
		return await http.get('/v1/qq/playlist/info?pid=' + params.id).then(res => {
			const data = res.data.cdlist[0];
			const songlistData = res.data.cdlist[0].songlist.map((item) => this.searchBuildMusic(params
				.platform,
				item));
			return {
				coverImage: data.logo,
				name: data.dissname,
				id: data.dissid,
				url: null,
				singer: data.nickname,
				desc: data.desc,
				platform: 'qq',
				album: null,
				musicList: songlistData
			}
		})
	},
	async getSongListDetails_kuwo(params) {
		return await http.get('/v1/kuwo/playlist/info?pid=' + params.id).then(res => {
			const data = res.data.data;
			const songlistData = data.musicList.map(item => this.searchBuildMusic(params.platform,
				item));
			return {
				coverImage: data.img500,
				name: data.name,
				id: data.id,
				url: null,
				singer: data.uname,
				desc: data.info,
				platform: 'kuwo',
				album: null,
				musicList: songlistData
			}
		})
	},
	async getSongListDetails_migu(params) {
		return await http.get('/v1/qq/playlist/info?pid=' + params.id).then(res => {
			const data = res.data.cdlist[0];
			const songlistData = res.data.cdlist[0].songlist.map(item => this.searchBuildMusic(params
				.platform,
				item));
			return {
				coverImage: data.logo,
				name: data.dissname,
				id: data.dissid,
				url: null,
				singer: data.nickname,
				desc: data.desc,
				platform: 'migu',
				album: null,
				musicList: songlistData
			}
		})
	},
	async getSongListDetails_kugou(params) {
		return await http.get('/v1/kugou/playlist/info?pid=' + params.id).then(res => {
			const data = res.data;
			const songlistData = res.data.listData.map(item => this.songListBuildMusic_kugou(item));
			return {
				coverImage: data.picurl,
				name: data.name,
				id: params.id,
				url: null,
				singer: params.singer,
				desc: params.intro,
				platform: 'kugou',
				album: null,
				musicList: songlistData
			}
		})
	},
	async getSongListDetails_wyy(params) {
		console.log(params)
		return await http.get('/v1/wyy/playlist/info?pid=' + params.id).then(res => {
			const data = res.data.playlist;
			const songlistData = res.data.playlist.tracks.map(item => this.songListBuildMusic_wyy(item));
			return {
				coverImage: data.coverImgUrl,
				name: data.name,
				id: data.id,
				url: null,
				singer: data.creator.nickname,
				desc: data.description,
				platform: 'wyy',
				album: null,
				musicList: songlistData
			}
		})
	},
	//酷狗 歌单详情单个歌曲内容转换
	songListBuildMusic_kugou(item) {
		return {
			id: item.album_id,
			hash: item.hash,
			name: item.songname,
			singer: item.singername,
			platform: 'kugou',
			album: item.album_name,
			coverImage: '',
			lyric_url: base_url + `/v1/kugou/lyric?hash=${item.hash}`,
			tlyric_url: '',
			// canPlay: item.privilege == 8 ? true : (this.isCanPlayInKuwo(item.songname + " " + item.singername) !=
			// 	"res not found" ? true : false),
			canPlay: true,
			loadOtherInfo: true
		}
	},
	//网易云 歌单详情单个歌曲内容转换
	songListBuildMusic_wyy(item) {
		return {
			id: item.id,
			name: item.name,
			singer: item.ar[0].name,
			platform: 'wyy',
			album: item.al.name,
			coverImage: '',
			lyric_url: '',
			tlyric_url: '',
			// canPlay: item.fee == 8 ? true : (this.isCanPlayInKuwo(item.name + " " + item.ar[0].name) !=
			// 	"res not found" ? true : false) ,
			canPlay: true,
			loadOtherInfo: true
		}
	},


	//获取排行榜信息
	getRankDetail(params) {
		switch (params.platform) {
			case 'qq':
				return this.getRankDetail_qq(params)
				break
			case 'kuwo':
				return this.getRankDetail_kuwo(params)
				break
			case 'migu':
				return this.getRankDetail_migu(params)
				break
			case 'kugou':
				return this.getRankDetail_kugou(params)
				break
			case 'wyy':
				return this.getRankDetail_wyy(params)
				break
		}
	},

	async getRankDetail_qq(params) {
		return await http.get('/v1/qq/top/?topId=' + params.key).then(res => {
			const data = res.data.detail.data.songInfoList;
			const songlistData = data.map(item => this.rankBuildMusic_qq(item));
			return {
				coverImage: params.pic,
				name: params.name,
				id: params.key,
				url: null,
				update: params.update,
				desc: params.intro,
				platform: 'qq',
				album: null,
				musicList: songlistData
			}
		})
	},
	async getRankDetail_kuwo(params) {
		return await http.get('/v1/kuwo/top?topId=' + params.key).then(res => {
			const data = res.data.data.musicList;
			const songlistData = data.map(item => this.rankBuildMusic_kuwo(item));
			return {
				coverImage: params.pic,
				name: params.name,
				id: params.key,
				url: null,
				update: params.update,
				desc: params.intro,
				platform: 'kuwo',
				album: null,
				musicList: songlistData
			}
		})
	},
	async getRankDetail_kugou(params) {
		return await http.get('/v1/kugou/top?topId=' + params.key).then(res => {
			const data = res.data.data;
			const songlistData = data.map(item => this.rankBuildMusic_kugou(item));
			return {
				coverImage: params.pic,
				name: params.name,
				id: params.key,
				url: null,
				update: params.update,
				desc: params.intro,
				platform: 'kugou',
				album: null,
				musicList: songlistData
			}
		})
	},
	async getRankDetail_wyy(params) {
		return await http.get('/v1/wyy/top?topId=' + params.key).then(res => {
			const data = res.data.playlist;
			const songlistData = res.data.playlist.tracks.map(item => this.rankBuildMusic_wyy(item));
			return {
				coverImage: data.coverImgUrl,
				name: data.name,
				id: data.key,
				url: null,
				update: params.update,
				desc: params.intro,
				platform: 'wyy',
				album: null,
				musicList: songlistData
			}
		})
	},


	//排行榜对单个歌曲进行格式化
	rankBuildMusic_qq(item) {
		return {
			id: item.mid,
			name: item.title,
			singer: item.singer[0].name,
			platform: 'qq',
			album: item.album.name,
			coverImage: `https://y.qq.com/music/photo_new/T002R300x300M000${item.album.mid}.jpg`,
			lyric_url: base_url + `/v1/qq/lyric/?mid=${item.mid}`,
			tlyric_url: '',
			// canPlay: item.pay.pay_play != 1 ? true : (this.isCanPlayInKuwo(item.title + " " + item.singer[0].name) !=
			// 	"res not found" ? true : false),
			canPlay: true,
			loadOtherInfo: false
		}
	},
	rankBuildMusic_kuwo(item) {
		return {
			id: item.rid,
			name: item.name,
			singer: item.artist,
			platform: 'kuwo',
			album: item.album,
			coverImage: item.pic,
			lyric_url: base_url + `/v1/kuwo/lyric?rid=${item.rid}`,
			tlyric_url: '',
			// canPlay: item.payInfo.play != '1111',
			canPlay: true,
			loadOtherInfo: false
		}
	},
	rankBuildMusic_kugou(item) {
		return {
			id: item.album_id,
			hash: item.hash,
			name: item.songname,
			singer: item.singername,
			platform: 'kugou',
			album: item.album_name,
			coverImage: '',
			lyric_url: base_url + `/v1/kugou/lyric?hash=${item.hash}`,
			tlyric_url: '',
			// canPlay: item.privilege == 8 ? true : (this.isCanPlayInKuwo(tem.songname + " " + item.singername) !=
			// 	"res not found" ? true : false),
			canPlay: true,
			loadOtherInfo: true
		}
	},
	rankBuildMusic_wyy(item) {
		return {
			id: item.id,
			name: item.name,
			singer: item.ar[0].name,
			platform: 'wyy',
			album: item.al.name,
			coverImage: '',
			lyric_url: '',
			tlyric_url: '',
			// canPlay: item.fee == 8 ? true : (this.isCanPlayInKuwo(item.name + " " + item.ar[0].name) !=
			// 	"res not found" ? true : false),
			canPlay: true,
			loadOtherInfo: true
		}
	}
}
