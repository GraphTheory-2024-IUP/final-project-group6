[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/0_yE0bFY)

**Dynamic Package Delivery Optimization in Urban Areas**


**Shortly introduce the problem and how graph theory is implemented**

Urban package delivery companies face challenges in creating optimized routes for delivering packages to multiple locations while minimizing costs and delivery times. In densely populated or high-traffic urban areas, the delivery routes need to be adaptable to real-time changes, such as traffic delays or road closures. The goal is to deliver packages efficiently, ensure all destinations are reachable, and adjust routes dynamically.

This application tackle this by using graph theory to:
- Calculate the shortest route to cover all delivery points.
- Minimize the overall distance and cost of the network.
- Ensure that packages can reach their destinations even if certain routes are temporarily blocked.

How to Use the Web App
<img width="1440" alt="Screenshot 2024-12-10 at 03 45 27" src="https://github.com/user-attachments/assets/0078344d-575c-41aa-a969-22edd4bce6cf">
<img width="1440" alt="Screenshot 2024-12-10 at 03 46 38" src="https://github.com/user-attachments/assets/59d563cf-384c-489a-9750-53adccd871d9">

- Enter the locations/edges of the delivery with the format (LocationA, LocationB, Weight/Cost)
- Enter the edges where there's a road block(LocationA, LocationB)
- Enter the edges where there's a traffic(LocationA, LocationB,Level[*Level goes from 1-3 with 1 as low traffic, 2 as medium, and 3 as high traffic])
- Enter the starting point/depot
- Enter the delivery point
- Press process data

Test Input:
<img width="1440" alt="Screenshot 2024-12-10 at 03 57 08" src="https://github.com/user-attachments/assets/e8e6ab8e-fcd1-4984-89c1-c415e6874561">


Test Output:
<img width="1440" alt="Screenshot 2024-12-10 at 03 57 58" src="https://github.com/user-attachments/assets/43389115-9ee4-44bf-9c90-000d24929e60">
