const mockData = [
  {
    id: "4402a0857d0d8744b628497629fdab0321409b0b",
    parentId: "21143936ef1d1b350c3694dc8af0530b8434b39b",
    message: "브랜치 성공",
  },
  {
    id: "21143936ef1d1b350c3694dc8af0530b8434b39b",
    parentId: "f6cfd82dfea8ac87b3150d441f1ca71aff418df2",
    message: "test",
  },
  {
    id: "75c4aca42bfedcb90bcd9f65be28bd9e013ad971",
    parentId: "f6cfd82dfea8ac87b3150d441f1ca71aff418df2",
    message: "config: gitignore에 zero-install 추가",
  },
  {
    id: "f6cfd82dfea8ac87b3150d441f1ca71aff418df2",
    parentId: "",
    message: "config: 기본 개발 환경 세팅",
  },
];

const newMockData = [
  {
    id: "4402a0857d0d8744b628497629fdab0321409b0b",
    parentId: "21143936ef1d1b350c3694dc8af0530b8434b39b",
    message: "브랜치 성공",
  },
  {
    id: "21143936ef1d1b350c3694dc8af0530b8434b39b",
    parentId: "f6cfd82dfea8ac87b3150d441f1ca71aff418df2",
    message: "test",
  },
  {
    id: "75c4aca42bfedcb90bcd9f65be28bd9e013ad971",
    parentId: "f6cfd82dfea8ac87b3150d441f1ca71aff418df2",
    message: "config: gitignore에 zero-install 추가",
  },
  {
    id: "33333",
    parentId: "44444",
    message: "추가1",
  },
  {
    id: "44444",
    parentId: "f6cfd82dfea8ac87b3150d441f1ca71aff418df2",
    message: "추가2",
  },
  {
    id: "f6cfd82dfea8ac87b3150d441f1ca71aff418df2",
    parentId: "",
    message: "config: 기본 개발 환경 세팅",
  },
];
import React, { useState, useEffect } from "react";
import { select, tree, hierarchy } from "d3";

function renderD3(data) {
  // Stratify the data
  const stratify = d3
    .stratify()
    .parentId((d) => d.parentId)
    .id((d) => d.id);
  const rootNode = stratify(data);

  // Create a tree layout
  const treeLayout = tree().size([400, 300]);

  // Apply the tree layout to the hierarchical data
  const treeData = treeLayout(rootNode);
  debugger;

  // Select the root of the tree and bind the data
  const svg = select("body")
    .append("svg")
    .attr("width", 600)
    .attr("height", 400)
    .append("g")
    .attr("transform", "translate(50,50)");

  // Draw edges (links) between nodes
  svg
    .selectAll("line")
    .data(treeData.links())
    .join(
      (enter) =>
        enter
          .append("line")
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y)
          .attr("stroke", "black")
          .style("opacity", 0),
      (update) => update,
      (exit) => exit.transition().duration(1000).attr("cy", 500).remove()
    )
    .transition()
    .duration(1000)
    .style("opacity", 0.75);

  // Draw nodes
  const nodes = svg
    .selectAll("g")
    .data(treeData.descendants())
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

  nodes.append("circle").attr("r", 10).style("opacity", 0);
  d3.select("svg")
    .selectAll("circle")
    .data(treeData.descendants())
    .join(
      (enter) => enter,
      (update) => update,
      (exit) => exit.transition().duration(1000).attr("cy", 500).remove()
    )
    .transition()
    .duration(1000)
    .style("opacity", 1);
  // Add text next to each node

  nodes
    .append("text")
    .attr("x", 15) // Adjust the x position according to your needs
    .style("opacity", 0)
    .text((d) => d.data.message);

  d3.select("svg")
    .selectAll("text")
    .data(treeData.descendants())
    .join(
      (enter) => enter,
      (update) => update,
      (exit) => exit.transition().duration(1000).attr("cy", 500).remove()
    )
    .transition()
    .duration(1000)
    .attr("cx", (d) => d)
    .style("opacity", 1);
}

function App() {
  const [data, setData] = useState(mockData);
  //
  // useEffect(() => {
  //
  // }, []);
  useEffect(() => {
    renderD3(data);
  }, [data]);

  const handleNewData = () => {
    setData(newMockData);
  };
  return (
    <>
      <button onClick={handleNewData}>click</button>
    </>
  ); // Replace with your actual JSX
}

export default App;
