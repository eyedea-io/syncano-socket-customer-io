import * as S from '@eyedea/syncano'
import CustomerIo from 'customerio-node'

interface Args {
  customerId: string
}

class Endpoint extends S.Endpoint {
  async run(
    {response, users}: S.Core,
    {args, config}: S.Context<Args>
  ) {
    const cio = new CustomerIo(config.SITE_ID, config.API_KEY)
    const {customerId} = args

    try {
      await cio.destroy(customerId)

      users
        .where('customerId', customerId)
        .update({customerId: null})

      response.json({message: 'Customer has been deleted.'})
    } catch (err) {
      response.json({message: err.message}, 400)
    }
  }

}

export default ctx => new Endpoint(ctx)
