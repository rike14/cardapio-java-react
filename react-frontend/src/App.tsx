import { useState } from 'react';
import './App.css';
import { Card } from './components/card/card';
import { Modal } from './components/card/modal/modal';
import { useProductData } from './hooks/useProductData';

export function App() {
  const { data } = useProductData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useState(localStorage.getItem('token'));
  const type = useState(localStorage.getItem('type'));

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  }

  return (
    <div className="container">
      <h1>Digital Menu</h1>
      {data?.length === 0 && <h2>No products available</h2>}
      <div className="card-grid">
        {data?.map(
          productData => 
          <Card 
            key={productData.id}
            title={productData.title}
            image={productData.image}
            price={productData.price}
          />)}
        {isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} />}
        {token[0] && type[0] === 'admin' && <button className='btn-open-modal' onClick={handleOpenModal}>New product</button>}
      </div>
    </div>
  )
}

export default App
