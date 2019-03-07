/* global describe it */
import {run} from '@syncano/test'
import sinon from 'sinon'
import CustomerIo from 'customerio-node'

describe('anonymous-event', () => {
  beforeAll(() => {
    sinon
      .stub(CustomerIo.prototype, 'trackAnonymous')
      .onFirstCall().resolves('')
      .onSecondCall().rejects('')
  })

  it('Send event', async () => {
    const args = {
      event: 'test_event',
      data: {
        email: 'testEmail',
        name: 'John'
      }
    }

    const res = await run('anonymous-event', {args})
    expect(res).toHaveProperty('code', 200)
    expect(res.data).toHaveProperty('message', 'Message has been send.')
  })

  it('Sending error', async () => {
    const args = {
      event: 'test_event',
      data: {
        email: 'testEmail',
        name: 'John'
      }
    }

    const res = await run('anonymous-event', {args})
    expect(res).toHaveProperty('code', 400)
  })
})
