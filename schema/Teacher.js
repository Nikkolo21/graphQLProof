module.exports = `
  type Teacher {
    id: ID!
    name: String!
    country: String!
    gender: Gender
    courses: [Course]
  }

  enum Gender {
    M
    F
  }

  input NewTeacher {
    name: String!
    gender: Gender
    country: String!
  }

  input TeacherEditable {
    name: String
    gender: Gender
    country: String
  }
`
