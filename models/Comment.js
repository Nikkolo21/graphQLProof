const { Model } = require('objection')
const path = require('path')

class Comment extends Model {
  static get tableName () {
    return 'comments'
  }

  static get relationMappings () {
    return {
      courses: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, '/Course'),
        join: {
          from: 'comments.curso_id',
          to: 'courses.id'
        }
      }
    }
  }
}

module.exports = Comment
