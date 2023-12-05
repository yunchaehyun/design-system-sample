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

import logo from './logo.svg';
import './App.css';
import { select, tree, hierarchy } from 'd3'; // Removed unnecessary imports

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
      .id(d => d.id);

  const rootNode = stratify(data);

  // Create a tree layout
  const treeLayout = d3.tree().size([500, 300]);

  // Apply the tree layout to the hierarchical data
  const treeData = treeLayout(rootNode);

  // Select the root of the tree and bind the data
  const nodes = select("body")
      .append("svg")
      .attr("width", 600)
      .attr("height", 400)
      .append("g")
      .attr("transform", "translate(50,50)")
      .selectAll("circle")
      .data(treeData.descendants())
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 10);

  // Draw edges (links) between nodes
  select("svg g")
      .selectAll("line")
      .data(treeData.links())
      .enter()
      .append("line")
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)
      .attr("stroke", "black");

  return null; // Replace with your actual JSX
}

export default App;
