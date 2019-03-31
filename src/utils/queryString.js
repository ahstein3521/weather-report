// turn an object into url param string
export default function(params) {
	if (!params || typeof params !== 'object') {
		throw new Error('Invalid params');
	} 

	return Object.keys(params).reduce((queryStr, key) => {
		return `${queryStr}${queryStr === '?' ? '' : '&' }${key}=${params[key]}`;
	}, '?');
}