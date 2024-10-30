import anyTest from 'ava';
import { Worker } from 'near-workspaces';
import { setDefaultResultOrder } from 'dns'; setDefaultResultOrder('ipv4first'); // temp fix for node >v17

/**
 *  @typedef {import('near-workspaces').NearAccount} NearAccount
 *  @type {import('ava').TestFn<{worker: Worker, accounts: Record<string, NearAccount>}>}
 */
const test = anyTest;

test.beforeEach(async t => {
  // Create sandbox
  const worker = t.context.worker = await Worker.init();

  // Deploy contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount('test-account');

  // Get wasm file path from package.json test script in folder above
  await contract.deploy(
    process.argv[2],
  );

  // Save state for test runs, it is unique for each test
  t.context.accounts = { root, contract };
});

test.afterEach.always(async (t) => {
  await t.context.worker.tearDown().catch((error) => {
    console.log('Failed to stop the Sandbox:', error);
  });
});

// Test case for submitting a product
test('submit a product', async (t) => {
  const { root, contract } = t.context.accounts;
  await root.call(contract, 'submitProduct', { productHash: 'test-product-hash', address: "cjwwejwedwedjjwedede" });

  const productCount = await contract.view('getProductCount', {});
  t.is(productCount, 1);

  const product = await contract.view('getProductByHash', { productHash: 'test-product-hash' });
  t.truthy(product);
  t.is(product.productHash, 'test-product-hash');
  t.is(product.status, 'Pending');
});

// Test case for approving a product
test('approve a product', async (t) => {
  const { root, contract } = t.context.accounts;
  
  // First submit a product
  await root.call(contract, 'submitProduct', { productHash: 'test-product-hash' });

  // Approve the product
  await root.call(contract, 'approveProductByHash', { productHash: 'test-product-hash' });

  const product = await contract.view('getProductByHash', { productHash: 'test-product-hash' });
  t.is(product.status, 'Approved');
});

// Test case for adding feedback to a product
test('add feedback to a product', async (t) => {
  const { root, contract } = t.context.accounts;

  // Submit and approve a product first
  await root.call(contract, 'submitProduct', { productHash: 'test-product-hash' });
  await root.call(contract, 'approveProductByHash', { productHash: 'test-product-hash' });

  // Add feedback to the approved product
  await root.call(contract, 'addFeedbackByHash', { productHash: 'test-product-hash', feedbackHash: 'feedback-hash-1', address: "cjwwejwedwedjjwedede" });

  const feedbackCount = await contract.view('getFeedbackCount', {});
  t.is(feedbackCount, 1);

  const feedbacks = await contract.view('getAllFeedbackHashesByProductHash', { productHash: 'test-product-hash' });
  t.deepEqual(feedbacks, ['feedback-hash-1']);
});

// Test case for fetching all products
test('fetch all products', async (t) => {
  const { root, contract } = t.context.accounts;

  await root.call(contract, 'submitProduct', { productHash: 'product-hash-1' });
  await root.call(contract, 'submitProduct', { productHash: 'product-hash-2' });

  const products = await contract.view('getAllProducts', {});
  // console.log(products)
  t.deepEqual(products, ['product-hash-1', 'product-hash-2']);
});

// Test case for fetching feedback by ID
test('fetch feedback by ID', async (t) => {
  const { root, contract } = t.context.accounts;

  await root.call(contract, 'submitProduct', { productHash: 'test-product-hash' });
  await root.call(contract, 'approveProductByHash', { productHash: 'test-product-hash' });
  await root.call(contract, 'addFeedbackByHash', { productHash: 'test-product-hash', feedbackHash: 'feedback-hash-1' });

  const feedback = await contract.view('getFeedback', { feedbackId: 0 });

  t.is(feedback.feedbackHash, 'feedback-hash-1');
  t.is(feedback.submitter, root.accountId);
});

// Test case for checking product approval status
test('check product approval status', async (t) => {
  const { root, contract } = t.context.accounts;

  await root.call(contract, 'submitProduct', { productHash: 'test-product-hash' });
  let isApproved = await contract.view('isProductApproved', { productHash: 'test-product-hash' });
  t.is(isApproved, false);

  await root.call(contract, 'approveProductByHash', { productHash: 'test-product-hash' });
  isApproved = await contract.view('isProductApproved', { productHash: 'test-product-hash' });
  t.is(isApproved, true);
});













