import {
    createSubscriber,
    findSubscriberByEmail,
} from '@/backend/repositories/blogSubscribeRepository';

export async function subscribeEmail(email: string) {
    const existingSubscriber = await findSubscriberByEmail(email);

    if (existingSubscriber) {
        return { subscribed: true, message: 'Already subscribed' };
    }

    await createSubscriber(email);
    return { subscribed: true, message: 'Subscription successful' };
}
