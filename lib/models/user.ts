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

function getDatabaseName(uri: string): string {
  const parts = uri.split('/')
  return parts[parts.length - 1] || 'transactIQ' 
}

export async function getUserCollection() {
  try {
    const client = await clientPromise
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/transactIQ'
    const dbName = getDatabaseName(uri)
    const db = client.db(dbName)
    return db.collection<User>('users')
  } catch (error) {
    console.error('Error connecting to the database:', error)
    throw new Error('Failed to get user collection')
  }
}

export async function findUserByEmail(email: string) {
  try {
    const users = await getUserCollection()
    return users.findOne({ email: email.toLowerCase() })
  } catch (error) {
    console.error('Error finding user by email:', error)
    throw new Error('Failed to find user by email')
  }
}

export async function createUser(userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>) {
  try {
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
  } catch (error) {
    console.error('Error creating user:', error)
    throw new Error('Failed to create user')
  }
}

export async function validateUser(email: string, password: string) {
  try {
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
  } catch (error) {
    console.error('Error validating user:', error)
    throw new Error('Failed to validate user')
  }
}
