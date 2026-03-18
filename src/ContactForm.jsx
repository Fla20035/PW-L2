import { useState } from "react";
import "./ContactForm.css";

function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [feedback, setFeedback] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // opreste refresh-ul paginii la submit

        if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
            setFeedback("Completeaza toate campurile!");
        } else {
            setFeedback("Multumim, " + name + "!");
            setName(""); setEmail(""); setMessage(""); // golim campurile dupa submit
        }
    };

    return (
        <div className="contact-section">
            <h3 className="contact-title">Contact</h3>
            
            <form onSubmit={handleSubmit} className="contact-form">
                
                <input 
                    type="text" 
                    placeholder="Numele tau" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="contact-input"
                />

                <input 
                    type="email" 
                    placeholder="Adresa de email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="contact-input"
                />

                <textarea 
                    placeholder="Scrie mesajul tau aici..." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    className="contact-textarea"
                    rows="4"
                />

                <button type="submit" className="primary-btn">Trimite</button>
            </form>

            {feedback && (
                <p className={`feedback-text ${feedback.includes("Multumim") ? "success" : "error"}`}>
                    {feedback}
                </p>
            )}
        </div>
    );
}

export default ContactForm;