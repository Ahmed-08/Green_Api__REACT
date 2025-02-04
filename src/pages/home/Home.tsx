import React from 'react'
import { Aside } from '../../components/aside/Aside'
import { ChatBlock } from '../../components/chatblock/ChatBlock'
import './home.scss'
import { useSelector } from 'react-redux'

export const Home: React.FC = () => {

  const [numberPhone, setNumberPhone] = React.useState<string>('');
  

  return (
		<div className="home">
			<div className="container">
				<Aside setNumberPhone={setNumberPhone} />
				<ChatBlock numberPhone={numberPhone} />
			</div>
		</div>
  );
}
