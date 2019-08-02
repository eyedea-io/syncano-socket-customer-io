import * as S from '@eyedea/syncano'
import CustomerIo from 'customerio-node'

interface Args {
  customerId?: string
  email?: string
  event: string
  data: Object
}

class Endpoint extends S.Endpoint {
  async run(
    {response, users}: S.Core,
    {args, config}: S.Context<Args>
  ) {
    const cio = new CustomerIo(config.SITE_ID, config.API_KEY)
    const {customerId, email, event, data} = args

    try {
      const user = await users
        .where('username', email)
        .fields('customerId')
        .first()

      if (customerId || user) {
        await cio.track(customerId || user.customerId, {
          name: event,
          data,
        })
      } else {
        await cio.trackAnonymous({
          name: event,
          data,
        })
      }


      response.json({message: 'Message has been send.'})
    } catch (err) {
      response.json({message: err.message}, 400)
    }
  }

}

export default ctx => new Endpoint(ctx)
