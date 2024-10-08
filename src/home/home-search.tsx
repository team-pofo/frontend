"use client";
import styles from "../../src/styles/Home.module.css";
import { css } from "@emotion/react";
import { configureStore } from "@reduxjs/toolkit";
import { useState } from "react";

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

export function SearchStacks({ items }: { items: string[] }) {
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
        <span>기술 스택</span>
        <span>▼</span>
      </button>

      {isOpen && (
        <div className={styles.searchStackDropdown}>
          <input
            className={styles.searchStackName}
            type="text"
            placeholder="검색"
          ></input>
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

export default function SearchWrapperWrapper() {
  const stacks = [
    "java",
    "python",
    "C++",
    "React",
    "Android",
    "iOS",
    "Flutter",
    "Vue",
    "Next",
    "JavaScript",
    "TypeScript",
    "Spring",
    "django",
  ];
  const types = ["Web", "App", "Game"];
  return (
    <div className={styles.searchWrapperWrapper}>
      <SearchName />
      <SearchStacks items={stacks} />
      <SearchTypes items={types} />
    </div>
  );
}
