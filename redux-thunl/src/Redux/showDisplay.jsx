import  { useState } from "react";
import { applyMiddleware, createStore } from "redux";
import reducer from "./Reducer";
import { showUserData, showError } from "./Action";
import axios from "axios";
import { thunk } from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk));

function fetchData() {
  return function (dispatch) {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const users = res.data;
        dispatch(showUserData(users));
        console.log(users);
      })
      .catch((error) => {
        dispatch(showError(error.message));
      });
  };
}

export default function Counter() {
  const [data, setData] = useState([]);

  const unsubscribe = store.subscribe(() => {
    setData(store.getState().users);
  });

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <div>
            <h3>{item.name}</h3>
            <h4>{item.email}</h4>
          </div>
          <hr />
        </div>
      ))}
      <button onClick={() => store.dispatch(fetchData())}>Fetch Data</button>
    </div>
  );
}
