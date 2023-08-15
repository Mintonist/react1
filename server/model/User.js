const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    completedMeetings: { type: Number },
    image: { type: String },
    profession: { type: Schema.Types.ObjectId, ref: 'Profession' },
    qualities: [{ type: Schema.Types.ObjectId, ref: 'Quality' }],
    rate: { type: Number },
    sex: { type: String, enum: ['male', 'female'] },
  },
  { timestamps: true }
);

module.exports = model('User', schema);
