import React, { useState, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
interface ContactFormValues {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const ContactCard = () => {
  const [formData, setFormData] = useState<ContactFormValues>({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/booking`, formData);

      Swal.fire({
        icon: "success",
        title: "Gửi thành công",
        text: "Chúng tôi sẽ liên hệ với bạn sớm!",
      });

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Đã xảy ra lỗi khi gửi thông tin. Vui lòng thử lại sau.",
      });
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 rounded-2xl min-h-screen">
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
            <form className="card-body" onSubmit={handleSubmit}>
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label className="label">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                className="input input-bordered"
                placeholder="Phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />

              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label className="label">Your message</label>
              <textarea
                name="message"
                placeholder="Message"
                className="textarea textarea-primary"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button type="submit" className="btn btn-neutral mt-4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
