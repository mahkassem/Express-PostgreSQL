import nodemailer from 'nodemailer'
import mailConf from './config/mail.config'

const mail = nodemailer.createTransport({
    host: mailConf.host,
    port: Number(mailConf.host),
    auth: {
        user: mailConf.user,
        pass: mailConf.password
    },
    debug: mailConf.debug,
    logger: mailConf.logger,
})

export default mail