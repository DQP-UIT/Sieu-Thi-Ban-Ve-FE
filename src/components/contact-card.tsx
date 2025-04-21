import React from 'react'

const ContactCard = () => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Contact us now!</h1>
            <p className="py-6">
              Ready to bring your dream home to life? Contact us today to
              discuss your ideas and requirements. Our team of experts is here
              to provide you with personalized house design blueprints tailored
              to your vision. Let’s work together to create a space that
              perfectly suits your style and needs. Reach out now and start your
              journey toward the perfect home!
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" />
                <label className="fieldset-label">Your message</label>
                <textarea
                  name="message"
                  placeholder="Message"
                  className="textarea textarea-primary"
                  required
                />
                <button className="btn btn-neutral mt-4">Submit</button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactCard