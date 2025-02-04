import React from 'react'

export const Instruction: React.FC = () => {
  return (
		<div className='instruction'>
			<ol>
				<li>откройте WhatsApp на своем телефоне</li>
				<li>Нажмите "Меню" Android или на IPhone</li>
				<li>
					Нажмите связанные устройства, затем связанные устройства
				</li>
				<li>
					Наведите телефон на этот экран, чтобы отсканировать QR-код
				</li>
			</ol>
		</div>
  );
}
