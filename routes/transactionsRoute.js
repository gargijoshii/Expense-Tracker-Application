const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();
const moment = require("moment"); // Import moment library

router.post("/add-transaction", async function (req, res) {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.send("Transaction Added Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/edit-transaction", async function (req, res) {
  try {
    await Transaction.findByIdAndUpdate
    (req.body.transactionId, req.body.payload);
    res.send("Transaction Updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
}
);

router.post("/delete-transaction", async function (req, res) {
  try {
    await Transaction.findByIdAndDelete(req.body.transactionId);
    res.send("Transaction Deleted Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});



router.post("/get-all-transactions", async (req, res) => {
  const { frequency, selectedRange, type } = req.body;
  try {
    const transactions = await Transaction.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: moment(selectedRange[0]).toDate(),
              $lte: moment(selectedRange[1]).toDate(),
            },
          }),

      userid: req.body.userid,
      ...(type !== "all" && {type}),
    });

    res.send(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
