"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { 
  FaCar, 
  FaCamera, 
  FaDollarSign, 
  FaTools, 
  FaChartLine, 
  FaFileAlt, 
  FaCalculator, 
  FaUpload, 
  FaTrash, 
  FaSave, 
  FaCheck, 
  FaTimes,
  FaImage,
  FaMoneyBillWave,
  FaLightbulb,
  FaRegLightbulb,
  FaSearch,
  FaStar
} from 'react-icons/fa';

const SellPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carBrand: '',
    carModel: '',
    carYear: '',
    carMileage: '',
    carCondition: 'excellent',
    askingPrice: '',
    description: '',
    images: [] as File[]
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [savedDraft, setSavedDraft] = useState(false);
  const [formDataHistory, setFormDataHistory] = useState<Array<typeof formData>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value
    };
    setFormData(newFormData);
    
    // Auto-save to localStorage
    localStorage.setItem('carSellDraft', JSON.stringify(newFormData));
    setSavedDraft(true);
    setTimeout(() => setSavedDraft(false), 2000);
  };

  const loadDraft = () => {
    const saved = localStorage.getItem('carSellDraft');
    if (saved) {
      const draftData = JSON.parse(saved);
      setFormData(draftData);
      setSavedDraft(true);
      setTimeout(() => setSavedDraft(false), 2000);
    }
  };

  const calculateProgress = () => {
    const fields = ['name', 'email', 'phone', 'carBrand', 'carModel', 'carYear', 'carMileage', 'carCondition', 'askingPrice', 'description'];
    const filledFields = fields.filter(field => formData[field as keyof typeof formData] && formData[field as keyof typeof formData] !== '');
    return Math.round((filledFields.length / fields.length) * 100);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);
      processFiles(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFiles = (files: File[]) => {
    // Validate files (max 10, images only, max 5MB each)
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      const invalidFiles = files.filter(file => !validFiles.includes(file));
      alert(`Some files were invalid:\n${invalidFiles.map(f => `- ${f.name} (${f.type}, ${(f.size / 1024 / 1024).toFixed(2)}MB)`).join('\n')}\n\nPlease upload only images (JPG, PNG, WebP) under 5MB each.`);
      return;
    }

    if (formData.images.length + validFiles.length > 10) {
      alert('Maximum 10 images allowed. Please remove some images first.');
      return;
    }

    setFormData({
      ...formData,
      images: [...formData.images, ...validFiles]
    });
    
    // Create image previews
    const previews = validFiles.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages
    });
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      alert('Your car listing has been submitted! We will contact you within 24 hours.');
      setIsSubmitting(false);
      router.push('/');
    }, 2000);
  };

  
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 bg-black text-white overflow-hidden">
        <ParticlesBackground />
        < <div className="flex items-center justify-center mb-6">
            <FaCar className="text-sky-400 text-6xl mr-4" />
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white">
              Sell Your <span className="text-sky-400">Car</span>
            </h1>
          </div>
          <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto font-medium">
            List your vehicle on our platform and reach thousands of potential buyers across Cameroon.
          </p>
        </div>
      </section>

      {/* Header */}
      <div className="bg-white shadow-sm relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-black">Sell Your Car</h1>
          <p className="text-gray-600 mt-2">List your vehicle on our platform and reach thousands of potential buyers</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Progress Bar */}
        <div className="mb-6 bg-white/10 backdrop-blur-xl rounded-lg p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-black flex items-center">
              <FaChartLine className="mr-2 text-sky-400" />
              Listing Progress
            </h3>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={loadDraft}
                className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-sm hover:bg-white/30 transition-all duration-300 flex items-center"
              >
                <FaSave className="mr-2" />
                Load Draft
              </button>
              {savedDraft && (
                <span className="text-green-500 text-sm flex items-center">
                  <FaCheck className="mr-1" />
                  Draft Saved
                </span>
              )}
            </div>
          </div>
          
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs text-white/80">
            <div className="text-center">
              <div className="text-2xl font-bold text-black">{calculateProgress()}%</div>
              <div>Complete</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black">
                {Object.values(formData).filter(val => val !== '').length}/10 fields
              </div>
              <div>Fields Filled</div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none text-white backdrop-blur-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                    placeholder="+237 677 889 900"
                  />
                </div>
              </div>
            </div>

            {/* Car Information */}
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Vehicle Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <input
                    type="text"
                    name="carBrand"
                    value={formData.carBrand}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                    placeholder="Toyota"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                  <input
                    type="text"
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                    placeholder="Camry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <input
                    type="number"
                    name="carYear"
                    value={formData.carYear}
                    onChange={handleChange}
                    required
                    min="1990"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                    placeholder="2022"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mileage (km)</label>
                  <input
                    type="number"
                    name="carMileage"
                    value={formData.carMileage}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                    placeholder="50000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select
                    name="carCondition"
                    value={formData.carCondition}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Asking Price (FCFA)</label>
                  <input
                    type="number"
                    name="askingPrice"
                    value={formData.askingPrice}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                    placeholder="5000000"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                placeholder="Describe your car's features, maintenance history, and any special details..."
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Upload Images</label>
              
              {/* Drag & Drop Zone */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 ${
                  isDragging 
                    ? 'border-sky-400 bg-sky-400/10' 
                    : 'border-white/30 bg-white/5 hover:bg-white/10'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="text-center">
                  <FaUpload className="w-12 h-12 mx-auto mb-4 text-white/50" />
                  <p className="text-lg font-medium text-white/80 mb-2">
                    {isDragging ? 'Drop your images here' : 'Drag & drop images here'}
                  </p>
                  <p className="text-sm text-white/60">or</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
                    className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-transparent outline-none text-white backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
                  >
                    <FaImage className="mr-2" />
                    Browse Files
                  </button>
                </div>
                
                {/* Image Previews */}
                {imagePreviews.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium text-white/80">
                        {formData.images.length} / 10 images uploaded
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, images: [] });
                          setImagePreviews([]);
                        }}
                        className="text-sm text-red-400 hover:text-red-300 transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square overflow-hidden rounded-lg border-2 border-white/30 bg-white/10">
                            <img 
                              src={preview} 
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            
                            {/* Image Info Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-2 left-2 right-2 text-white text-xs">
                                {formData.images[index] && (
                                  <div className="flex items-center space-x-2">
                                    <span>{(formData.images[index] as File).name}</span>
                                    <span className="text-white/70">
                                      ({((formData.images[index] as File).size / 1024 / 1024).toFixed(1)}MB)
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Remove Button */}
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform hover:scale-110"
                            >
                              <FaTimes className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-4 p-4 bg-white/10 rounded-lg border border-white/20">
                  <h4 className="text-sm font-medium text-white/80 mb-2 flex items-center">
                    <FaCamera className="mr-2" />
                    Upload Guidelines
                  </h4>
                  <ul className="text-xs text-white/60 space-y-1">
                    <li className="flex items-center">
                      <FaCheck className="mr-1 text-green-400" />
                      Maximum 10 images per listing
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="mr-1 text-green-400" />
                      Each image must be under 5MB
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="mr-1 text-green-400" />
                      Supported formats: JPG, PNG, WebP
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="mr-1 text-green-400" />
                      Recommended: Front view, back view, interior, engine, odometer
                    </li>
                    <li className="flex items-center">
                      <FaCheck className="mr-1 text-green-400" />
                      High quality images get more views
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-lg hover:from-sky-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-sky-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Listing'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Enhanced Features Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pricing Tips */}
            <div className="bg-white/10 backdrop-blur-xl rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                <FaMoneyBillWave className="mr-2 text-sky-400" />
                Pricing Tips
              </h3>
              <ul className="text-sm text-black space-y-2">
                <li className="flex items-start">
                  <FaSearch className="mr-2 mt-1 text-sky-400 flex-shrink-0" />
                  Research similar vehicles in your area
                </li>
                <li className="flex items-start">
                  <FaLightbulb className="mr-2 mt-1 text-sky-400 flex-shrink-0" />
                  Set competitive prices for quick sales
                </li>
                <li className="flex items-start">
                  <FaChartLine className="mr-2 mt-1 text-sky-400 flex-shrink-0" />
                  Consider market demand and seasonality
                </li>
                <li className="flex items-start">
                  <FaRegLightbulb className="mr-2 mt-1 text-sky-400 flex-shrink-0" />
                  Be open to reasonable offers
                </li>
                <li className="flex items-start">
                  <FaDollarSign className="mr-2 mt-1 text-sky-400 flex-shrink-0" />
                  Include all costs in your asking price
                </li>
              </ul>
            </div>

            {/* Photo Guidelines */}
            <div className="bg-white/10 backdrop-blur-xl rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                <FaCamera className="mr-2 text-sky-400" />
                Best Photo Practices
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="text-sm text-black">
                  <h4 className="font-medium mb-2 flex items-center">
                    <FaCar className="mr-2 text-sky-400" />
                    Exterior Shots
                  </h4>
                  <p>Front, back, sides, and all angles in good lighting</p>
                </div>
                <div className="text-sm text-black">
                  <h4 className="font-medium mb-2 flex items-center">
                    <FaImage className="mr-2 text-sky-400" />
                    Interior Photos
                  </h4>
                  <p>Dashboard, seats, trunk space, and special features</p>
                </div>
                <div className="text-sm text-black">
                  <h4 className="font-medium mb-2 flex items-center">
                    <FaTools className="mr-2 text-sky-400" />
                    Technical Details
                  </h4>
                  <p>Engine bay, odometer, tires, and undercarriage</p>
                </div>
                <div className="text-sm text-black">
                  <h4 className="font-medium mb-2 flex items-center">
                    <FaFileAlt className="mr-2 text-sky-400" />
                    Documentation
                  </h4>
                  <p>Service records, registration papers, and manuals</p>
                </div>
              </div>
            </div>

            {/* Selling Tools */}
            <div className="bg-white/10 backdrop-blur-xl rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
                <FaTools className="mr-2 text-sky-400" />
                Selling Tools
              </h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-black hover:bg-white/30 transition-all duration-300 flex items-center justify-center">
                  <FaCalculator className="mr-2" />
                  Price Calculator
                </button>
                <button className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-black hover:bg-white/30 transition-all duration-300 flex items-center justify-center">
                  <FaFileAlt className="mr-2" />
                  Description Template
                </button>
                <button className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-black hover:bg-white/30 transition-all duration-300 flex items-center justify-center">
                  <FaChartLine className="mr-2" />
                  Market Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
