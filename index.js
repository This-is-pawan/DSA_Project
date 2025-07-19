const box = document.querySelector(".box");
const btn = document.querySelector(".btns");
const clear = document.querySelector(".clears");
const input = document.querySelector("input");
const Sort = document.querySelector(".sorting_btn");
const clearSort = document.querySelector(".sorting_btnClear");
const graph = document.querySelector(".graph_grid");
// console.log(Sort,clearSort,graph);

let numValue = 1;

// Input handler
input.addEventListener("input", (e) => {
  const value = e.target.value;
  if (value > 20) {
    input.value = 20;
  }
  numValue = value ? parseInt(value) : 5;
});

const states = new Array(10).fill("");
box.innerHTML = states.map(() => `<div class='boxs'></div>`).join("");

// Search handler

const handleClick = () => {
  const boxElements = document.querySelectorAll(".boxs");

  const linerSearching = (arr, target) => {
    let i = 1;

    const interval = setInterval(() => {
      if (i > arr.length) {
        clearInterval(interval);
        return;
      }

      const currentBox = boxElements[i - 1];

      const div = document.createElement("div");
      div.className = "newbox";
      div.textContent = i;

      div.style.left = `${currentBox.offsetLeft}px`;
      div.style.top = `${currentBox.offsetTop}px`;

      box.appendChild(div);

      if (i === target) {
        currentBox.style.background = "green";
        clearInterval(interval);
      } else {
        currentBox.style.background = "";
      
      }

      i++;
    }, 1000);
  };

  linerSearching(states, numValue);
};

// Button events
btn.addEventListener("click", handleClick);
clear.addEventListener("click", () => {
  location.reload();
});

  
// bubble sort
  const arrgraph = new Array(15)
  .fill(0)
  .map(() => Math.floor(Math.random() * 70) + 1);

let reversed = false;

// Render graph bars
function renderGraph(arr, reversed = false, activeIndices = []) {
  graph.innerHTML = arr
    .map((value, index) => {
      let bgColor = "yellow";
      if (activeIndices.includes(index)) {
        bgColor = "blue"; // highlight bars being compared
      } else if (reversed) {
        bgColor = "green"; // final sorted
      }
      return `<div class='graph' style="height:${value * 3}px; background:${bgColor};" title="${value}">${value}</div>`;
    })
    .join("");
}

// Bubble sort with animation
async function bubbleSort(arr) {
  let newArr = [...arr];
  for (let i = newArr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      renderGraph(newArr, false, [j, j + 1]); // highlight comparing bars
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (newArr[j] > newArr[j + 1]) {
        // swap
        let temp = newArr[j];
        // console.log(temp);
        
        newArr[j] = newArr[j + 1];
        // console.log(newArr[j]);
        
        newArr[j + 1] = temp;
        // console.log(newArr[j+1]);
        
      }
    }
  }
  return newArr;
}

// Button events
btn.addEventListener("click", handleClick);

Sort.addEventListener("click", async () => {
  reversed = true;
  const sortedArr = await bubbleSort(arrgraph);
  renderGraph(sortedArr, reversed); // all green after sort
});

clearSort.addEventListener("click", () => {
  location.reload();
});

// Initial render
renderGraph(arrgraph);
