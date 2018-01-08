const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('../resolvers')
const Teacher = require('./Teacher')
const Course = require('./Course')

const rootQuery = `
  union SearchResult = Teacher | Course

  type Query {
    courses: [Course]
    teachers: [Teacher]
    course(id: Int): Course
    teacher(id: Int): Teacher
    search(query: String!): [SearchResult]
  }

  type Mutation {
    teacherAdd(teacher: NewTeacher): Teacher
    courseAdd(course: NewCourse): Course
    teacherEdit(teacherId: Int!, teacher: TeacherEditable): Teacher
    teacherDelete(teacherId: Int!): Teacher
  }
`

const schema = makeExecutableSchema({
  typeDefs: [rootQuery, Teacher, Course],
  resolvers
})

module.exports = schema
