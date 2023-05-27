import React from 'react'

import './styles/Feed.scss';

import Header from './Header';
import CriarPublicacao from './CriarPublicacao';
import Publicacao from './Publicacao';

const Feed = () => {

	const storage = sessionStorage.getItem("logged");
	const api = JSON.parse(storage);

	return (
		<>
			<Header />
			
			<section className='feed'>
				<CriarPublicacao />	
				<Publicacao />

			</section>
		</>
	);
}

export default Feed;