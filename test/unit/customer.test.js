/* global describe it */
import {run} from '@syncano/test'
import sinon from 'sinon'
import CustomerIo from 'customerio-node'

describe('anonymous-event', () => {
  beforeAll(() => {
    sinon
      .stub(CustomerIo.prototype, 'identify')
      .onFirstCall().resolves('')
      .onSecondCall().resolves('')
      .onThirdCall().rejects('')

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

  it('Customer has been created.', async () => {
    const args = {
        email: 'testEmail'
    }

    const res = await run('customer', {args})
    expect(res).toHaveProperty('code', 200)
    expect(res.data).toHaveProperty('message', 'Customer has been created.')
  })

  it('Customer has been updated.', async () => {
    const args = {
      customerId: 'CustomerId',
      email: 'testEmail'
    }

    const res = await run('customer', {args})
    expect(res).toHaveProperty('code', 200)
    expect(res.data).toHaveProperty('message', 'Customer has been updated.')
  })

  it('Sending error', async () => {
    const args = {
      customerId: 'CustomerId',
      email: 'testEmail'
    }

    const res = await run('customer', {args})
    expect(res).toHaveProperty('code', 400)
  })
})
