interface User {
  id: string
  email: string
  name: string
  // password: string
}

const users: User[] = []

export const auth = {
  login: (email: string, password: string): User | null => {
    const user = users.find((u) => u.email === email)
    if (user) {
      // En una aplicación real, verificarías la contraseña de forma segura aquí
      
      // console.log("*")
      // console.log(user.id)
      // console.log("user: " + user.email)
      // console.log("name: " + user.name)
      // console.log("password: " + user.password)

      return user
    }
    return null
  },
  register: (email: string, password: string, name: string): User => {
    const newUser = { id: Date.now().toString(), email, name }
    users.push(newUser)
    return newUser
  },
  logout: () => {
    // En una aplicación real, invalidarías el token de sesión aquí
  },
}