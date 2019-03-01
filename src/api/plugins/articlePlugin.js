var mongoose = require('mongoose')

module.exports = function postPlugin(schema, options) {
  schema.add({
    title: String,
    post: String,
    lastModified: Date,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comments: [{
      text: String,
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }]
  })

  schema.pre('save', function (next) {
    this.lastModified = new Date
    next()
  })
}