'use client'

import { useState, useEffect } from "react"

export default function WhatsAppBubble() {
  const [isVisible, setIsVisible] = useState(false)
  //const [isHovered, setIsHovered] = useState(false) // Removed as per update

  // Show bubble after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <a
      href="https://wa.me/542645724251" // Replace with your number
      target="_blank"
      rel="noopener noreferrer"
      className={`
        fixed bottom-4 right-4 
        flex items-center justify-center
        w-12 h-12
        bg-[#25D366] hover:bg-[#128C7E]
        rounded-full shadow-md
        transition-all duration-300 ease-in-out
        ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
      `}
      aria-label="Chat on WhatsApp"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 175.216 175.552"
        className="w-7 h-7 fill-white"
      >
        <path d="M89.134,0.091C40.138,0.091,0.093,40.138,0.093,89.134c0,19.276,6.196,37.137,16.688,51.66L0.637,175.552 l35.829-15.949c13.725,9.309,30.317,14.771,48.134,14.771c48.996,0,89.043-40.047,89.043-89.043 C173.643,40.138,133.596,0.091,89.134,0.091z M89.134,156.334c-14.688,0-28.341-4.338-39.789-11.798l-27.804,12.371l12.371-27.803 c-7.46-11.449-11.798-25.102-11.798-39.789c0-40.047,32.527-72.574,72.574-72.574s72.574,32.527,72.574,72.574 S129.181,156.334,89.134,156.334z M127.538,107.724c-2.171-1.085-12.856-6.34-14.856-7.083c-2-0.743-3.457-1.114-4.914,1.114 c-1.457,2.229-5.657,7.083-6.942,8.541c-1.285,1.457-2.571,1.643-4.743,0.557c-2.171-1.085-9.166-3.379-17.458-10.767 c-6.455-5.756-10.81-12.856-12.095-15.027c-1.285-2.171-0.137-3.346,0.967-4.429c0.991-0.971,2.2-2.543,3.3-3.814 c1.1-1.271,1.464-2.171,2.196-3.628c0.733-1.457,0.367-2.743-0.183-3.828c-0.549-1.085-4.914-11.855-6.742-16.226 c-1.828-4.371-3.685-3.779-4.971-3.851c-1.285-0.073-2.757-0.088-4.214-0.088s-3.857,0.549-5.857,2.721 c-2,2.171-7.637,7.455-7.637,18.184s7.82,21.087,8.92,22.544c1.1,1.457,15.494,23.673,37.537,33.188 c5.229,2.257,9.314,3.607,12.494,4.621c5.249,1.666,10.027,1.428,13.802,0.867c4.208-0.628,12.856-5.257,14.684-10.341 c1.828-5.084,1.828-9.441,1.279-10.341C131.179,109.367,129.722,108.824,127.538,107.724z"/>
      </svg>
    </a>
  )
}

