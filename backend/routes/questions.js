const router = require('express').Router();
let Questions = require('../models/questions');

router.route('/').get((req, res) => {
  Questions.find()
    .then(questions => res.json(questions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const query = req.body.query;
  const topic = req.body.topic;
  const tags = req.body.tags;

  const newquestion = new Questions({query,topic,tags});
  console.log(newquestion)
  newquestion.save()
    .then(() => res.json('Question added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Questions.findById(req.params.id)
      .then(questions => res.json(questions))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Questions.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Questions.findById(req.params.id)
      .then(question => {
        question.query = req.body.query;
        question.topic = req.body.topic;
        question.tags = req.body.tags;
  
        exercise.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;