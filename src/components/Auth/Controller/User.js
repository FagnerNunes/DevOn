import axios from "axios";

export default {
    Login (dataLogin) {
        return axios.post(`http://localhost/BackEnd/DevOn/Auth/sign-in.php`, dataLogin)
        .then(res => {            
           return res.data;
        }).catch(error => console.log(error.message));

    },

    Cadastro (dataCadastro) {
        return axios.post(`http://localhost/BackEnd/DevOn/Auth/sign-up.php`, dataCadastro)
        .then(res => {
            return res.data;
        }).catch(error => console.log(error));
    }
    
}