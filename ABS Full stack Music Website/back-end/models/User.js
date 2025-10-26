import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  contact: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  picture: { 
    type: String, 
    required: true
  },
  gender: { 
    type: String, 
    required: true 
  },
});

export default mongoose.model('User', userSchema);
