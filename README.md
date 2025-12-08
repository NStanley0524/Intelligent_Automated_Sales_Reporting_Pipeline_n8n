# Intelligent_Automated_Sales_Reporting_Pipeline

This project is an **end-to-end automated sales reporting pipeline** built using **n8n**. It processes raw daily sales, aggregates metrics by region, generates personalized reports, and emails each regional manager automatically every morning.

The pipeline is fully autonomous and requires **zero manual intervention** once deployed.

---

## Features

### Automated Daily Sales Fetching  
- Pulls raw data from Google Sheets
- Cleans & formats timestamps   
- Extracts only yesterday’s sales  
- Supports unlimited daily sales volume  

### Regional Aggregation Engine  
- Calculates:
  - Total revenue per region  
  - Product-level revenue  
  - Record counts  
- Dynamically joins sales with manager lookup table  

### Personalized HTML Email Generation  
Each manager receives a unique summary containing:
- Their region’s total sales  
- Product-by-product breakdown  
- Date of report   

### Conditional Branching (Switch Node)  
Routes each regional summary to the correct recipient:
- North America  
- Europe  
- Asia  
- South America  

### Logging System  
- Tracks successful emails  
- Captures errors with region + timestamp  

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **n8n** | Workflow automation engine |
| **Google Sheets** | Data store (Sales + Managers) |
| **JavaScript (Code Node)** | Transformations & metrics |
| **Gmail API** | Email delivery |
| **Google Drive** | File access for sheets |

---
