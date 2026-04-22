import ContactForm from '../ContactForm';

function Contact() {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Contact</h1>
                <p className="page-subtitle">Lasa-mi un mesaj si iti voi raspunde cat de repede pot.</p>
            </div>
            <ContactForm />
        </div>
    );
}

export default Contact;
