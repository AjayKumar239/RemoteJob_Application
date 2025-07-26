const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

console.log('Loading user routes...');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF and DOC files are allowed'));
    }
  }
});

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
console.log('Setting up GET /profile route');
router.get('/profile', auth, async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
console.log('Setting up PUT /profile route');
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email, preferences } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, preferences },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/user/resume
// @desc    Upload resume
// @access  Private
console.log('Setting up POST /resume route');
router.post('/resume', auth, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        resume: {
          filename: req.file.filename,
          path: req.file.path,
          uploadedAt: new Date()
        }
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Resume uploaded successfully',
      resume: user.resume
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/user/save-job
// @desc    Save job to user profile
// @access  Private
console.log('Setting up POST /save-job route');
router.post('/save-job', auth, async (req, res) => {
  try {
    const { jobId, title, company } = req.body;

    const user = await User.findById(req.user.id);
    
    // Check if job already saved
    const jobExists = user.savedJobs.find(job => job.jobId === jobId);
    if (jobExists) {
      return res.status(400).json({ message: 'Job already saved' });
    }

    user.savedJobs.push({ jobId, title, company });
    await user.save();

    res.json({
      success: true,
      message: 'Job saved successfully',
      savedJobs: user.savedJobs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/user/saved-jobs/:jobId
// @desc    Remove saved job
// @access  Private
console.log('Setting up DELETE /saved-jobs/:jobId route');
router.delete('/saved-jobs/:jobId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.savedJobs = user.savedJobs.filter(job => job.jobId !== req.params.jobId);
    await user.save();

    res.json({
      success: true,
      message: 'Job removed from saved jobs',
      savedJobs: user.savedJobs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

console.log('User routes loaded successfully');
module.exports = router;














// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const User = require('../models/User');
// const auth = require('../middleware/auth');

// const router = express.Router();

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5000000 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = /pdf|doc|docx/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Only PDF and DOC files are allowed'));
//     }
//   }
// });

// // @route   GET /api/user/profile
// // @desc    Get user profile
// // @access  Private
// router.get('/profile', auth, async (req, res) => {
//   res.json({
//     success: true,
//     user: req.user
//   });
// });

// // @route   PUT /api/user/profile
// // @desc    Update user profile
// // @access  Private
// router.put('/profile', auth, async (req, res) => {
//   try {
//     const { name, email, preferences } = req.body;
    
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { name, email, preferences },
//       { new: true, runValidators: true }
//     );

//     res.json({
//       success: true,
//       user
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // @route   POST /api/user/resume
// // @desc    Upload resume
// // @access  Private
// router.post('/resume', auth, upload.single('resume'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       {
//         resume: {
//           filename: req.file.filename,
//           path: req.file.path,
//           uploadedAt: new Date()
//         }
//       },
//       { new: true }
//     );

//     res.json({
//       success: true,
//       message: 'Resume uploaded successfully',
//       resume: user.resume
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // @route   POST /api/user/save-job
// // @desc    Save job to user profile
// // @access  Private
// router.post('/save-job', auth, async (req, res) => {
//   try {
//     const { jobId, title, company } = req.body;

//     const user = await User.findById(req.user.id);
    
//     // Check if job already saved
//     const jobExists = user.savedJobs.find(job => job.jobId === jobId);
//     if (jobExists) {
//       return res.status(400).json({ message: 'Job already saved' });
//     }

//     user.savedJobs.push({ jobId, title, company });
//     await user.save();

//     res.json({
//       success: true,
//       message: 'Job saved successfully',
//       savedJobs: user.savedJobs
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // @route   DELETE /api/user/unsave-job/:jobId
// // @desc    Remove saved job
// // @access  Private
// router.delete('/unsave-job/:jobId', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     user.savedJobs = user.savedJobs.filter(job => job.jobId !== req.params.jobId);
//     await user.save();

//     res.json({
//       success: true,
//       message: 'Job removed from saved jobs',
//       savedJobs: user.savedJobs
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
