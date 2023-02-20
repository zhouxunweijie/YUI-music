const set = (key, value = null) => {
	try{
		uni.setStorageSync(key, value);
		return true
	}catch(e){
		return false
	}
}

const setJson = (key, value = null) => {
	try{
		uni.setStorageSync(key, JSON.stringify(value));
		return true
	}catch(e){
		return false
	}
}

const get = (key, defaultValue = null) => {
	try{
		let value = uni.getStorageSync(key, value);
		if(value) {
			return value
		} else {
			return defaultValue;
		}
	}catch(e){
		return defaultValue
	}
}
const getJson = (key, defaultValue = null) => {
	try{
		let value = uni.getStorageSync(key, value);
		if(value) {
			return JSON.parse(value)
		} else {
			return defaultValue;
		}
	}catch(e){
		return defaultValue
	}
}

export default {
	set,
	setJson,
	get,
	getJson
}