const express = require('express')
const router = express.Router()
//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('../swagger.json');
const news = require('../models/news.model')
const m = require('../helpers/middlewares')
//router.use('/api-docs', swaggerUi.serve);
//router.get('/api-docs', swaggerUi.setup(swaggerDocument));
module.exports = router
/* All posts */
router.get('/', async (req, res) => {
    await news.getNews()
    .then(news => res.json(news))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* A post by id */
router.get('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    await news.getNewsID(id)
    .then(news => res.json(news))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Insert a new post */
router.post('/', m.checkFieldsNews, async (req, res) => {
    await news.insertNewsOne(req.body)
    .then(news => res.status(201).json({
        message: `The news #${news.id} has been created`,
        content: news
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})

/* Update a post */
router.put('/:id', m.mustBeInteger, m.checkFieldsNews, async (req, res) => {
    const id = req.params.id
    await news.updateNews(id, req.body)
    .then(news => res.json({
        message: `The news #${id} has been updated`,
        content: news
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete a post */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    
    await news.deleteNews(id)
    .then(news => res.json({
        message: `The news #${id} has been deleted`
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

