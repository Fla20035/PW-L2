function Card(props) {
    return (
        <div className="card">
            {props.image && <img src={props.image} alt={props.title} className="card-image" />}
            
            <div className="card-content">
                <h2 className="card-title">{props.title}</h2>
                <h3 className="card-author">{props.name}</h3>
                <p className="card-description">{props.description}</p>
            </div>
        </div>
    );
}

export default Card;