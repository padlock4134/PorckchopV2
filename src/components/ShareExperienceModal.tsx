import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (experience: {
    recipeName: string;
    content: string;
    rating: number;
    images: string[];
  }) => void;
}

const ShareExperienceModal: React.FC<ShareExperienceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    recipeName: '',
    content: '',
    rating: 5,
    images: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error sharing experience:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageUrls = Array.from(files).map((file) => URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...imageUrls],
      }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Share Your Cooking Experience
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="recipeName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Recipe Name
                          </label>
                          <input
                            type="text"
                            id="recipeName"
                            value={formData.recipeName}
                            onChange={(e) =>
                              setFormData({ ...formData, recipeName: e.target.value })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="content"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Your Experience
                          </label>
                          <textarea
                            id="content"
                            rows={4}
                            value={formData.content}
                            onChange={(e) =>
                              setFormData({ ...formData, content: e.target.value })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-porkchop-500 focus:ring-porkchop-500 sm:text-sm"
                            placeholder="Share your cooking journey, tips, and tricks..."
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="rating"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Rating
                          </label>
                          <div className="mt-1 flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() =>
                                  setFormData({ ...formData, rating: star })
                                }
                                className="focus:outline-none"
                              >
                                <svg
                                  className={`h-6 w-6 ${
                                    star <= formData.rating
                                      ? 'text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="images"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Photos (Optional)
                          </label>
                          <input
                            type="file"
                            id="images"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="mt-1 block w-full text-sm text-gray-500
                              file:mr-4 file:py-2 file:px-4
                              file:rounded-full file:border-0
                              file:text-sm file:font-semibold
                              file:bg-porkchop-50 file:text-porkchop-700
                              hover:file:bg-porkchop-100"
                          />
                        </div>

                        {formData.images.length > 0 && (
                          <div className="grid grid-cols-2 gap-4">
                            {formData.images.map((image, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={image}
                                  alt={`Preview ${index + 1}`}
                                  className="rounded-lg object-cover h-32 w-full"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setFormData({
                                      ...formData,
                                      images: formData.images.filter((_, i) => i !== index),
                                    })
                                  }
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                  <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-porkchop-600 text-base font-medium text-white hover:bg-porkchop-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-porkchop-500 sm:ml-3 sm:w-auto sm:text-sm ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Sharing...' : 'Share Experience'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-porkchop-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShareExperienceModal; 