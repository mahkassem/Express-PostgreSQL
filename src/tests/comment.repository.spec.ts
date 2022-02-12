import CommentRepository from '../repositories/comment.repository'
import UserRepository from '../repositories/user.repository'
import PostRepository from '../repositories/post.repository'

const _repo = new CommentRepository()
const _userRepo = new UserRepository()
const _postRepo = new PostRepository()
let post_id: number | undefined
let user_id: number | undefined

describe('Comments', () => {
    beforeAll(async () => {
        const user = await _userRepo.createAsync({
            first_name: 'test',
            last_name: 'test',
            username: 'test',
            password: 'test'
        })
        user_id = user.id

        const post = await _postRepo.createAsync({
            user_id,
            title: 'test title',
            body: 'test body'
        })

        post_id = post.id
    })

    it('Should create a new comment on a post', async () => {
        const comment = {
            user_id,
            post_id,
            body: 'some cool comment body'
        }

        const createdComment = await _repo.createAsync(comment)

        delete createdComment.id
        delete createdComment.created_at

        expect(createdComment).toEqual(comment)
    })
})