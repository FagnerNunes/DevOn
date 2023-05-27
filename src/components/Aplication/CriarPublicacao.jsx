import React, { useState } from 'react'
import FuncionalidadesFeed from './Controller/Funcionalidades-Feed';

function CriarPublicacao() {

    const [seeModal, setSeeModal] = useState(false);

    const storage = sessionStorage.getItem("logged");
	const api = JSON.parse(storage);

    const [dataPost, setDataPost] = useState(
        {messagePost: '', img: null}
    )

    const publicPost = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", dataPost.img);

        
        const datapost = {
            id_user: api.id,
            name: api.user_name,
            message: dataPost.messagePost,
            img: dataPost.img
        }
        
        if(dataPost.messagePost != '' && dataPost.img != null) {
            
            FuncionalidadesFeed.newpost(datapost)
            .then(res => {
                console.log(res.data)
            })
        }
    }

  return (
    <>
        <button className='btn-criar-publicacao' onClick={() => setSeeModal(!seeModal)}>
            Criar Publicação
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
        </button>

        {
            seeModal === true && (
                <div className="container-modal">
                    
                    <form className="modal" onSubmit={publicPost}>
                        <svg onClick={() => setSeeModal(!seeModal)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 close">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>



                        <p className="usuario">De: {api.user_name}</p>

                        <textarea cols="20" rows="5" placeholder='Digite sua mensagem aqui' onChange={(e) => setDataPost(obj => {
                            return {...obj, messagePost: e.target.value}
                        })}></textarea>

                        <label htmlFor="imagem" id='img' className={dataPost.img != null ? 'file' : 'notFile'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                            </svg>

                            <input 
                                type='file'
                                name='file'
                                id='imagem'
                                accept='image/png, image/jpeg'
                                onChange={(e) => setDataPost(obj => {
                                    return {...obj, img: e.target.files[0]}
                                })}
                            />
                        </label>

                        <button type='submit'>Publicar</button>

                    </form>
                </div>
            )
        }
    </>
  )
}

export default CriarPublicacao;