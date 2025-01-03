<p align="center"><b>EF234304 - Graph Theory 2024/2025</b><br>Institut Teknologi Sepuluh Nopember</p>
<br>
<p align="center"><img src="https://i.ibb.co.com/2gLgWws/image.png" style="transform: scale(0.5);"></p>
<br>
<p align="center">Project by <a href="https://github.com/samuelljk">Samuel</a>, <a href="https://github.com/Zefanya211004">Zefanya</a>,and <a href="https://github.com/IhsanRahadian">Ihsan</a></p>

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/0_yE0bFY)

# Dynamic Package Delivery Optimization in Urban Areas


### Introduction of the problem and how graph theory is implemented

Urban package delivery companies face challenges in creating optimized routes for delivering packages to multiple locations while minimizing costs and delivery times. In densely populated or high-traffic urban areas, the delivery routes need to be adaptable to real-time changes, such as traffic delays or road closures. The goal is to deliver packages efficiently, ensure all destinations are reachable, and adjust routes dynamically.

This application tackle this by using graph theory to:
- Calculate the shortest route to cover all delivery points.
- Minimize the overall distance and cost of the network.
- Ensure that packages can reach their destinations even if certain routes are temporarily blocked.

## How to Use the Web App
<img width="1440" alt="Screenshot 2024-12-10 at 13 57 25" src="https://github.com/user-attachments/assets/222c1656-c91b-4210-9d01-28e1dddc80d0">


- Enter the locations/edges of the delivery with the format (LocationA, LocationB, Weight/Cost)
- Enter the edges where there's a road block(LocationA, LocationB)
- Enter the edges where there's a traffic(LocationA, LocationB,Level[*Level goes from 1-3 with 1 as low traffic, 2 as medium, and 3 as high traffic*])
- Enter the starting point/depot
- Enter the delivery point
- Press process data

### Test Input and Output:
<img width="1440" alt="Screenshot 2024-12-10 at 14 02 54" src="https://github.com/user-attachments/assets/f3e0b774-7621-45ed-b8f1-4555fd165de9">

## Test Result Summarization and Analysis
Graph:
The graph shows the route to each location with three different type of edges, blue edge shows normal route, dotted edge shows blocked route, and green edge shows traffic(*the edge can vary in color based on the traffic level*). It also shows the weight for each edges

MST Edges:
The Minimum Spanning Tree (MST) connects all nodes with the least total distance without forming a cycle.
The edges in the MST are:
(A-D) (30), (D-E) (20), (D-C) (30), and (C-B) (20).

Optimized TSP Route:
A modified Traveling Salesperson Problem (TSP) route, optimized considering traffic data and blocked roads.
The route is: B → D → E → B.
This route minimizes total travel distance while ensuring all delivery points are visited starting and ending at the depot.

Connectivity Status:
All delivery points (D and E) are reachable despite the blocked road (A-B). Alternative paths were identified.

Shortest Path to First Delivery Point (D):
The shortest path from the starting depot (B) to the first delivery point (D) is: B → C → D, with a distance of 50.
Analysis

Effectiveness of MST:
- The MST provides a cost-efficient backbone, minimizing the total distance to connect all delivery points and depots.
It excludes the blocked edge (A-B) and relies on alternate paths like B-C and A-D.

Adaptation of TSP:
- The optimized TSP considers roadblocks and traffic conditions to find a feasible route.
While blocked roads like A-B are avoided, traffic levels influence priority (e.g., lighter traffic on A-E might reduce its cost impact).

Dynamic Routing:
The shortest path calculation demonstrates the system's adaptability to prioritize delivery points based on real-time constraints.
Traffic levels likely influence edge weights, enabling B → C → D (50 units) instead of direct but costlier paths.

Practical Implications:
This output aligns with real-world challenges of urban delivery: roadblocks, traffic, and cost optimization.
The approach ensures service reliability (connectivity) while maintaining efficiency (minimal distance).


## Conclusion

The output showcases a robust application of graph theory:
MST ensures the network's foundational efficiency.
Modified TSP provides adaptability to real-time constraints.
Dynamic pathfinding like B → C → D highlights traffic-aware routing.
This combination achieves cost-efficient, reliable, and adaptable delivery routing in complex urban environments.
