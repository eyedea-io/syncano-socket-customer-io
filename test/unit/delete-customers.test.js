/* global describe it */
import {run} from '@syncano/test'
import sinon from 'sinon'
import CustomerIo from 'customerio-node'

describe('delete-customers', () => {
  beforeAll(() => {
    sinon
      .stub(CustomerIo.prototype, 'destroy')
      .onFirstCall().resolves('')
      .onSecondCall().rejects('')

    require('@syncano/core').Core.__setMocks({
      users: {
        where: () => ({
          update:
            sinon
              .stub()
              .resolves()
        })
      }
    })
  })

  it('Customer has been deleted.', async () => {
    const args = {
      customerId: 'CustomerId'
    }

    const res = await run('delete-customers', {args})
    expect(res).toHaveProperty('code', 200)
    expect(res.data).toHaveProperty('message', 'Customer has been deleted.')
  })

  it('Deleting error', async () => {
    const args = {
      customerId: 'CustomerId'
    }

    const res = await run('delete-customers', {args})
    expect(res).toHaveProperty('code', 400)
  })
})
