import React, { useState } from 'react';
import Footer from '../components/Footer';
import './Pages.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showHelp, setShowHelp] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="page-container">
        <div className="contact-section">
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-subtitle">
            I'd love to hear from you!
          </p>

          <div className="contact-info-simple">
            <form className="contact-form-card" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
                <button
                  type="button"
                  className="help-toggle-btn"
                  onClick={() => setShowHelp((prev) => !prev)}
                >
                  {showHelp ? 'Hide Help' : 'Show Help'}
                </button>
              </div>

              {showHelp && (
                <p className="help-tooltip">
                  Tip: Please include a short description of your project or inquiry.
                </p>
              )}
            </form>

            <div className="info-item-large">
              <h3>📧 Email</h3>
              <p>
                <a href="mailto:dipak7005@gmail.com">dipak7005@gmail.com</a>
              </p>
            </div>
            <div className="info-item-large">
              <h3>📱 Phone</h3>
              <p>
                <a href="tel:+919876543210">+91 9876543210</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
