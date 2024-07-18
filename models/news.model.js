const filename = '../data/News.json'
let newsAll = require(filename)
const helper = require('../helpers/helper.js')
function getNews() {
    return new Promise((resolve, reject) => {
        if (newsAll.length === 0) {
            reject({
                message: 'no posts available',
                status: 202
            })
        }
        resolve(newsAll)
    })
}
function getNewsID(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(newsAll, id)
        .then(news => resolve(news))
        .catch(err => reject(err))
    })
}
function insertNewsOne(newOne) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(newsAll) }
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        } 
        newOne = { ...id, ...date, ...newOne }
        newsAll.push(newOne)
        helper.writeJSONFile(filename, newsAll)
        resolve(newOne)
    })
}
function updateNews(id, newOne) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(newsAll, id)
        .then(news => {
            const index = newsAll.findIndex(n => n.id == n.id)
            id = { id: news.id }
            const date = {
                createdAt: news.createdAt,
                updatedAt: helper.newDate()
            } 
            newsAll[index] = { ...id, ...date, ...newOne }
            helper.writeJSONFile(filename, newsAll)
            resolve(newsAll[index])
        })
        .catch(err => reject(err))
    })
}
function deleteNews(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(newsAll, id)
        .then(() => {
            newsAll = newsAll.filter(n => n.id !== id)
            helper.writeJSONFile(filename, newsAll)
            resolve()
        })
        .catch(err => reject(err))
    })
}
module.exports = {
    insertNewsOne,
    getNews,
    getNewsID, 
    updateNews,
    deleteNews
}