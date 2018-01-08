module.exports = `
  # Esto es un curso en el sistema
  type Course {
    id: ID!
    title: String!
    # Esta es la descripción del curso
    description: String!
    teacher: Teacher
    rating: Float
    comments: [Comment]
  }

  input NewCourse {
    title: String!
    description: String!
    rating: Float
  }

  type Comment {
    id: ID!
    name: String!
    body: String!
  }
`
