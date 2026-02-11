import React from 'react';
import ContactForm from '../components/ContactForm';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
    // ContactForm handles most of its own UI, but we wrap it in a page container
    // The language context is accessible inside ContactForm as well if updated
    return (
        <div className="pt-20 min-h-screen bg-deep-logic">
            <ContactForm />
        </div>
    );
};

export default Contact;
