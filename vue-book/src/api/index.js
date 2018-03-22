import axios from 'axios';
// 增加默认的请求路径, 项目上线的时候,由于是同域资源,所以可以删掉
axios.defaults.baseURL = 'http://localhost:3000';

// 拦截器,这里把res处理一下,res => res.data
axios.interceptors.response.use((res)=>{
    return res.data;
})

// 获取轮播图数据,返回一个promise对象
export let getSliders = ()=>{
    return axios.get('/sliders')
};

// 获取热门图书接口
export let getHotBooks = ()=>{
    return axios.get('/hot')
};

// 获取全部图书(列表页)
export let getBooks = ()=>{
    return axios.get('/book')
};

// 删除某一本图书
export let removeBook = (id)=>{
    return axios.delete(`/book?id=${id}`);
};

// 获取某一本书
export let findOneBook = (id)=>{
    return axios.get(`/book?id=${id}`);
};

// 修改图书
export let updateBook = (id,data)=>{
    console.log(data)
    // 两个参数,参数1:路径,参数2:修改的内容(对象)
    return axios.put(`/book?id=${id}`,data);
};

// 添加图书
export let addBook = data=>{
    // 两个参数,参数1:路径,参数2:修改的内容(对象)
    return axios.post('/book',data);
};

// 等待 getSliders(),getHotBooks()完成,然后继续执行
export let getAll = ()=>{
    return axios.all([getSliders(),getHotBooks()]);
}

// 分页,根据偏移量返回对应的数据条数
export let pagination = offset=>{
    return axios.get(`/page?offset=${offset}`);
}

// 获取收藏图书
export let getCollect = ()=>{
    return axios.get('/collect');
}

// 收藏图书
export let cancelCollect = (id,data)=>{
    return axios.put(`/book?id=${id}`,data);
}
