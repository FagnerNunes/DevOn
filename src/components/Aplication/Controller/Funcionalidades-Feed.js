import axios from "axios";

export default {

    newpost(dataPost) {
        console.log(dataPost.img)
        return axios.post('http://localhost/BackEnd/DevOn/post/newpost.php', dataPost, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Content-Type": "application/json",
            },
        })
        .then(res => {
            return res;
        }).catch(error => console.log('Erro: ' + error))
    },
}   