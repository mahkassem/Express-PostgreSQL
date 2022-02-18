import mailTransporter from '../mail'
import { Post } from '../models/post.model'

export class MailService {

    static newPostAlert = async (post: Post): Promise<void> => {
        const message = {
            from: 'info@dailynews.com',
            to: 'subscribers@dailynews.com',
            subject: 'New post',
            text: `New post created: ${post.title}, open this link if you want to read the post`,
            html: `<h1>New post created: ${post.title}, <a href="https://github.com/mahkassem/Express-PostgreSQL">Read</a></h1>`
        }

        mailTransporter.sendMail(message, (err, info) => {
            if (err) {
                console.log(err)
            } else {
                console.log(info)
            }
        })
    }
}