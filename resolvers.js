const Course = require('./models/Course')
const Teacher = require('./models/Teacher')

const resolvers = {
  Query: {
    courses: () => Course.query().eager('[teacher, comments]'),
    teachers: () => Teacher.query().eager('[courses, courses.[comments]]'),
    course: (rootValue, args) => Course.query().eager('[teacher, teacher.[courses], teacher.courses.[comments], comments]').findById(args.id),
    teacher: (rootValue, args) => Teacher.query().eager('[courses, courses.[comments]]').findById(args.id),
    search: (_, args) => {
      return [
        Teacher.query().findById(3),
        Course.query().findById(1)
      ]
    }
  },
  SearchResult: {
    __resolveType: (obj) => {
      if (obj.name) return 'Teacher'
      return 'Course'
    }
  },
  Mutation: {
    teacherAdd: (_, args) => {
      return Teacher.query().insert(args.teacher)
    },
    courseAdd: (_, args) => {
      return Course.query().insert(args.course)
    },
    teacherEdit: (_, args) => {
      return Teacher.query().patchAndFetchById(args.teacherId, args.teacher)
    },
    teacherDelete: (_, args) => {
      return Teacher.query().findById(args.teacherId).then((teacher) => {
        return Teacher.query().deleteById(args.teacherId).then((deletedRows) => {
          if (deletedRows > 0) return teacher
          throw new Error(`El profesor con id ${args.teacherId} no se pudo eliminar`)
        })
      })
    }
  }
}

module.exports = resolvers
