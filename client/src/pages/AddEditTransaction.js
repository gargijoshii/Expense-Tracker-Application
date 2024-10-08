import { Modal, Form, Input, Select, message } from "antd";
import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

function AddEditTransaction({
  showAddEditTransactionModal,
  setShowAddEditTransactionModal,
  selectedItemForEdit,
  setSelectedItemForEdit,
  getTransactions,
}) {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("spendwise-user"));
      setLoading(true);
      if (selectedItemForEdit) {
        await axios.post("/api/transactions/edit-transaction", {
          payload: {
            ...values,
            userid: user._id,
          },
          transactionId: selectedItemForEdit._id,
        });
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post("/api/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        message.success("Transaction Added Successfully");
      }
      setShowAddEditTransactionModal(false);
      setSelectedItemForEdit(null);
      getTransactions();
    } catch (error) {
      message.error("Something Went Wrong");
    }
    setLoading(false);
  };

  return (
    <Modal
      title={selectedItemForEdit ? "Edit Transaction" : "Add Transaction"}
      open={showAddEditTransactionModal}
      onCancel={() => {
        setShowAddEditTransactionModal(false);
        setSelectedItemForEdit(null);
      }}
      footer={null}
    >
      {loading && <Spinner />}
      <Form layout="vertical" className="transaction-form" onFinish={onFinish} initialValues={selectedItemForEdit}>
        <Form.Item label="Amount" name="amount">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Type" name="type">
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Category" name="category">
          <Select>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="shopping">Shopping</Select.Option>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="rent">Rent</Select.Option>
            <Select.Option value="tax">Tax</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>
            <Select.Option value="education">Education</Select.Option>
            <Select.Option value="medical">Medical</Select.Option>
            <Select.Option value="entertainment">Entertainment</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Date" name="date">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Reference" name="reference">
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input type="text" />
        </Form.Item>

        <div className="d-flex justify-content-end">
          <button className="primary" type="submit">
            SAVE
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditTransaction;
