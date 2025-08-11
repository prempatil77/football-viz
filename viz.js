const dscc = require('dscc');
const Chart = require('chart.js/auto');

let chart;

function drawViz(data) {
  const ctx = document.getElementById('chart').getContext('2d');

  const labels = data.fields.metrics.map(field => field.name);
  const values = data.tables.DEFAULT.map(row => row[0]);

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: data.style.type.value || 'radar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Assessment Scores',
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: data.style.type.value === 'bar' ? {
        y: { beginAtZero: true, max: 10 }
      } : {}
    }
  });
}

dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });