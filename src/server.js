import axios from 'axios';

const url = 'http://localhost:3000/';

class Server{

    // get Posts
    static getPosts(){
        return new Promise(async (resolve, reject) => {
            try{
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                )
            }catch(err){
                reject(err)
            }
        })
    }

    // create Posts
    static insertPost(text1, text2, text3, text4, active, upset, hostile, inspired, ashamed, alert, determined, nervous, attentive, afraid){
        return axios.post(url, {
            lat: text1,
            lng: text2,
            pa: text3,
            na: text4,
            active: active,
            upset: upset, 
            hostile: hostile,
            inspired: inspired,
            ashamed: ashamed,
            alert: alert,
            nervous: nervous,
            determined: determined,
            attentive: attentive,
            afraid: afraid
        })
    }

    // delete Posts
    static deletePost(id){
        return axios.delete(`${url}${id}`)
    }
}
 
export default Server;
