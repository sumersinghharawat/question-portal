import axios from "axios";


axios.interceptors.request.use((req)=>{
    let m = window.location.href;
    let str = !!~m.indexOf('admin');

    var access_token = localStorage.getItem("user_token");
    var admin_access_token = localStorage.getItem("admin_token");

    if(str){
        req.headers = {
            'Authorization': `${admin_access_token}`
        }
    }else{
        req.headers = {
            'Authorization': `${access_token}`
        }
    }
    return req;

});

axios.interceptors.response.use((res)=>{
    return res;
});

export default class RequestService{

    getRequest(url){
        return axios.get('https://trivia.mrmagee.com/api/'+url);
    }

    postRequest(url,data){
        return axios.post('https://trivia.mrmagee.com/api/'+url,data);
    }

    DeleteRequest(url){
        return axios.delete('https://trivia.mrmagee.com/api/'+url);
    }

    PatchRequest(url){
        return axios.patch('https://trivia.mrmagee.com/api/'+url);
    }

    loginedIn(){
        return localStorage.getItem('user_token')?true:false;
    }

    loginedInAdmin(){
        return localStorage.getItem('admin_token')?true:false;
    }
}

