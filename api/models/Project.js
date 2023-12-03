import mongoose, { Schema } from "mongoose";

const Project = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    default: Date.now(),
  },
  deadline: {
    type: String,
  },
  price: { type: String },
  avans:{type: String},
  dataAvans:{type: String},
  items: [
    new Schema({
      name: { type: String },
      stage: { type: String },
      price: { type: String },
      materiale: [
        new Schema({
            tip: {type: String},
            suprafata: {type: String},
            cod: {type: String},
            comandat: {type: Boolean, default: false},
        })
      ],
      accesorii: [
        new Schema({
            nume: {type: String},
            numar: {type: String},
            pret: {type: String},

        })
      ]
    }),
  ],
  progress: {
    type: String,
  },
  stage: {
    type: String,
  },
  status: {
    type: String,
  },
  children: {
    type: [String],
  },
  parent: {
    type: String,
  },
  tasks: {
    type: [String],
  },
  activities: {
    type: [String],
  },
  workDetails: [
    new Schema({
      date: { type: Date, default: Date.now },
      stage: { type: String },
      file: { type: [String] },
      note: { type: String },
      user: { type: String },
    }),
  ],
  files: [
    new Schema({
      date: { type: Date, default: Date.now },
      stage: { type: String },
      file: { type: String },
      note: { type: String },
      user: { type: String },
    }),
  ],
  details: {
    type: Object,
  },
});

export default mongoose.model("Project", Project);
