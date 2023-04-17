const request = require("supertest");
// const app = require('../index');
// const express = require('express');

// const { app } = require("../index");
const app = require("../index");

describe("Customer Routes", () => {
  let customerId;

  test("POST /create should create a new customer", async () => {
    const customer = { name: "John Doe", email: "john.doe@example.com", phone: "9999999999" };
    const response = await request(app)
      .post("/create")
      .send(customer)
      .expect(201);

      console.log(response);

    customerId = response.body._id;
    expect(response.body.user.name).toBe(customer.name);
    expect(response.body.user.email).toBe(customer.email);
    expect(response.body.user.phone).toBe(customer.phone);
  });

  test("GET /:id should return the specified customer", async () => {
    const response = await request(app)
      .get(`/customers/${customerId}`)
      .expect(200);

    expect(response.body.id).toBe(customerId);
    expect(response.body.name).toBe("John Doe");
    expect(response.body.email).toBe("john.doe@example.com");
  });

  test("GET /:id should return 404 if the customer is not found", async () => {
    const response = await request(app).get("/customers/99999").expect(404);

    expect(response.body.message).toBe("Customer not found");
  });

  test("PUT /:id should update the specified customer", async () => {
    const updatedCustomer = { name: "Jane Doe", email: "jane.doe@example.com" };
    const response = await request(app)
      .put(`/customers/${customerId}`)
      .send(updatedCustomer)
      .expect(200);

    expect(response.body.id).toBe(customerId);
    expect(response.body.name).toBe("Jane Doe");
    expect(response.body.email).toBe("jane.doe@example.com");
  });

  test("PUT /:id should return 404 if the customer is not found", async () => {
    const updatedCustomer = { name: "Jane Doe", email: "jane.doe@example.com" };
    const response = await request(app)
      .put("/customers/99999")
      .send(updatedCustomer)
      .expect(404);

    expect(response.body.message).toBe("Customer not found");
  });

  test("DELETE /:id should delete the specified customer", async () => {
    const response = await request(app)
      .delete(`/customers/${customerId}`)
      .expect(200);

    expect(response.body.message).toBe("Customer deleted successfully");
  });

  test("DELETE /:id should return 404 if the customer is not found", async () => {
    const response = await request(app).delete("/customers/99999").expect(404);

    expect(response.body.message).toBe("Customer not found");
  });
});
