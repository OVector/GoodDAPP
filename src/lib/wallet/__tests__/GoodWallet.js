import Config from '../../../config/config'
import { GoodWallet } from '../GoodWalletClass'

const goodWallet = new GoodWallet({
  web3Transport: Config.web3TransportProvider,
})

beforeAll(() => {
  jest.resetAllMocks()
})

describe('Wallet Initialization', () => {
  it(`should initialize wallet property`, () => {
    const numOfAccounts = 10

    return goodWallet.ready.then(() => {
      expect(goodWallet.account).toBeDefined()
      expect(goodWallet.account).not.toBeNull()
      expect(goodWallet.accounts).toBeDefined()
      expect(goodWallet.accounts).not.toBeNull()
      expect(goodWallet.accounts.length).toEqual(numOfAccounts)
      expect(goodWallet.networkId).toBeDefined()
      expect(goodWallet.networkId).not.toBeNull()
      expect(goodWallet.identityContract).toBeDefined()
      expect(goodWallet.identityContract).not.toBeNull()
      expect(goodWallet.tokenContract).toBeDefined()
      expect(goodWallet.tokenContract).not.toBeNull()
      expect(goodWallet.UBIContract).toBeDefined()
      expect(goodWallet.UBIContract).not.toBeNull()
      expect(goodWallet.oneTimePaymentsContract).toBeDefined()
      expect(goodWallet.oneTimePaymentsContract).not.toBeNull()
    })
  })

  it('should get account for type', async () => {
    await goodWallet.ready
    expect(goodWallet.getAccountForType('gd')).toBe(goodWallet.accounts[0].address)
    expect(goodWallet.getAccountForType('faceVerification')).toBe(goodWallet.accounts[5].address)
  })

  it('should have connection', async () => {
    await goodWallet.ready
    await goodWallet.wallet.eth.getBalance(goodWallet.account)
    const connected = goodWallet.wallet.currentProvider.connected
    expect(connected).toBeTruthy()
  })
})

describe('Wallet Creation', () => {
  it(`should create wallet property`, () => {
    return goodWallet.ready.then(() => {
      expect(goodWallet).toBeDefined()
      expect(goodWallet).not.toBeNull()
      expect(goodWallet.wallet).toBeDefined()
      expect(goodWallet.wallet).not.toBeNull()
    })
  })
})
