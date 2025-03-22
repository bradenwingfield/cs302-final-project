import mongoose from 'mongoose';

const CaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String },
  full_text: { type: String },
  tags: [String],
  embedding: [Number],
  source_url: String,
  last_updated: { type: Date, default: Date.now },
});

export const Case = mongoose.model('Case', CaseSchema);
