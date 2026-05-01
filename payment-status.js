(function () {
  const API_BASE = window.EASYTRAVEL_API_BASE || '';
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('order_id');
  const messageEl = document.getElementById('paymentStatusMessage');
  const cardEl = document.getElementById('paymentStatusCard');

  async function verify() {
    if (!orderId) {
      messageEl.textContent = 'order_id missing hai. Payment status verify nahi ho pa raha.';
      cardEl.innerHTML = '<strong>Tip:</strong> Cashfree return_url me order_id pass hona chahiye.';
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/payments/verify/${encodeURIComponent(orderId)}`);
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.message || 'Verification failed');

      const order = data.order || {};
      const booking = data.booking || {};
      const paid = order.order_status === 'PAID';
      messageEl.textContent = paid
        ? 'Payment successful. Booking status backend aur MongoDB me update ho gaya.'
        : `Payment status: ${order.order_status || 'PENDING'}`;

      cardEl.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;font-size:18px;color:#243b67">
          <div><strong>Order ID</strong><br>${order.order_id || orderId}</div>
          <div><strong>Order status</strong><br>${order.order_status || 'Unknown'}</div>
          <div><strong>Amount</strong><br>₹${Number(order.order_amount || booking.paymentAmount || 0).toLocaleString('en-IN')}</div>
          <div><strong>Destination</strong><br>${booking.destination || 'Travel package'}</div>
          <div><strong>Traveller</strong><br>${booking.fullName || 'NA'}</div>
          <div><strong>Payment method</strong><br>${booking.paymentMethod || 'Cashfree'}</div>
        </div>
      `;
    } catch (error) {
      messageEl.textContent = 'Verification error aa gaya.';
      cardEl.innerHTML = `<strong>Error:</strong> ${error.message}`;
    }
  }

  verify();
})();
