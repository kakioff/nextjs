let baseURL = '',
    env = process.env.NODE_ENV || 'development',
    inital: RequestsOptions = {
        method: 'POST',
        params: null,
        body: null,
        headers: {},
        cache: 'no-cache',
        credentials: 'include',
        responseType: 'JSON'
    };
switch (env) {
    case 'development':
        baseURL = 'http://localhost:8000';
        break;
    case 'production':
        baseURL = 'http://api.goodstuff.website';
        break;
}
function jsonToUrlParam(json: any) {
    return Object.keys(json).map(key => key + '=' + json[key]).join('&');
}
export default async function requests(url: string, config: RequestsOptions | null = null) {
    // init params
    if (typeof url !== 'string') throw new TypeError('url must be required and of string type');
    config = {
        ...inital,
        ...config
    }
    let {
        method,
        params,
        body,
        headers,
        cache,
        credentials,
        responseType
    } = config;

    // 处理URL：请求前缀 & 问号参数
    if (!/^http(s?):\/\//i.test(url)) url = baseURL + url;
    if (params != null) {
        url += `${url.includes('?') ? '&' : '?'}${jsonToUrlParam(params)}`;
    }

    // 根据自己的需求来:body传递的是普通对象，我们今天项目需要传递给服务器的是URLENCODED格式，我们才处理它的格式；如果用户传递的本身就不是普通对象(例如:文件流、字符串、FORM-DATA...)，还是以用户自己写的为主...
    if (body) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        body = jsonToUrlParam(body);
    } else if (typeof body === 'string') {
        try {
            // 是JSON字符串
            body = JSON.parse(body);
            headers['Content-Type'] = 'application/json';
        } catch (err) {
            // 不是JSON字符串:可以简单粗暴的按照URLECCODED格式字符串处理
            headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
    }

    // 类似于AXIOS中的请求拦截器，例如：我们每一次发请求都需要携带TOKEN信息
    let token = localStorage.getItem('token');
    if (token) headers['Authorization'] = token;

    // 把config配置成为fetch需要的对象
    config = {
        method: method?method.toUpperCase():"GET",
        headers,
        credentials,
        cache
    };
    if (/^(POST|PUT|PATCH)$/i.test(method||"GET") && body != null) config.body = body;

    // 发送请求
    let response = await fetch(url, config)
    let {
        status,
        statusText
    } = response;
    // .then(response => {
    // 只要状态码是以2或者3开始的，才是真正的获取成功
    if (status >= 200 && status < 400) {
        let result;
        if(!responseType) return response.json()
        switch (responseType.toUpperCase()) {
            case 'JSON':
                result = response.json();
                break;
            case 'TEXT':
                result = response.text();
                break;
            case 'BLOB':
                result = response.blob();
                break;
            case 'ARRAYBUFFER':
                result = response.arrayBuffer();
                break;
        }
        return result;
    }
    return {
        code: 'STATUS ERROR',
        status,
        statusText
    };
    // }).catch(reason => {
    //     if (reason && reason.code === 'STATUS ERROR') {
    //         // @1 状态码错误
    //         switch (reason.status) {
    //             case 400:
    //                 // ...
    //                 break;
    //             case 401:
    //                 // ...
    //                 break;
    //             case 404:
    //                 // ...
    //                 break;
    //         }
    //     } else if (!navigator.onLine) {
    //         // @2 网络中断
    //         // ...
    //     } else {
    //         // @3 请求被终止
    //         // ...
    //     }
    //     return Promise.reject(reason);
    // });
    // return data
};
