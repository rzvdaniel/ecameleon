import mongoose from 'mongoose'
import appSchema from './app.schema'

var getModel = function (appName) {
  var plugin = require(`./plugins/${appName}Plugin`)
  appSchema.plugin(plugin)
  return mongoose.model(appName, appSchema)
};

export default getModel;
