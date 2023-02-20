import {
	http
} from '@/apis/service.js'
import * as util from "@/common/util.js"

export default {


	/**
	 * 获取歌曲地址
	 */

	//1.qq
	async getPlayUrl_qq(params) {
		return await http.get('/v1/qq/song?mid=' + params.id).then(res => {
			return res.data.data.url;
		})
	},
	//2.酷我
	async getPlayUrl_kuwo(params) {
		return await http.get('/v1/kuwo/song?rid=' + params.id).then(res => {
			// return res.data.data.url;
			return res.data;
		})
	},
	//3.咪咕
	async getPlayUrl_migu(params) {
		return await http.get('/v1/migu/song?cid=' + params.id).then(res => {
			return res.data.url;
		})
	},
	//4.酷狗
	async getPlayUrl_kugou(params) {
		return await http.get('/v1/kugou/song?aid=' + params.id + '&hash=' + params.hash).then(res => {
			if(res.data.data.is_free_part == 1){
				return ""
			}else{
				return res.data.data.play_url;
			}
		})
	},
	//5.网易云
	async getPlayUrl_wyy(params) {
		return await http.get('/v1/wyy/song/url?mid=' + params.id).then(res => {
			return res.data.data[0].url;
		})
	},


	/**
	 * 获取歌词
	 */

	//1.qq
	async getLrc_qq(params) {
		return await http.get('/v1/qq/lyric?mid=' + params.id).then(res => {
			return res.data.lyric;
		})
	},
	//2.酷我
	async getLrc_kuwo(params) {
		return await http.get('/v1/kuwo/lyric?rid=' + params.id).then(res => {
			const {
				lrc,
				lrcT
			} = util.sortLrcArr(res.data.data.lrclist)
			console.log(lrc)
			return util.transformLrc(res.data.data.songinfo, lrc);
		})
	},
	//3.咪咕
	async getLrc_migu(params) {
		return await http.get('/v1/migu/lyric?cid=' + params.id).then(res => {
			return res.data.lyric;
		})
	},
	//4.酷狗
	async getLrc_kugou(params) {
		return await http.get('/v1/kugou/lyric?hash=' + params.hash).then(res => {
			return res.data.lyric;
		})
	},
	//5.网易云
	async getLrc_wyy(params) {
		return await http.get('/v1/wyy/lyric?mid=' + params.id).then(res => {
			return res.data.lrc.lyric;
		})
	},

	//酷狗获取歌曲图片地址
	async getCoverImage_kugou(params) {
		return await http.get('/v1/kugou/song?aid=' + params.id + '&hash=' + params.hash).then(res => {
			return res.data.data.img;
		})

	},

	//网易云获取歌曲图片地址
	async getCoverImage_wyy(params) {
		return await http.get('/v1/wyy/song?mid=' + params.id).then(res => {
			return res.data.songs[0].al.picUrl;
		})

	},


}
