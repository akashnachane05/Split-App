const API = "https://split-app-production-7372.up.railway.app"; // Replace with actual deployed URL

document.getElementById("expenseForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const amount = parseFloat(document.getElementById("amount").value);
  const description = document.getElementById("description").value.trim();
  const paid_by = document.getElementById("paidBy").value.trim();
  const participants = document.getElementById("participants").value.split(",").map(p => p.trim());

  const res = await fetch(`${API}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, description, paid_by, participants })
  });

  if (res.ok) {
    alert("Expense added successfully!");
    document.getElementById("expenseForm").reset();
    loadDashboard();
  } else {
    alert("Failed to add expense");
  }
});

async function loadDashboard() {
  const [peopleRes, balancesRes, settlementsRes, expensesRes] = await Promise.all([
    fetch(`${API}/people`),
    fetch(`${API}/balances`),
    fetch(`${API}/settlements`),
    fetch(`${API}/expenses`)
  ]);

  const people = (await peopleRes.json()).data || [];
  const balances = (await balancesRes.json()).data || {};
  const settlements = (await settlementsRes.json()).data || [];
  const expenses = (await expensesRes.json()).data || [];

  // Summary Stats
  document.getElementById("personCount").textContent = people.length;
  document.getElementById("expenseCount").textContent = expenses.length;

  // Balances
  const balanceList = document.getElementById("balanceList");
  balanceList.innerHTML = "";
  Object.entries(balances).forEach(([person, amt]) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${person}: ₹${amt.toFixed(2)}`;
    balanceList.appendChild(li);
  });

  // Settlements
  const settlementList = document.getElementById("settlementList");
  settlementList.innerHTML = "";
  if (settlements.length === 0) {
    settlementList.innerHTML = "<li class='list-group-item'>All settled up! ✅</li>";
  } else {
    settlements.forEach(({ from, to, amount }) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `${from} → ${to}: ₹${amount}`;
      settlementList.appendChild(li);
    });
  }
}

window.onload = loadDashboard;
