import request from "./axios";

export function getPage(data){
	return request({
		url: '/mall/pms-product-attribute/page',
		method: 'post',
        data
	});
}

export function getOne(id){
	return request({
		url: `/mall/pms-product-attribute/one/${id}`,
		method: 'get',
	});
}

export function delOne(id){
	return request({
		url: `/mall/pms-product-attribute/del/${id}`,
		method: 'get'
	});
}

export function addOne(data){
	return request({
		url: '/mall/pms-product-attribute/add',
		method: 'post',
		data
	});
}

export function updateOne(data){
	return request({
		url: '/mall/pms-product-attribute/edit',
		method: 'post',
		data
	});
}

