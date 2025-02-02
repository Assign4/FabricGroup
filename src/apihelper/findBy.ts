import pactum from 'pactum';

export class FindBy {
  async findByAmount() {
    const resource = pactum.stash.getDataMap('billPay');
    await pactum.spec('find transactions by amount', resource);
  }
}
