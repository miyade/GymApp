const Subscription = require('../models/Subscription');
module.exports = {
    async approve(req,res){
        const { subscription_id } = req.params;

        try {
            const subscription = await Subscription.findById(subscription_id);
            subscription.approved= true;
            await subscription.save();
            return res.json(subscription);
            
        } catch (error) {
            return res.status(400).json(error)
        }
        
    }
}