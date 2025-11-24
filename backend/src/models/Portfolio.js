import mongoose from 'mongoose';

const SkillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ["Beginner", "Intermediate", "Advanced", "Expert"], required: true },
  version: { type: String }
});

const SkillsSchema = new mongoose.Schema({
  frontend: [SkillItemSchema],
  backend: [SkillItemSchema],
  devops: [SkillItemSchema],
  other: [SkillItemSchema]
});

const portfolioSchema = new mongoose.Schema({
  about: {
    name: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, required: true },
    profileImage: { type: String }, // URL
    resumeLink: { type: String },
    location: { type: String },
    lookingFor: { type: String },
    availability: { type: String },
    highlights: { type: [String] },
    tagline: { type: String },
    experienceStartDate: { type: String },
    languagesSpoken: { type: [String] },
    preferredWorkType: { type: [String] }
  },

  skills: SkillsSchema,

  projects: [
    {
      title: String,
      description: String,
      detailedDescription: String,
      role: String,
      duration: String,
      teamSize: String,
      keyFeatures: [String],
      challenges: String,
      impact: String,
      category: String,
      status: String,
      videoDemo: String,
      techStack: [String],
      githubLink: String,
      liveDemo: String,
      image: String
    }
  ],

  experience: [
    {
      company: String,
      position: String,
      startDate: String,
      endDate: String,
      description: String
    }
  ],

  education: [
    {
      institution: String,
      degree: String,
      startYear: String,
      endYear: String
    }
  ],

  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    instagram: String,
    email: String,
    resumeLink: String
  },

  contact: {
    phone: String,
    email: String,
    address: String
  }
}, { timestamps: true });

export default mongoose.model('Portfolio', portfolioSchema);
