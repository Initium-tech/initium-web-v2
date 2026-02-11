import React from 'react';
import ServicesComponent from '../components/Services';
import WebDesign from '../components/WebDesign';

const Services: React.FC = () => {
    return (
        <div className="pt-20 bg-deep-logic min-h-screen">
            <ServicesComponent />
            <WebDesign />
        </div>
    );
};

export default Services;
