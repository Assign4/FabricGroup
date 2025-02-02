import pactum from 'pactum';

const { addSpecHandler } = pactum.handler;

addSpecHandler('find transactions by amount', ({ spec, data }) => {
  const { userData } = pactum.stash.getDataMap('userData');
  spec.get(`/services_proxy/bank/accounts/${data.fromAccount}/transactions/amount/${data.amount}`);
  spec.withAuth(userData.username, userData.password);
  spec.expectStatus(200);
  spec.expectJsonLike([
    {
      accountId: Number(data.fromAccount),
      amount: Number(data.amount),
    },
  ]);
});
