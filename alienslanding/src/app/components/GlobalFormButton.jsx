'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import SalesforceForm from './form'

const SalesforceModalTrigger = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      {/* Fixed vertical button */}
      <button
        onClick={openModal}
        className="fixed top-1/2 right-4 transform -translate-y-1/2 rotate-90 origin-right z-50 bg-[#c9a164] text-black font-semibold px-4 py-2 rounded-t-md shadow-md hover:bg-[#b8934d] transition"
      >
        Enquire Now
      </button>

      {/* Overlay + Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 flex items-center justify-center"
          onClick={closeModal} // Clicking anywhere closes modal
        >
          {/* Modal box */}
          <div
            className="bg-[#031c00] w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg p-6 relative z-50"
            onClick={(e) => e.stopPropagation()} // Prevent close on click inside modal
          >
            {/* Close icon */}
            <button
              className="absolute top-3 right-3 text-black hover:text-red-500"
              onClick={closeModal}
            >
              <X size={24} />
            </button>

            {/* Your form */}
            <SalesforceForm />
          </div>
        </div>
      )}
    </>
  )
}

export default SalesforceModalTrigger
