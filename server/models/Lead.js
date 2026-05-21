const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    /*
      BASIC INFO
    */
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    phoneNumber: {
      type: String,
      default: ''
    },

    country: {
      type: String,
      default: ''
    },

    /*
      EDUCATION INFO
    */
    courseInterested: {
      type: String,
      default: ''
    },

    leadSource: {
      type: String,
      default: ''
    },

    /*
      COUNSELOR ASSIGNMENT
    */
    assignedCounselor: {
      type: String,
      default: ''
    },

    /*
      ADMISSIONS STAGE
    */
    admissionStage: {
      type: String,

      enum: [
        'Not Applied',
        'Applied',
        'Documents Pending',
        'Offer Letter',
        'Visa Process',
        'Admitted'
      ],

      default: 'Not Applied'
    },

    /*
      LEAD STATUS
    */
    leadStatus: {
      type: String,

      enum: [
        'New',
        'Contacted',
        'Interested',
        'Applied',
        'Admitted',
        'Rejected',
        'Not Interested',
        'Needs Attention'
      ],

      default: 'New'
    },

    /*
      PRIORITY
    */
    priority: {
      type: String,

      enum: [
        'Low',
        'Medium',
        'High'
      ],

      default: 'Medium'
    },

    /*
      NOTES
    */
    notes: {
      type: String,
      default: ''
    },

    /*
      DOCUMENTS
    */
    documents: [
      {
        fileName: String,
        fileUrl: String,
        uploadedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    /*
      FOLLOWUPS
    */
    followUpDate: {
      type: Date
    },

    lastContacted: {
      type: Date
    },

    /*
      ANALYTICS
    */
    convertedAt: Date,

    /*
      SOFT DELETE
    */
    isArchived: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  'Lead',
  leadSchema
);