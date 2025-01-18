'use client'

import { useState } from 'react'
import axios from 'axios'

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  // Submit form data
  const submit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://backend-one-brown-50.vercel.app/contact", form);
      alert('Message sent successfully');
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      alert('Error sending message');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Contact Us</h2>
        <p className="mt-2 text-lg/8 text-gray-600">Feel free to send us your message and we will get back to you as soon as possible.</p>
      </div>
      <form onSubmit={submit} method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm/6 font-semibold text-gray-900">
              Name
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleInputChange}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-900">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleInputChange}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            disabled={loading}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}
