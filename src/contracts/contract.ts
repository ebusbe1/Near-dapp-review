import { NearBindgen, near, call, view, UnorderedMap, assert, initialize } from 'near-sdk-js';

@NearBindgen({})
class FeedbackSystem {
    productCounter: number = 0;
    feedbackCounter: number = 0;

    products: UnorderedMap<Product> = new UnorderedMap('p');
    feedbacks: UnorderedMap<Feedback> = new UnorderedMap('f');

    @call({})
    submitProduct({ productHash }: { productHash: string }): void {
        const newProduct: Product = {
            id: this.productCounter,
            productHash: productHash,
            creator: near.signerAccountId(),
            status: 'Pending',
            exists: true
        };

        // Store the new product in the persistent map
        this.products.set(this.productCounter.toString(), newProduct);
        this.productCounter += 1;

        near.log(`Product submitted: ${newProduct.id}, Hash: ${productHash}`);
    }

    @call({})
    approveProductByHash({ productHash }: { productHash: string }): void {
        for (let id = 0; id < this.productCounter; id++) {
            const product = this.products.get(id.toString());
            if (product && product.productHash === productHash && product.status === 'Pending') {
                product.status = 'Approved';
                this.products.set(id.toString(), product);  // Update product in the map
                near.log(`Product approved: ${id}`);
                return;
            }
        }

        // Use assert for error handling
        assert(false, "Product not found or already approved");
    }

    @call({})
    addFeedbackByHash({ productHash, feedbackHash }: { productHash: string; feedbackHash: string }): void {
        for (let id = 0; id < this.productCounter; id++) {
            const product = this.products.get(id.toString());

            if (product && product.productHash === productHash) {
                assert(product.status === 'Approved', 'Product is not approved yet');

                const newFeedback: Feedback = {
                    id: this.feedbackCounter,
                    productId: product.id,
                    feedbackHash: feedbackHash,
                    submitter: near.signerAccountId(),
                    timestamp: Number(near.blockTimestamp()),
                    exists: true
                };

                this.feedbacks.set(this.feedbackCounter.toString(), newFeedback);
                near.log(`Feedback submitted: ${this.feedbackCounter}, Product ID: ${product.id}, Feedback Hash: ${feedbackHash}`);
                this.feedbackCounter++;
                return;
            }
        }
        assert(false, 'Product not found'); // Replaced panic with assert
    }

    @view({})
    getAllFeedbackHashesByProductHash({ productHash }: { productHash: string }): string[] {
        let productId: number | null = null;

        for (let id = 0; id < this.productCounter; id++) {
            const product = this.products.get(id.toString());
            if (product && product.productHash === productHash) {
                productId = product.id;
                break;
            }
        }

        assert(productId !== null, 'Product not found');

        const feedbackHashes: string[] = [];
        for (let i = 0; i < this.feedbackCounter; i++) {
            const feedback = this.feedbacks.get(i.toString());
            if (feedback && feedback.productId === productId) {
                feedbackHashes.push(feedback.feedbackHash);
            }
        }

        return feedbackHashes;
    }

    @view({})
    getProductByHash({ productHash }: { productHash: string }): Product | null {
        for (let id = 0; id < this.productCounter; id++) {
            const product = this.products.get(id.toString());
            if (product && product.productHash === productHash) {
                return product;
            }
        }

        assert(false, 'Product not found');
        return null;
    }

    @view({})
    getFeedback({ feedbackId }: { feedbackId: number }): Feedback | null {
        const feedback = this.feedbacks.get(feedbackId.toString());
        assert(feedback && feedback.exists, 'Feedback does not exist');
        return feedback;
    }

    @view({})
    getAllProducts(): string[] {
        const productHashes: string[] = [];
        for (let id = 0; id < this.productCounter; id++) {
            const product = this.products.get(id.toString());
            if (product) {
                productHashes.push(product.productHash);
            }
        }
        return productHashes;
    }

    @view({})
    getAllFeedbacks(): string[] {
        const feedbackHashes: string[] = [];
        for (let id = 0; id < this.feedbackCounter; id++) {
            const feedback = this.feedbacks.get(id.toString());
            if (feedback) {
                feedbackHashes.push(feedback.feedbackHash);
            }
        }
        return feedbackHashes;
    }

    @view({})
    getProductCount(): number {
        return this.productCounter;
    }

    @view({})
    getFeedbackCount(): number {
        return this.feedbackCounter;
    }

    @view({})
    isProductApproved({ productHash }: { productHash: string }): boolean {
        for (let id = 0; id < this.productCounter; id++) {
            const product = this.products.get(id.toString());
            if (product && product.productHash === productHash) {
                return product.status === 'Approved';
            }
        }
        return false;
    }
}


interface Product {
    id: number;
    productHash: string;
    creator: string;
    status: string;
    exists: boolean;
}

interface Feedback {
    id: number;
    productId: number;
    feedbackHash: string;
    submitter: string;
    timestamp: number;  
    exists: boolean;
}
