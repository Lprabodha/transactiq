import { ObjectId } from 'mongodb'
import bcrypt from 'bcryptjs'
import clientPromise from '../mongodb'

export interface User {
  _id?: ObjectId
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export async function getUserCollection() {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB || 'saasify')
  return db.collection<User>('users')
}

export async function findUserByEmail(email: string) {
  const users = await getUserCollection()
  return users.findOne({ email: email.toLowerCase() })
}

export async function createUser(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>) {
  const users = await getUserCollection()
  
  const existingUser = await findUserByEmail(userData.email)
  if (existingUser) {
    throw new Error('User with this email already exists')
  }
  
  const hashedPassword = await bcrypt.hash(userData.password, 10)
  
  const result = await users.insertOne({
    ...userData,
    email: userData.email.toLowerCase(),
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  
  return result
}

export async function validateUser(email: string, password: string) {
  const user = await findUserByEmail(email)
  
  if (!user) {
    return null
  }
  
  const isValid = await bcrypt.compare(password, user.password)
  
  if (!isValid) {
    return null
  }
  
  const { password: _, ...userWithoutPassword } = user
  
  return userWithoutPassword
}
