"use client"

const ContactForm = ({ theme }: { theme: string }) => (
  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <input
        type="text"
        placeholder="YOUR NAME *"
        className={`w-full p-4 mb-6 border ${
          theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-800"
        } rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
        required
      />

      <input
        type="email"
        placeholder="YOUR EMAIL *"
        className={`w-full p-4 mb-6 border ${
          theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-800"
        } rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
        required
      />

      <input
        type="tel"
        placeholder="YOUR PHONE "
        className={`w-full p-4 mb-6 border ${
          theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-800"
        } rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
        
      />
    </div>

    <div>
      <textarea
        placeholder="YOUR MESSAGE *"
        rows={10}
        className={`w-full p-4 mb-6 border ${
          theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-purple-200 hover:bg-purple-300 text-gray-800"
        } rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
        required
      ></textarea>
    </div>
  </div>
)

export default ContactForm