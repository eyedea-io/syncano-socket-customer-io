import * as S from '@eyedea/syncano'
import CustomerIo from 'customerio-node'

interface Args {
  event: string
  data: Object
}

class Endpoint extends S.Endpoint {
  async run(
    {response}: S.Core,
    {args, config}: S.Context<Args>
  ) {
    const cio = new CustomerIo(config.SITE_ID, config.API_KEY)
    const {event, data} = args

    try {
      await cio.trackAnonymous({
        name: event,
        data,
      })

      response.json({message: 'Message has been send.'})
    } catch (err) {
      response.json({message: err.message}, 400)
    }
  }

}

export default ctx => new Endpoint(ctx)
