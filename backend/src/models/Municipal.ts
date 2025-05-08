import mongoose from 'mongoose';

// Typescript nterface to be used for our frontend
interface IMunicipal {
  section: string;
  chapter: string;
  title: string;
  full_text: string;
  summary: string;
  tags: string[];
}

// Schema that is imported into mongoDB
const municipalSchema = new mongoose.Schema<IMunicipal>({
  section: { type: String, required: true },
  chapter: { type: String, required: true },
  title: { type: String, required: true },
  full_text: { type: String, required: true },
  summary: { type: String, required: true },
  tags: [{ type: String }]
}, {
  collection: 'municipal'
});

// Creation of schema in the database
export const Municipal = mongoose.model<IMunicipal>('Municipal', municipalSchema); 