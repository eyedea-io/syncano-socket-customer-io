import * as S from '@eyedea/syncano'

interface Args {
  migrationKey: string
}

class Endpoint extends S.Endpoint {
  async run({response, users}: S.Core, {args, config}: S.Context<Args>) {
    if (args.migrationKey === config.CUSTOMERIO_MIGRATION_KEY) {
      try {
        const allUsers = await users.list()
        for (const user of allUsers) {
          console.log(user)
          if (user.username && !user.customerId) {
            users
              .where('username', user.username)
              .update({customerId: user.username})
          }
        }
        response.json({message: 'update successfull'})
      } catch (e) {
        response.json({message: e})
      }
    }
  }
}

export default ctx => new Endpoint(ctx)
