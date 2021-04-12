import { container } from 'tsyringe'

import { IMailProvider } from '../MailProvider/IMailProvider'
import { EtherealMailProvider } from '../MailProvider/implementations/EtherealMailProvider'
import { SESMailProvider } from './implementations/SESMailProvider'


const mailProvider = {
  local: container.resolve(EtherealMailProvider),
  s3: container.resolve(SESMailProvider)
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER]
)
