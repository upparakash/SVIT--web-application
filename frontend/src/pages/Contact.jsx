import React from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'

const Contact = () => {
  return (
    <div className=" bg-gray-50 px-8 md:px-12 py-5">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-10 ">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* LEFT SIDE INFO */}
        <div className="space-y-10">

          {/* GET IN TOUCH */}
          <div className="border-gray-300 bg-white border rounded-xl p-5">
            <h3 className="text-xl font-semibold mb-5">Get In Touch</h3>

            <div className="space-y-4 text-gray-600">

              <div className="flex items-center gap-3">
                <Phone className="text-[#21808D]" />
                <p>+91 98765 43210</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-[#21808D]" />
                <p>info@svittech.com</p>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-[#21808D] mt-1" />
                <p>123 Tech Park, Electronic City, Bangalore, Karnataka 560100</p>
              </div>

            </div>
          </div>

          {/* BUSINESS HOURS */}
          <div className="border-gray-300 border bg-white rounded-xl p-5">
            <h3 className="text-xl font-semibold mb-5">Business Hours</h3>

            <div className="text-gray-600 space-y-1">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 1:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

        </div>

        {/* CONTACT FORM */}
        <form className="bg-white shadow-md p-8 rounded-xl space-y-5 border border-gray-200">

          <h3 className="text-xl font-semibold mb-3">Send Us a Message</h3>

          <div className="space-y-5">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input type="text" className="w-full mt-1 px-4 py-2 border rounded-md text-sm focus:ring-1 focus:ring-[#21808D]" />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input type="email" className="w-full mt-1 px-4 py-2 border rounded-md text-sm focus:ring-1 focus:ring-[#21808D]" />
            </div>

            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input type="text" className="w-full mt-1 px-4 py-2 border rounded-md text-sm focus:ring-1 focus:ring-[#21808D]" />
            </div>

            <div>
              <label className="text-sm text-gray-600">Subject</label>
              <select
                className="w-full mt-1 px-4 py-2 border rounded-md text-sm text-gray-600 focus:ring-1 focus:ring-[#21808D]"
              >
                <option  >Technical Support</option>
                <option>Sales Inquiry</option>
                <option>Partnership</option>
                <option>General Question</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">Message</label>
              <textarea
                rows="4"
                className="w-full mt-1 px-4 py-2 border rounded-md text-sm focus:ring-1 focus:ring-[#21808D]"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#21808D] text-white py-3 rounded-md hover:bg-[#1a676f] transition"
          >
            Send Message
          </button>

        </form>

      </div>
    </div>
  )
}

export default Contact
