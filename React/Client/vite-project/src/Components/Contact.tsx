import React, { useState } from 'react';

const ContactForm: React.FC = () => {
     const [name, setName] = useState<string>('');
     const [email, setEmail] = useState<string>('8578397@gmail.com');
     const [message, setMessage] = useState<string>('');

     const openEmailDraft = () => {
         const subject = encodeURIComponent('Contact Form Submission');
         const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
         const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
         window.location.href = mailtoLink;
     };

     const handleSubmit = (event: React.FormEvent) => {
         event.preventDefault();
         openEmailDraft(); // פותח טיוטת מייל
         setName('');
         setEmail('');
         setMessage('');
     };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>


        {/* <a href={`mailto:8579678@gmail.com?subject=${encodeURIComponent('שאלה למורה')}&body=${encodeURIComponent('תוכן גוף ההודעה')}`}>שלח מייל עם נושא ותוכן</a> */}
             <div>
                 <label htmlFor="email">Email:</label>
                 <input
                     type="email"
                     id="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                 />
             </div>
             <div>
                 <label htmlFor="message">Message:</label>
                 <textarea
                     id="message"
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                     required
                 />
             </div>
             <button type="submit">Submit</button>
         </form>
    );
};

export default ContactForm;
