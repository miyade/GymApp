const Subscription = require('../models/Subscription');
module.exports = {
   async reject(req,res){
    const { subscription_id } = req.params;
    try {
        const { subscription } = await Subscription.findById(subscription_id);
        subscription.approved= false;
        await subscription.save();
        return res.json(subscription);
    } catch (error) {
        return res.status(400).json(error);
    }
   }
}