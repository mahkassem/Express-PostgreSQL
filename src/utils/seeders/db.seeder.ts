import userSeeder from './user.seeder'

export const DbSeed = async () => {
    console.log('Seeding...')
    await userSeeder()
    console.log('Seeding completed!')
    process.exit(1)
}

DbSeed()