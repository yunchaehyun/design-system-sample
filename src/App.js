// import logo from './logo.svg';
// import './App.css';
// import { select, json, tree, hierarchy, linkHorizontal, stratify } from 'd3';
//
//
// function App() {
//
//   const data =
//  [   {
//       "id": "4402a0857d0d8744b628497629fdab0321409b0b",
//       "parentId": "21143936ef1d1b350c3694dc8af0530b8434b39b"
//     },
//     {
//       "id": "21143936ef1d1b350c3694dc8af0530b8434b39b",
//       "parentId": "f6cfd82dfea8ac87b3150d441f1ca71aff418df2"
//     },
//     {
//       "id": "75c4aca42bfedcb90bcd9f65be28bd9e013ad971",
//       "parentId": "f6cfd82dfea8ac87b3150d441f1ca71aff418df2"
//     },
//     {
//       "id": "f6cfd82dfea8ac87b3150d441f1ca71aff418df2",
//       "parentId": ""
//     },]
//
//
//   const stratify = d3.stratify()
//       .parentId(d => d.parentId)
//       .id(d => d.id)
//
//   const rootNode = stratify(data);
//   console.log(rootNode);
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;

import React from 'react';
import { select, tree, hierarchy } from 'd3';

function App() {
  const data = [
    {
      "id": "4402a0857d0d8744b628497629fdab0321409b0b",
      "parentId": "21143936ef1d1b350c3694dc8af0530b8434b39b",
      "message": "브랜치 성공"
    },
    {
      "id": "21143936ef1d1b350c3694dc8af0530b8434b39b",
      "parentId": "f6cfd82dfea8ac87b3150d441f1ca71aff418df2",
      "message": "test"
    },
    {
      "id": "75c4aca42bfedcb90bcd9f65be28bd9e013ad971",
      "parentId": "f6cfd82dfea8ac87b3150d441f1ca71aff418df2",
      "message": "config: gitignore에 zero-install 추가"
    },
    {
      "id": "f6cfd82dfea8ac87b3150d441f1ca71aff418df2",
      "parentId": "",
      "message": "config: 기본 개발 환경 세팅"
    },
  ];

  // Stratify the data
  const stratify = d3.stratify()
      .parentId(d => d.parentId)
      .id(d => d.id)
  const rootNode = stratify(data);

  // Create a tree layout
  const treeLayout = tree().size([500, 300]);

  // Apply the tree layout to the hierarchical data
  const treeData = treeLayout(rootNode);

  // Select the root of the tree and bind the data
  const svg = select("body")
      .append("svg")
      .attr("width", 600)
      .attr("height", 400)
      .append("g")
      .attr("transform", "translate(50,50)");

  // Draw edges (links) between nodes
  svg.selectAll("line")
      .data(treeData.links())
      .enter()
      .append("line")
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)
      .attr("stroke", "black");

  // Draw nodes
  const nodes = svg.selectAll("g")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x}, ${d.y})`);

  nodes.append("circle")
      .attr("r", 10);

  // Add text next to each node
  nodes.append("text")
      .attr("x", 15) // Adjust the x position according to your needs
      .text(d => d.data.message);

  return null; // Replace with your actual JSX
}

export default App;
