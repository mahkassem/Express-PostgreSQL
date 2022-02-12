import { User } from '../../models/user.model'
import DB from '../../database'

const password = '$2b$10$px9.YtJb2iQH.vMSPR1sve2u4x7xJ5giCN9UyNyxSi93XVhi9qKk2' // Passw0rd@123

const data: User[] = [
    { first_name: 'Mahmoud', last_name: 'Kassem', username: 'mahmoud', password },
    { first_name: 'Seif', last_name: 'Ali', username: 'seifali', password },
]

export default async function seed() {
    console.log('> Seeding users...')
    let queryText = 'INSERT INTO users (first_name, last_name, username, password) VALUES'
    queryText += data.map(user => ` ('${user.first_name}', '${user.last_name}', '${user.username}', '${user.password}')`).join(', ')
    await DB.query(queryText)
    console.log('> Seeding users completed!')
    return
}