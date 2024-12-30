import './App.css';
import { Card } from './components/card/card';
import { useProductData } from './hooks/useProductData';

function App() {
  const { data } = useProductData();

  return (
    <div className="container">
      <h1>Cardápio Digital</h1>
      <div className="card-grid">
        {data?.map(
          productData => 
          <Card 
            key={productData.id}
            title={productData.title}
            image={productData.image}
            price={productData.price}
          />)}
        <Card 
          title="Desserts"
          image="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          price={5}
        />
        <Card 
          title="Desserts"
          image="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          price={5}
        />
        <Card 
          title="Desserts"
          image="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          price={5}
        />
        <Card 
          title="Desserts"
          image="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          price={5}
        />
        <Card 
          title="Desserts"
          image="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          price={5}
        />
      </div>
    </div>
  )
}

export default App
