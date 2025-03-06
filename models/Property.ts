import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  neighborhood: { type: String },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  landArea: { type: Number },
  yearBuilt: { type: Number },
  type: { type: String, required: true },
  status: { 
    type: String, 
    required: true,
    enum: ['For Sale', 'For Rent', 'Sold']
  },
  featured: { type: Boolean, default: false },
  images: [{ type: String }],
  floorPlan: { type: String },
  video: { type: String },
  virtualTour: { type: String },
  amenities: {
    airConditioning: { type: Boolean, default: false },
    heating: { type: Boolean, default: false },
    internet: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    garden: { type: Boolean, default: false },
    pool: { type: Boolean, default: false },
    security: { type: Boolean, default: false },
    balcony: { type: Boolean, default: false },
    elevator: { type: Boolean, default: false },
    furnished: { type: Boolean, default: false },
    petFriendly: { type: Boolean, default: false },
    storage: { type: Boolean, default: false }
  },
  nearbyPlaces: {
    schools: { type: String },
    hospitals: { type: String },
    shopping: { type: String },
    restaurants: { type: String },
    transportation: { type: String },
    beach: { type: String }
  },
  contactInfo: {
    agentName: { type: String },
    agentPhone: { type: String },
    agentEmail: { type: String }
  },
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: String }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Property || mongoose.model('Property', PropertySchema); 