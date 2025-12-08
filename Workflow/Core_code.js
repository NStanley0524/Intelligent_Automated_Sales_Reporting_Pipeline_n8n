// INPUT: your Google Sheets node already filtered to yesterday, so `rows` are only yesterday's rows
const rows = $input.all().map(i => i.json || {});

// === Replace this mapping with your actual manager emails or load from a sheet ===
const managerEmailByRegion = {
  "Asia": "asia.manager@company.com",
  "North America": "na.manager@company.com",
  "Europe": "europe.manager@company.com",
  "South America": "sa.manager@company.com",
  "Africa": "africa.manager@company.com",
  "Oceania": "oceania.manager@company.com",
  // add or remove regions as needed
};

// Helper: safe number
function toNum(v){
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

// Aggregation containers
const regionTotals = {};     // region -> total number
const regionByProduct = {};  // region -> { product -> total }
const regionRowCount = {};   // region -> rows processed

// Determine amount per row: prefer Amount, otherwise Quantity * Unit_Price
for (const r of rows){
  const product = (r.Product || r.product || 'Unknown').toString();
  const region = (r.Region || r.region || 'Unknown').toString();

  let amount = 0;
  if (r.Amount !== undefined && r.Amount !== null && r.Amount !== "") {
    amount = toNum(r.Amount);
  } else {
    const qty = toNum(r.Quantity || r.Quantity_s || 0);
    const price = toNum(r.Unit_Price || r.UnitPrice || r.Unit_Price_NGN || 0);
    amount = qty * price;
  }
  if (!Number.isFinite(amount)) amount = 0;

  regionTotals[region] = (regionTotals[region] || 0) + amount;
  regionByProduct[region] = regionByProduct[region] || {};
  regionByProduct[region][product] = (regionByProduct[region][product] || 0) + amount;
  regionRowCount[region] = (regionRowCount[region] || 0) + 1;
}

// Helper to format Naira (or change locale/format as desired)
function fmt(n){
  return Number(n).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Build output items: one per region
const output = [];
for (const region of Object.keys(regionTotals)) {
  const byProduct = regionByProduct[region] || {};
  const productListHtml = Object.entries(byProduct)
    .map(([k,v]) => `${k}: ₦${fmt(v)}`)
    .join('<br>');
  const regionListHtml = `${region}: ₦${fmt(regionTotals[region])}`;

  const managerEmail = managerEmailByRegion[region] || ''; // blank if not mapped

  output.push({
    json: {
      region,
      managerEmail,
      totalSales: regionTotals[region],
      totalSalesFormatted: fmt(regionTotals[region]),
      productList: productListHtml,
      rowsProcessed: regionRowCount[region] || 0,
      // if you want to include raw product totals too:
      byProduct
    }
  });
}

return output;
