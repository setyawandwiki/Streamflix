const snapMidtrans = require("../config/midtrans");

const post = (data) =>
  new Promise((resolve, reject) => {
    const parameter = {
      transaction_details: {
        order_id: data._id,
        gross_amount: data.price,
      },
      credit_card: {
        secure: true,
      },
    };

    snapMidtrans
      .createTransaction(parameter)
      .then((transaction) => {
        // transaction redirect_url
        const redirectUrl = transaction.redirect_url;
        console.log("redirectUrl:", redirectUrl);
        resolve(transaction);
      })
      .catch((e) => reject(e));
  });

module.exports = {
  post,
};
