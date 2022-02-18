import { Post } from '../models/post.model'
import PostRepository from '../repositories/post.repository'
import UserRepository from '../repositories/user.repository'

const _repo = new PostRepository()
const _userRepo = new UserRepository()
let user_id: number | undefined
let storedPostId = 1

describe('Post repository', () => {
    beforeAll(async () => {
        const user = await _userRepo.createAsync({
            first_name: 'Test',
            last_name: 'User',
            username: 'testuser1',
            password: '$2b$10$px9.YtJb2iQH.vMSPR1sve2u4x7xJ5giCN9UyNyxSi93XVhi9qKk2', // Passw0rd@123
        })

        user_id = user.id
    })

    it('Create a post', async () => {
        const post: Post = {
            user_id,
            title: 'Example test blog title',
            body: 'The Controller is responsible for controlling the application logic and acts as the coordinator between the View and the Model. The Controller receives an input from the users via the View, then processes the user\'s data with the help of Model and passes the results back to the View. In the MVC Framework, controller classes must implement the IController interface from the System.Web.Mvc namespace. MVC Controllers are responsible for controlling the flow of the application execution.',
        }

        const createdPost = await _repo.createAsync(post)
        storedPostId = createdPost.id as number
        // remove auto generated data
        delete createdPost.id
        delete createdPost.created_at

        expect(createdPost).toEqual(post)
    })

    it('Show return a post', async () => {
        const post = await _repo.singleAsync(storedPostId)

        delete post.id
        delete post.created_at

        expect(post).toEqual({
            user_id,
            title: 'Example test blog title',
            body: 'The Controller is responsible for controlling the application logic and acts as the coordinator between the View and the Model. The Controller receives an input from the users via the View, then processes the user\'s data with the help of Model and passes the results back to the View. In the MVC Framework, controller classes must implement the IController interface from the System.Web.Mvc namespace. MVC Controllers are responsible for controlling the flow of the application execution.',
        })
    })

})
