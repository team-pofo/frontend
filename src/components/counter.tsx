// components/Counter.tsx
import { useAppDispatch } from "@/stores";
import {
  decrement,
  increment,
  reset,
  selectCount,
} from "@/stores/counterSlice";
import React from "react";
import { useSelector } from "react-redux";

const Counter: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useSelector(selectCount);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};

export default Counter;
