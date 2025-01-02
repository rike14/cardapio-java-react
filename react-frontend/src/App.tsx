import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { Card } from './components/card/card';
import { Modal } from './components/card/modal/modal';
import { useProductData } from './hooks/useProductData';

function App() {
  const { data } = useProductData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  }

  return (
    <div className="container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        pauseOnFocusLoss={false}
        pauseOnHover
        theme="dark"
      />
      <h1>Digital Menu</h1>
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
        <button className='btn-open-modal' onClick={handleOpenModal}>New product</button>
      </div>
    </div>
  )
}

export default App
