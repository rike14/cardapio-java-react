import { useEffect, useState } from 'react';
import './App.css';
import { Button } from './components/button/button';
import { Card } from './components/card/card';
import { Modal } from './components/card/modal/modal';
import { useProductData } from './hooks/useProductData';

export function App() {
  const { data } = useProductData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [showButton, setShowButton] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  }

  useEffect(() => {
    setShowButton(false);
    if(!token && !role) return;
    setToken(token)
    setRole(role)
    if(role === 'admin') setShowButton(true)
    
  }, [token, role, showButton]);

  return (
    <div className="container">
      <h1>Digital Menu</h1>
      {data?.length === 0 && <h2>No products available</h2>}
      <div className="card-grid">
        {data?.map(
          productData => 
          <Card 
            key={productData.id}
            id={productData.id ?? 0}
            title={productData.title}
            image={productData.image}
            price={productData.price}
          />)}
        {isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} />}
        <Button className={'btn-open-modal'} onClick={handleOpenModal} userState={showButton} title={'New Product'} />
      </div>
    </div>
  )
}

export default App
