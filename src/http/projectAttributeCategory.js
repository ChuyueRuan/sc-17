import request from "./axios";

export function getCategoryPage(data){
	return request({
		url: '/mall/pms-product-attribute-category/page',
		method: 'post',
        data
	});
}

export function getOne(id){
	return request({
		url: `/mall/pms-product-attribute-category/one/${id}`,
		method: 'get',
	});
}

export function delOne(id){
	return request({
		url: `/mall/pms-product-attribute-category/del/${id}`,
		method: 'get'
	});
}

export function addOne(data){
	return request({
		url: '/mall/pms-product-attribute-category/add',
		method: 'post',
		data
	});
}

export function updateOne(data){
	return request({
		url: '/mall/pms-product-attribute-category/edit',
		method: 'post',
		data
	});
}

