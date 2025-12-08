# Workflow Diagram

```mermaid
flowchart TD

A[Daily Trigger] --> B[Read Sales Data]
B --> C[Filter Yesterday]
C --> D[Calculate Metrics]

A --> E[Read Managers]
E --> F[Format Manager Fields]

D --> G[Merge sales data by Region]
F --> G[Merge managers data by Region]

G --> H[Check whether Email is available]
H --> I[Switch Node]

I --> J[NA Email]
I --> K[EU Email]
I --> L[Asia Email]
I --> M[SA Email]

J --> N[Log NA]
K --> O[Log EU]
L --> P[Log Asia]
M --> Q[Log SA]