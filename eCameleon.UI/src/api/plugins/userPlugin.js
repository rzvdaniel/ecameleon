module.exports = function userPlugin(schema, options) {
  schema.add({
    fullName: String,
    email: String,
    active: Boolean
  })

  schema.pre('save', function (next) {
    this.createdDate = new Date
    this.updatedDate = new Date
    next()
  })
}