const Subscription = require('../models/Subscription');
module.exports = {
    async create(req,res){
        const { user_id } = req.headers;
        const { eventId } = req.params;
        const { date } = req.body;

        const subscription = await Subscription.create({
            user:user_id,
            event:eventId,
            date
        })

        await subscription
        .populate('event')
        .populate('user', '-password')
        .execPopulate();
        return res.json(subscription)

    },
    async getSubscriptionById(req,res){
        const { subscription_id } = req.params;
        try {
            const subscription = await Subscription.findById(subscription_id)
            await subscription
                .populate('event')
                .populate('user', '-password')
                .execPopulate();
            return res.json(subscription)
        } catch (error) {
            return res.status(400).json({message : "Subscription not found"})
        }
    }
}