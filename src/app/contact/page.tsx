"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../../../components/navbar";
import { Mail, Send, User, MessageCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill in all fields.");
      setIsSending(false);
      return;
    }

    try {
      const response = await emailjs.send(
        'service_n6idzql', 
        'template_oh0e9hc', 
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'oYjwPyaSfojAx10mr' 
      );
      console.log("Email sent successfully:", response);
      setSuccessMessage("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-blue-500 rounded-full opacity-5 animate-pulse" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-green-500 rounded-full opacity-5 animate-pulse" style={{animationDelay: '6s'}}></div>
        </div>

        <div className="relative z-10 py-20 px-4">
          {/* Header Section */}
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-fade-in">
              Let's Talk
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 animate-expand"></div>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed animate-fade-in-up" style={{animationDelay: '300ms', animationFillMode: 'both'}}>
              Have a big idea or project? I'd love to help bring your vision to life. Let's create something amazing together.
            </p>
          </div>

          {/* Main Content */}
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              
              {/* Contact Info Section */}
              <div className="space-y-8 animate-fade-in-up" style={{animationDelay: '400ms', animationFillMode: 'both'}}>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
                  <h2 className="text-2xl font-bold mb-6 text-white">Get In Touch</h2>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    Ready to discuss your next project or just want to say hello? I'm always excited to connect with fellow creators and innovators.
                  </p>
                  
                  {/* Contact Item */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-xl hover:bg-gray-700/30 transition-colors duration-300 group">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Email</h3>
                      <p className="text-gray-400">owaisiqbak2021@gmail.com</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-xl p-6 border border-purple-500/20">
                    <div className="bg-purple-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <User className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Quick Response</h3>
                    <p className="text-gray-400 text-sm">I'll get back to you within 24 hours</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-pink-900/20 to-pink-800/10 rounded-xl p-6 border border-pink-500/20">
                    <div className="bg-pink-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                      <MessageCircle className="h-6 w-6 text-pink-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Let's Collaborate</h3>
                    <p className="text-gray-400 text-sm">Open to exciting opportunities</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="animate-fade-in-up" style={{animationDelay: '600ms', animationFillMode: 'both'}}>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
                  <h2 className="text-2xl font-bold mb-6 text-white">Send Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-gray-300 font-medium">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="w-full bg-gray-800/50 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-gray-300 font-medium">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full bg-gray-800/50 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-gray-300 font-medium">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-gray-300 font-medium">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        rows={6}
                        className="w-full bg-gray-800/50 border border-gray-600 rounded-xl py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSending}
                      className="group relative w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <Send className="h-5 w-5" />
                        <span>{isSending ? "Sending..." : "Send Message"}</span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </form>
                  
                  {successMessage && (
                    <div className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
                      <p className="text-green-400 text-center">{successMessage}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes expand {
            from { width: 0; }
            to { width: 96px; }
          }
          
          .animate-fade-in {
            animation: fade-in 0.8s ease-out;
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out;
          }
          
          .animate-expand {
            animation: expand 1s ease-out 0.5s both;
          }
        `}</style>
      </div>
    </>
  );
};

export default Contact;