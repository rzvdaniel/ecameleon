import appModel from './app.model';
import mongo from './mongo';

mongo.connect();

function getApp(req, res) {
  let query = JSON.parse(req.params.query);
  let projection = JSON.parse(req.params.projection);
  let app = appModel(req.params.appName);
  
  app
    .find(query, projection)
    .exec()
    .then(apps => res.status(200).json(apps))
    .catch(error => res.status(500).send(error));                                                         
}

function postApp(req, res) {
  let app = appModel(req.params.appName)
  let newApp = new app(req.body)

  newApp
    .save()
    .then(doc => res.status(201).send(doc))
    .catch(error => res.status(500).send(error.Post))
}

function putApp(req, res) {
  let query = JSON.parse(req.params.query)
  let projection = req.body
  let app = appModel(req.params.appName)

  app
    .update(query, projection)
    .then(doc => res.status(200).json(doc))
    .catch(error => res.status(500).send(error))
}

function deleteApp(req, res) {
  let query = JSON.parse(req.params.query)
  let app = appModel(req.params.appName)

  app
    .deleteMany(query)
    .then(() => res.status(204).send('Removed'))
    .catch(error => res.status(500).send(error))
}

const appService = {
  getApp,
  postApp,
  putApp,
  deleteApp
};

export default appService;
