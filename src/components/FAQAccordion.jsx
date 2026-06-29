import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ 
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: '24px 0'
    }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          color: '#FFF',
          cursor: 'pointer',
          padding: 0,
          textAlign: 'left'
        }}
      >
        <span className="font-headline" style={{ fontSize: '20px', fontWeight: 500, color: isOpen ? 'var(--primary)' : '#FFF', transition: 'color 0.3s ease' }}>
          {question}
        </span>
        <motion.span 
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="material-symbols-outlined" 
          style={{ fontSize: '24px', color: 'var(--on-surface-variant)' }}
        >
          add
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="font-body text-on-surface-variant" style={{ paddingTop: '16px', lineHeight: 1.7, fontSize: '16px', maxWidth: '800px' }}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQAccordion = () => {
  const faqs = [
    {
      question: "How does the AI diagnostic process actually work?",
      answer: "When you book a service, our proprietary AI interfaces securely with your vehicle's telematics module over a 5G connection. It runs a deep-level scan comparing thousands of data points against manufacturer benchmarks, allowing our technicians to know exactly what needs fixing before they even touch the vehicle."
    },
    {
      question: "Are your technicians certified for all EV brands?",
      answer: "Yes. Our Master Technicians hold OEM certifications across all major EV brands, including Tesla, Rivian, Lucid, Porsche, and Audi. They undergo rigorous quarterly training on the latest high-voltage systems and proprietary software architectures."
    },
    {
      question: "What does the Luxe-Drive valet service include?",
      answer: "Luxe-Drive provides ultimate convenience. A professional valet will arrive at your home or office, perform a quick 360-degree digital inspection, take your vehicle to our Elite Hub, and return it fully charged, detailed, and serviced. You track the entire process via our app."
    },
    {
      question: "Do you use genuine OEM replacement parts?",
      answer: "Absolutely. We strictly source Tier-1 OEM (Original Equipment Manufacturer) parts. Whether it's a cabin air filter or a complex thermal management valve, your vehicle receives the exact same components installed at the factory."
    }
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: '#070707' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'left', marginBottom: '4rem' }}>
           <div className="font-mono text-primary" style={{ letterSpacing: '0.2em', marginBottom: '1rem', fontSize: '12px' }}>TECH SPECS & FAQ</div>
          <h2 className="font-headline" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.02em' }}>
            Frequently Asked Questions
          </h2>
        </div>
        
        <div>
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
