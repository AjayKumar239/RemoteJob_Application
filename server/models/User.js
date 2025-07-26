// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true,
//     maxlength: [50, 'Name cannot be more than 50 characters']
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true,
//     match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: [6, 'Password must be at least 6 characters'],
//     select: false
//   },
//   subscribed: {
//     type: Boolean,
//     default: false
//   },
//   savedJobs: [{
//     jobId: String,
//     title: String,
//     company: String,
//     savedAt: {
//       type: Date,
//       default: Date.now
//     }
//   }],
//   resume: {
//     filename: String,
//     path: String,
//     uploadedAt: Date
//   },
//   preferences: {
//     location: String,
//     jobType: String,
//     salaryRange: String
//   }
// }, {
//   timestamps: true
// });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// // Compare password method
// userSchema.methods.comparePassword = async function(password) {
//   return await bcrypt.compare(password, this.password);
// };

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  preferences: {
    type: Object,
    default: {}
  },
  resume: {
    filename: String,
    path: String,
    uploadedAt: Date
  },
  savedJobs: [{
    jobId: String,
    title: String,
    company: String,
    savedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Users', userSchema);