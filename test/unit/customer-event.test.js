/* global describe it */
import {run} from '@syncano/test'
import sinon from 'sinon'
import CustomerIo from 'customerio-node'

describe('anonymous-event', () => {
  beforeAll(() => {
    sinon
      .stub(CustomerIo.prototype, 'track')
      .onFirstCall().resolves('')
      .onSecondCall().resolves('')
      .onThirdCall().rejects('')

    require('@syncano/core').Core.__setMocks({
      users: {
        where: () => ({
          fields: () => ({
            first: () =>
              sinon
                .stub()
                .onFirstCall().resolves()
                .onSecondCall().resolves({customerId: 'project_customer_id'})
                .onThirdCall().rejects()
          })
        })
      }
    })
  })

  it('Send customer event', async () => {
    const args = {
      customerId: 1,
      event: 'test_event',
      data: {
        email: 'testEmail',
        name: 'John'
      }
    }

    const res = await run('customer-event', {args})
    expect(res).toHaveProperty('code', 200)
    expect(res.data).toHaveProperty('message', 'Message has been send.')
  })

  it('Get customerId from database and send event', async () => {
    const args = {
      event: 'test_event',
      data: {
        email: 'testEmail',
        name: 'John'
      }
    }

    const res = await run('customer-event', {args})
    expect(res).toHaveProperty('code', 200)
    expect(res.data).toHaveProperty('message', 'Message has been send.')
  })

  it('Sending error', async () => {
    const args = {
      customerId: 1,
      event: 'test_event',
      data: {
        url: 'url'
      }
    }

    const res = await run('customer-event', {args})
    expect(res).toHaveProperty('code', 400)
  })
})
