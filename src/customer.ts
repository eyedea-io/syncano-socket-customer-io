import * as S from '@eyedea/syncano'
import * as crypto from 'crypto'
import CustomerIo from 'customerio-node'

interface Args {
  customerId?: string
  email: string
  attributes: object
}

class Endpoint extends S.Endpoint {
  async run(
    {response, users}: S.Core,
    {args, config}: S.Context<Args>
  ) {
    const cio = new CustomerIo(config.SITE_ID, config.API_KEY)
    const {email, attributes} = args
    const customerId = args.customerId || crypto.randomBytes(16).toString('hex')

    try {
      await cio.identify(customerId, {
        email,
        [!args.customerId ? 'created_at' : '']: Math.round((new Date()).getTime() / 1000),
        ...attributes,
      })

      if (!args.customerId) {
        users
          .where('username', email)
          .update({customerId})
      }

      response.json({
        message: !args.customerId ? 'Customer has been created.' : 'Customer has been updated.',
        customerId,
      })
    } catch (err) {
      response.json({message: err.message}, 400)
    }
  }

}

export default ctx => new Endpoint(ctx)
