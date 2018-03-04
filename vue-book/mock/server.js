let http = require('http');
let fs = require('fs');
let url = require('url');

// 获取 sliders
let silers = require('./sliderData');

function read(cb){
    fs.readFile('./books.json','utf8',function(err,data){
        if(err || data.length == 0){// 如果错误或者data长度为0
            cb([]);
        }else{
            cb(JSON.parse(data));
        }
    });
};

function write(data,cb){ //data是对象
    fs.writeFile('./books.json',JSON.stringify(data),cb)
};

// read(function(books){
//     console.log(books)
// });

http.createServer((req,res)=>{
    // node 跨域头设置,项目上线的时候,由于是资源都是同域,所以要删掉
    /*res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") return res.end(); // 让options请求快速返回 */

    let {pathname,query} = url.parse(req.url,true);/*加true把query转成对象 */
    if(pathname === '/sliders'){
        res.setHeader('Content-Type','application/json;charset=utf8');
        // 每个接口结束后都必须return,不然会继续执行
        return res.end(JSON.stringify(silers));
    };
    if(pathname === '/hot'){
        res.setHeader('Content-Type','application/json;charset=utf8');
        read(function(books){
           let hot  = books.reverse().slice(0,6);
           res.end(JSON.stringify(hot));
       });
       return
    };

    let pageSize = 5;
    if(pathname === '/page'){
        // 解构赋值 let {offset} = parseInt(query.offset)
        let offset = parseInt(query.offset) || 0; // 拿到前端传递的值
        read(function(books){
            let result = books.reverse().slice(offset,offset+pageSize); // reverse()是变异方法(能改变原数组)
            let hasMore = true; // 默认有更多
            if(books.length <= offset+pageSize){ // 当实际数目小于等于要显示的数目时
                hasMore = false;
            }
            res.setHeader('Content-Type','application/json;charset=utf8');
            res.end(JSON.stringify({hasMore,books:result})); // 这里的 hasMore:hasMore,所以用解构写法
        })
        return
    };

    if(pathname === '/book'){ // 对图书的增删查改
        res.setHeader('Content-Type','application/json;charset=utf8');
        let id = parseInt(query.id); // 取出字符串     
        switch (req.method){
            case 'GET':
                if(id){ // 查询一个
                    read(function(books){
                        let book = books.find(item=>item.bookId === id);
                        // 假如 book 没找到,不能返回 undefined ,所以要返回一个空对象.
                        if(!book) book = {};
                        res.setHeader('Content-Type','application/json;charset=utf8');
                        res.end(JSON.stringify(book));
                    })
                }else{ // 所有图书
                    read(function(books){
                        res.end(JSON.stringify(books.reverse()))
                    })
                }
            break;
            case 'POST':
                let str = '';
                req.on('data',chunk=>{
                    str += chunk
                });
                req.on('end',()=>{
                    let book = JSON.parse(str);
                    read(function(books){
                        book.bookId = books.length?books[books.length-1].bookId+1:1;
                        books.push(book); // 把book放到books中,books在内存中
                        write(books,function(){
                            res.end(JSON.stringify(book))
                        })
                    })
                });
            break;
            case 'PUT':
                if(id){ // 获取当前要修改的id
                    let str = '';
                    req.on('data',chunk=>{
                        str += chunk
                    });
                    req.on('end',()=>{
                        let book = JSON.parse(str); // 字符串转成对象
                        read(function(books){
                            books = books.map(item=>{
                                if(item.bookId === id){
                                    return book;
                                }
                                return item; // 其他正常返回
                            });
                            write(books,function(){ // 数据写回到json中
                                res.end(JSON.stringify(book))
                            })
                        })
                    })
                }
            break;
            case 'DELETE':
                read(function(books){
                    books = books.filter(item=>item.bookId !== id);
                    write(books,function(){
                        res.end(JSON.stringify({})); //返回删除对象
                    })
                })
            break;
        }
        return
    };

    // 读取一个路径
    fs.stat('.'+pathname,function(err,stats){
        if(err){
            // res.statusCode = 404;
            // res.end('NOT FOUND')
            // 假如路径不对,按下回车的时候,就返回首页
            fs.createReadStream('index.html').pipe(res);
        }else{ 
            if(stats.isDirectory()){ // 如果是目录,需要处理一下
                let p = require('path').join('.'+pathname+'./index.html');
                fs.createReadStream(p).pipe(res);
            }else{
                fs.createReadStream('.'+pathname).pipe(res);
            }
        }
    })

}).listen(3000,"localhost",function(){

    console.log("开始监听...")});