module.exports = function appPlugin(schema, options) {
  schema.add({
    name: { type: String, required: true },
    title: { type: String, required: true },
    path: { type: String },
    image: { type: String },
    active: { type: Boolean, default: true }
  })

  schema.pre('save', function (next) {
    this.path = '#/apps/' + this.name
    this.lastModified = new Date
    next()
  })
}