import React, { useEffect, useState } from 'react'

const Invoices = () => {
  const [carts, setCarts] = useState([])

  useEffect(()=>{
    getCarts()
  }, [])

  const getCarts = () => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    setCarts(cart)
    console.log(cart);
    
  }

  return (
    <div>
      <div class="container my-5">
        <div class="invoice-header text-center">
          <h1 class="invoice-title">Invoice</h1>
          <p class="mb-0">Your Company Name</p>
          <p class="mb-0">1234 Main Street, City, Country</p>
          <p>Email: contact@yourcompany.com | Phone: +123 456 7890</p>
        </div>

        <div class="row mt-4">
          <div class="col-md-6">
            <h5>Bill To:</h5>
            <p>
                Client Name<br/>
                5678 Client Street<br/>
                City, Country<br/>
                Email: client@example.com
            </p>
          </div>
          <div class="col-md-6 text-md-end">
            <h5>Invoice Details:</h5>
            <p>
                Invoice #: 001<br/>
                Date: 2024-11-26<br/>
                Due Date: 2024-12-01
            </p>
          </div>
        </div>

          <table class="table table-bordered invoice-table mt-4">
              <thead class="table-light">
                  <tr>
                      <th>#</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>1</td>
                      <td>Product/Service Name</td>
                      <td>2</td>
                      <td>$50.00</td>
                      <td>$100.00</td>
                  </tr>
                  <tr>
                      <td>2</td>
                      <td>Another Product/Service</td>
                      <td>1</td>
                      <td>$75.00</td>
                      <td>$75.00</td>
                  </tr>
              </tbody>
          </table>

          <div class="row">
              <div class="col-md-6"></div>
              <div class="col-md-6">
                  <table class="table table-borderless table-summary">
                      <tbody>
                          <tr>
                              <td>Subtotal:</td>
                              <td class="text-end">$175.00</td>
                          </tr>
                          <tr>
                              <td>Tax (10%):</td>
                              <td class="text-end">$17.50</td>
                          </tr>
                          <tr>
                              <td>Total:</td>
                              <td class="text-end">$192.50</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>

          <div class="text-center mt-4">
              <p>Thank you for your business!</p>
              <p>If you have any questions, feel free to contact us at contact@yourcompany.com.</p>
          </div>
      </div>
    </div>
  )
}

export default Invoices
