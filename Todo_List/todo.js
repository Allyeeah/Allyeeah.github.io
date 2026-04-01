let mockData = [
  {
    id: 0,
    isDone: false,
    content: "React study",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: true,
    content: "친구만나기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "낮잠자기",
    date: new Date().getTime(),
  },
];

let day = ["일", "월", "화", "수", "목", "금", "토"];

onload = () => {
  // initData(mockData)함수 호출
  initData(mockData);
  // 현재 날짜를 년 월 일 요일로 출력한다
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const dayOfWeek = day[today.getDay()];
  document.querySelector(".Header h1").innerHTML =
    `${year}-${month}-${date} (${dayOfWeek})`;
};

const initData = (printData) => {
  //mockData 배열을 forEach를 이용해서 화면에 출력한다
  const todosWrapper = document.querySelector(".todos_wrapper");
  todosWrapper.innerHTML = "";
  printData.forEach((item) => {
    const todoItem = document.createElement("div");
    todoItem.className = "TodoItem";
    todoItem.innerHTML = `
            <input type="checkbox" ${item.isDone ? "checked" : ""} />
            <div class="content">${item.content}</div>
            <div class="date">${new Date(item.date).toLocaleDateString()}</div>
            <button onClick="todoDel(${item.id})">삭제</button>
          `;
    todosWrapper.appendChild(todoItem);
  });
};

// 추가 기능
let idIndex = 3;
document.querySelector(".Editor > button").onclick = () => {
  event.preventDefault(); //전송 기능 막기
  // id -> idIndex
  // isDone -> false
  // content -> input.value
  // date -> new Date().getTime()
  const input = document.querySelector(".Editor > input");
  const newTodo = {
    id: idIndex++,
    isDone: false,
    content: input.value,
    date: new Date().getTime(),
  };
  mockData.push(newTodo);
  initData(mockData);
  input.value = "";
};
// 수정기능
const onUpdate = (targetId) => {
  //TodoItem에서 호출할 때 전달한 id
  /* mockData의 state의 값들 중에 targetId와 일치하는 todoitem의 isDone 변경 
        map함수를 이용한다. map함수의 결과를 mockData에 저장한다. 
     */
  mockData = mockData.map((item) => {
    if (item.id === targetId) {
      return { ...item, isDone: !item.isDone };
    }
    return item;
  });
  initData(mockData);
};

// 삭제기능
const todoDel = (th) => {
  //filter()함수 이용해서 삭제하려는 대상이외의 todo만 추출해서 mockData에 담는다
  mockData = mockData.filter((item) => item.id !== th);

  initData(mockData);
};

// 검색기능
document.querySelector("#keyword").onkeyup = (e) => {
  let searchedTodos = getFilterData(e.target.value);
  initData(searchedTodos);
};
const getFilterData = (search) => {
  //검색어가 없으면 mockData를 리턴한다.
  if (search === "") {
    return mockData;
  }
  //검색어가 있으면 mockData에서 content에 검색어가 포함된 요소만 추출해서 리턴한다.
  return mockData.filter((item) =>
    item.content.toLowerCase().includes(search.toLowerCase()),
  );
};
