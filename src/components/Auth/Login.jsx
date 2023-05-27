import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import './styles/container-form.scss';
import './styles/form.scss';

import eyeOpen from './images/icons/eye.svg';
import eyeClose from './images/icons/eye-close.svg';

import User from "./Controller/User";

export default function ContainerForm () {

    const [seePass,  setSeePass] = useState("password");

    const [alterarForm, setAlterarForm] = useState(true);
    const [dataLogin, setDataLogin] = useState({ login: '', password: '' });
    const [dataCadastro, setDataCadastro] = useState({ name: '', newlogin: '', newpassword: '', confirmpassword: '' });

    const navigate = useNavigate()

    const handleSubmitLogin = (e) => {        
        e.preventDefault(); 
        sessionStorage.clear();

        const error = document.querySelector(".error").style;
        
        User.Login(dataLogin).then(res => {  
            if(res.api) {
                sessionStorage.setItem("logged", JSON.stringify(res.user));               
                navigate('/feed');
            } else {
                error.display = "block";
                errors(error);
            }
        })
    }

    const handleSubmitCadastro = (e) => {
        e.preventDefault(); 
        
        const cadastrar = {
            name:  dataCadastro.name,
            newlogin: dataCadastro.newlogin,
            newpassword: dataCadastro.newpassword
        }

        const error = document.querySelector(".error2").style;
        
        if(dataCadastro.newpassword == dataCadastro.confirmpassword) {
            User.Cadastro(cadastrar).then(res => {  

                if(res.cadastro) {
                    alert("Usuário cadastrado com sucesso!");
                    setAlterarForm(!alterarForm);
    
                    setDataCadastro(obj => {
                                return {...obj, 
                                    name: '',
                                    newlogin: '',
                                    newpassword: '',
                                    confirmpassword: ''
                                }
                            })
    
                } else {
                    console.log(error);
                    errors(error);
                }
                
            })
        } else {
            error.display = 'block';
            errors(error);
        }
    }

    const errors = ($el) => {
        setTimeout(() => {
            $el.display = "none";
        }, 2000)
    }

    return (
        <>

            <div className="containerLogin">
                <div className="forms">
                    <div className="image-container"></div>

                    <div className="container-form">

                        <div className="bg-blur-form"></div>

                        <div className="logo-dv">
                            <h3>DevOn</h3>
                        </div>

                        {
                            alterarForm === true ? (
                                <>
                                    <form onSubmit={handleSubmitLogin} id="form" form="sign-in">
                                        <div className="container-campos">

                                            <div className="container-campos__campo">
                                                <label htmlFor="login" className="username-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgba(0, 0, 0, .7)" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                </svg>

                                                </label>
                                                <input 
                                                    type="text" 
                                                    className ="input-login" 
                                                    id="login" 
                                                    placeholder="login" 
                                                    maxLength="20" 
                                                    onChange={(e) => {
                                                        setDataLogin(obj => {
                                                            return {...obj, login: `${e.target.value}`}
                                                        })
                                                    }}
                                                    value={dataLogin.login}
                                                    required 
                                                />
                                            </div>

                                            <div className="container-campos__campo">
                                                <label htmlFor="password" className="password-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgba(0, 0, 0, .7)" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                                </svg>

                                                </label>
                                                <input
                                                    type={seePass}  
                                                    className ="input-pass" 
                                                    id="password" 
                                                    placeholder="password" 
                                                    maxLength="20" 
                                                    onChange={(e) => {
                                                        setDataLogin(obj => {
                                                            return {...obj, password: `${e.target.value}`}
                                                        })
                                                    }}
                                                    value={dataLogin.password}
                                                    required 
                                                />    
                                                {
                                                    seePass == "password" ? (
                                                        <img className="eye-password" src={eyeClose} onClick={() => setSeePass("text")} alt="icon-eye" />
                                                    ) : (
                                                        <img className="eye-password" src={eyeOpen} onClick={() => setSeePass("password")} alt="icon-eye" />
                                                    )
                                                }
                                            </div>

                                            <div className="container-campos__btn">
                                                <button
                                                    type="submit" 
                                                    className="btn-sign-in btn-submit btn-principal"
                                                >Sign in</button>
                                                <span>Don't have an account? <button type="button" onClick={() => setAlterarForm(!alterarForm)} className ="btn-sign-up btn-second">Sign up</button></span>
                                            </div>

                                            <div className="error">
                                                <p>Login ou senha incorretos!</p>
                                            </div>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <form onSubmit={handleSubmitCadastro} id="form" form="sign-up">
                                        <div className="container-campos">
                                            
                                            <div className="container-campos__campo">
                                                <label htmlFor="username" className="username-icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgba(0, 0, 0, .7)" className="w-6 h-6">
                                                    <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                                </svg>

                                                </label>
                                                <input 
                                                    type="text" 
                                                    className="input-name" 
                                                    id="username" 
                                                    placeholder="Your name" 
                                                    maxLength="20"
                                                    onChange={(e) => {
                                                        setDataCadastro(obj => {
                                                            return {...obj, name: `${e.target.value}`}
                                                        })
                                                    }}
                                                    value={dataCadastro.name}
                                                    required />
                                            </div>
                                            
                                            <div className="container-campos__campo">
                                                <label htmlFor="new-login" className="username-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgba(0, 0, 0, .7)" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                    </svg>
                                                </label>
                                                <input 
                                                    type="text" 
                                                    className="input-login" 
                                                    id="new-login" 
                                                    placeholder="new login" 
                                                    maxLength="20" 
                                                    onChange={(e) => {
                                                        setDataCadastro(obj => {
                                                            return {...obj, newlogin: `${e.target.value}`}
                                                        })
                                                    }}
                                                    value={dataCadastro.newlogin}
                                                    required />
                                            </div>

                                            <div className="container-campos__campo">
                                                <label htmlFor="new-password" className="password-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgba(0, 0, 0, .7)" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                                    </svg>
                                                </label>
                                                <input 
                                                    type="password" 
                                                    className="input-pass" 
                                                    id="new-password" 
                                                    placeholder="new password"
                                                    maxLength="20" 
                                                    onChange={(e) => {
                                                        setDataCadastro(obj => {
                                                            return {...obj, newpassword: `${e.target.value}`}
                                                        })
                                                    }}
                                                    value={dataCadastro.newpassword}
                                                    required 
                                                />    
                                            </div>

                                            <div className="container-campos__campo">
                                                <label htmlFor="confirmpassword" className="password-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgba(0, 0, 0, .7)" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                                    </svg>
                                                </label>
                                                <input 
                                                    type="password" 
                                                    className="input-pass"
                                                    id="confirmpassword" 
                                                    placeholder="confirm password" 
                                                    maxLength="20" 
                                                    onChange={(e) => {
                                                        setDataCadastro(obj => {
                                                            return {...obj, confirmpassword: `${e.target.value}`}
                                                        })
                                                    }}
                                                    value={dataCadastro.confirmpassword}
                                                    required 
                                                />    
                                            </div>

                                            <div className="container-campos__btn">
                                                <button type="submit" className="btn-sign-up btn-submit  btn-principal">Sign up</button>
                                                <span>Already have an account? <button type="button" onClick={() => setAlterarForm(!alterarForm)} className="btn-sign-in btn-second">Sign in</button></span>
                                            </div>

                                            <div className="error2">
                                                <p>Preencha os campos corretamente!</p>
                                            </div>
                                        </div>
                                    </form>
                                </>
                            )
                        }

                    </div>
                </div>
            </div>            
        </>
    );
}