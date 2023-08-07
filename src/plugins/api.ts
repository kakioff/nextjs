import requests from "./apis/request"
interface ApiList {
    requests: Function,
    index(): Promise<object>
}

async function index(){
    let data = await requests("/", {
        method: "GET"
    })
    return data
    
}
const Apis:ApiList = {
    "requests": requests,
    "index": index
}
export default Apis

