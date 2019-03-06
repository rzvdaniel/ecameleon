const express = require('express');
const router = express.Router();
import appService from './app.service';

router.get('/:appName/:query/:projection', (req, res) => {
  appService.getApp(req, res);
});

router.post('/:appName', (req, res) => {
  appService.postApp(req, res);
});

router.put('/:appName/:query', (req, res) => {
  appService.putApp(req, res);
});

router.delete('/:appName/:query', (req, res) => {
  appService.deleteApp(req, res);
});

export default router;

