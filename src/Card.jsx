function Card (props) {
    return (
        <div className="card">
            {props.image && <img src={props.image} alt="dumb cat" />}
            <h2>{props.title}</h2>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
        </div>
    );
}

export default Card;