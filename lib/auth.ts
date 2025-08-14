import bcrypt from "bcryptjs"
import { randomBytes } from "crypto"

export interface User {
  id: string
  email: string
  password: string
  name: string
  phone?: string
  address?: string
  city?: string
  district?: string
  postalCode?: string
  resetToken?: string
  resetTokenExpiry?: Date
  createdAt: Date
  updatedAt: Date
}

// In-memory user storage (in production, use a database)
const users: User[] = [
  {
    id: "1",
    email: "demo@rawises.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm", // password123
    name: "Demo Kullanıcı",
    phone: "+90 555 123 4567",
    address: "Demo Adres Mahallesi, Demo Sokak No:1",
    city: "İstanbul",
    district: "Kadıköy",
    postalCode: "34710",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function getAllUsers(): Promise<User[]> {
  return users
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null
}

export async function getUserById(id: string): Promise<User | null> {
  return users.find((user) => user.id === id) || null
}

export async function registerUser(userData: {
  email: string
  password: string
  name: string
  phone?: string
}): Promise<{ success: boolean; message: string; user?: Omit<User, "password"> }> {
  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(userData.email)
    if (existingUser) {
      return { success: false, message: "Bu e-posta adresi zaten kullanılıyor" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12)

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email.toLowerCase(),
      password: hashedPassword,
      name: userData.name,
      phone: userData.phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    users.push(newUser)

    // Return user without password
    const { password, ...userWithoutPassword } = newUser
    return {
      success: true,
      message: "Hesabınız başarıyla oluşturuldu",
      user: userWithoutPassword,
    }
  } catch (error) {
    console.error("Register user error:", error)
    return { success: false, message: "Hesap oluşturulurken bir hata oluştu" }
  }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    console.error("Password verification error:", error)
    return false
  }
}

export async function updateUserPassword(
  userId: string,
  newPassword: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const userIndex = users.findIndex((user) => user.id === userId)
    if (userIndex === -1) {
      return { success: false, message: "Kullanıcı bulunamadı" }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12)
    users[userIndex].password = hashedPassword
    users[userIndex].updatedAt = new Date()
    users[userIndex].resetToken = undefined
    users[userIndex].resetTokenExpiry = undefined

    return { success: true, message: "Şifreniz başarıyla güncellendi" }
  } catch (error) {
    console.error("Update password error:", error)
    return { success: false, message: "Şifre güncellenirken bir hata oluştu" }
  }
}

export async function updateUserProfile(
  userId: string,
  profileData: {
    name?: string
    phone?: string
    address?: string
    city?: string
    district?: string
    postalCode?: string
  },
): Promise<{ success: boolean; message: string; user?: Omit<User, "password"> }> {
  try {
    const userIndex = users.findIndex((user) => user.id === userId)
    if (userIndex === -1) {
      return { success: false, message: "Kullanıcı bulunamadı" }
    }

    // Update user data
    users[userIndex] = {
      ...users[userIndex],
      ...profileData,
      updatedAt: new Date(),
    }

    // Return user without password
    const { password, ...userWithoutPassword } = users[userIndex]
    return {
      success: true,
      message: "Profiliniz başarıyla güncellendi",
      user: userWithoutPassword,
    }
  } catch (error) {
    console.error("Update profile error:", error)
    return { success: false, message: "Profil güncellenirken bir hata oluştu" }
  }
}

export async function createResetToken(email: string): Promise<{ success: boolean; message: string; token?: string }> {
  try {
    const userIndex = users.findIndex((user) => user.email.toLowerCase() === email.toLowerCase())
    if (userIndex === -1) {
      return { success: false, message: "Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı" }
    }

    const resetToken = randomBytes(32).toString("hex")
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

    users[userIndex].resetToken = resetToken
    users[userIndex].resetTokenExpiry = resetTokenExpiry
    users[userIndex].updatedAt = new Date()

    return { success: true, message: "Şifre sıfırlama bağlantısı oluşturuldu", token: resetToken }
  } catch (error) {
    console.error("Create reset token error:", error)
    return { success: false, message: "Şifre sıfırlama bağlantısı oluşturulurken bir hata oluştu" }
  }
}

export async function verifyResetToken(token: string): Promise<{ success: boolean; message: string; userId?: string }> {
  try {
    const user = users.find(
      (user) => user.resetToken === token && user.resetTokenExpiry && user.resetTokenExpiry > new Date(),
    )

    if (!user) {
      return { success: false, message: "Geçersiz veya süresi dolmuş şifre sıfırlama bağlantısı" }
    }

    return { success: true, message: "Token geçerli", userId: user.id }
  } catch (error) {
    console.error("Verify reset token error:", error)
    return { success: false, message: "Token doğrulanırken bir hata oluştu" }
  }
}
