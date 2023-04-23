import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import Layout from "./../components/Layout";

const { Option } = Select;

const Insurance = () => {
  const [selectedPlan, setSelectedPlan] = useState("basic");

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Layout>
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Your Insurance Package Plan</h2>
        <p>
          You have selected <strong>{selectedPlan}</strong> package plan.
        </p>
        <h3>Select your plan:</h3>
        <div className="mb-3">
          <Button
            type={selectedPlan === "basic" ? "primary" : "default"}
            onClick={() => handlePlanSelection("basic")}
            disabled={selectedPlan === "basic"}
          >
            Basic
          </Button>
          <Button
            type={selectedPlan === "standard" ? "primary" : "default"}
            onClick={() => handlePlanSelection("standard")}
            disabled={selectedPlan === "standard"}
          >
            Standard
          </Button>
          <Button
            type={selectedPlan === "premium" ? "primary" : "default"}
            onClick={() => handlePlanSelection("premium")}
            disabled={selectedPlan === "premium"}
          >
            Premium
          </Button>
        </div>
        <h3>Get a custom quote:</h3>
        <Form onFinish={onFinish}>
          <Form.Item
            name="gender"
            rules={[{ required: true, message: "Please select your gender" }]}
          >
            <Select placeholder="Select Gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="age"
            rules={[{ required: true, message: "Please enter your age" }]}
          >
            <Input placeholder="Age" type="number" />
          </Form.Item>
          <Form.Item
            name="coverageAmount"
            rules={[
              { required: true, message: "Please enter the coverage amount" },
            ]}
          >
            <Input placeholder="Coverage Amount" type="number" />
          </Form.Item>
          <Form.Item
            name="coverageType"
            rules={[
              { required: true, message: "Please select the coverage type" },
            ]}
          >
            <Select placeholder="Select Coverage Type">
              <Option value="life">Life Insurance</Option>
              <Option value="health">Health Insurance</Option>
              <Option value="auto">Auto Insurance</Option>
              <Option value="home">Home Insurance</Option>
            </Select>
          </Form.Item>
          <Form.Item name="customQuote">
            <Input.TextArea placeholder="Custom Requirements" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Get Quote
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default Insurance;
