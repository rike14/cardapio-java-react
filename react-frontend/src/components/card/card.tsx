import './card.css';

interface CardProps {
    title: string;
    image: string;
    price: number;
}

export function Card(props: CardProps) {
    return (
        <div className="card">
            <img src={props.image} alt={props.title} />
            <h2>{props.title}</h2>
            <p><b>$ {props.price}</b></p>
        </div>
    )
}