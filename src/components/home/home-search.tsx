"use client";
import styles from "../../styles/Home.module.css";
import { RootState, useAppDispatch } from "@/stores";
import {
  clickToggle,
  inputStack,
  clickStack,
} from "@/stores/search_project/searchProjectStackReducer";
import { useState } from "react";
import { useSelector } from "react-redux";

export function SearchName() {
  return (
    <div className={styles.searchWrapper}>
      <input
        className={styles.searchName}
        type="text"
        placeholder="프로젝트 검색"
      ></input>
    </div>
  );
}

export function SearchStack() {
  const dispatch = useAppDispatch();
  const { toggle, stacks, selectedStacks } = useSelector(
    (state: RootState) => state.searchProjectStack
  );
  return (
    <div className={styles.searchWrapper}>
      <button
        onClick={() => dispatch(clickToggle())}
        className={styles.searchStack}
      >
        <span>기술 스택</span>
        <span>▼</span>
      </button>

      {toggle && (
        <div className={styles.searchStackDropdown}>
          <input
            className={styles.searchStackName}
            type="text"
            placeholder="검색"
            onChange={(input) => {
              dispatch(inputStack(input.target.value));
            }}
          ></input>
          {stacks.map((stack, index) => (
            <div key={index}>
              <label>
                <input
                  style={{ padding: "10px" }}
                  type="checkbox"
                  checked={selectedStacks.includes(stack)}
                  onChange={() => dispatch(clickStack(stack))}
                />
                {stack}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// export function SearchStacks({ items }: { items: string[] }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };
//   const handleCheckboxChange = (option: string) => {
//     if (selectedOptions.includes(option)) {
//       setSelectedOptions(selectedOptions.filter((item) => item !== option));
//     } else {
//       setSelectedOptions([...selectedOptions, option]);
//     }
//   };
//   return (
//     <div className={styles.searchWrapper}>
//       <button onClick={toggleDropdown} className={styles.searchStack}>
//         <span>기술 스택</span>
//         <span>▼</span>
//       </button>

//       {isOpen && (
//         <div className={styles.searchStackDropdown}>
//           <input
//             className={styles.searchStackName}
//             type="text"
//             placeholder="검색"
//           ></input>
//           {items.map((option, index) => (
//             <div key={index}>
//               <label>
//                 <input
//                   style={{ padding: "10px" }}
//                   type="checkbox"
//                   checked={selectedOptions.includes(option)}
//                   onChange={() => handleCheckboxChange(option)}
//                 />
//                 {option}
//               </label>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

export function SearchTypes({ items }: { items: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  return (
    <div className={styles.searchWrapper}>
      <button onClick={toggleDropdown} className={styles.searchStack}>
        <span>프로젝트 구분</span>
        <span>▼</span>
      </button>

      {isOpen && (
        <div className={styles.searchStackDropdown}>
          {items.map((option, index) => (
            <div key={index}>
              <label>
                <input
                  style={{ padding: "10px" }}
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SelectedStacks() {
  const { toggle, stacks, selectedStacks } = useSelector(
    (state: RootState) => state.searchProjectStack
  );
  return (
    <div>
      {selectedStacks.map((stack, index) => (
        <h1>{stack}</h1>
      ))}
    </div>
  );
}

export default function SearchWrapperWrapper() {
  const types = ["Web", "App", "Game"];
  return (
    <div>
      <div className={styles.searchWrapperWrapper}>
        <SearchName />
        <SearchStack />
        {/* <SearchStacks items={stacks} /> */}
        <SearchTypes items={types} />
      </div>
      <SelectedStacks />
    </div>
  );
}
