import { useState } from 'react';
import { Send, Check, AlertCircle, Mail, MapPin, Clock } from 'lucide-react';
import Button from './Button';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMessage('Tutti i campi sono obbligatori.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      // Simulate API call to send message
      await new Promise(resolve => setTimeout(resolve, 1800));
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage('Si è verificato un errore durante l\'invio del messaggio. Riprova più tardi.');
    }
  };

  if (status === 'success') {
    return (
      <div className="contact-form-success animate-fade-in">
        <div className="success-icon-wrapper">
          <Check className="success-check-icon" size={32} />
        </div>
        <h3>Messaggio Inviato!</h3>
        <p>Grazie per avermi contattato. Risponderò al tuo messaggio il prima possibile, solitamente entro 48 ore.</p>
        <Button variant="primary" onClick={() => setStatus('idle')}>
          Invia un altro messaggio
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="contact-name">Nome</label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Il tuo nome"
            required
            disabled={status === 'sending'}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="la_tua@email.com"
            required
            disabled={status === 'sending'}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contact-subject">Oggetto</label>
        <input
          id="contact-subject"
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Come posso aiutarti?"
          required
          disabled={status === 'sending'}
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-message">Messaggio</label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Scrivi qui il tuo messaggio..."
          rows="6"
          required
          disabled={status === 'sending'}
        />
      </div>

      {status === 'error' && (
        <div className="contact-form-error">
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={status === 'sending'}
        className="contact-submit-button"
      >
        {status === 'sending' ? (
          <span className="sending-loader-text">Invio in corso...</span>
        ) : (
          <>
            <span>Invia Messaggio</span>
            <Send size={16} />
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
