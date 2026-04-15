import ContactForm from '../ContactForm';

function Contact() {
    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Hai să vorbim</h1>
                <p className="page-subtitle">Lasă-mi un mesaj și îți voi răspunde cât de repede pot.</p>
            </div>
            <ContactForm />
        </div>
    );
}

export default Contact;