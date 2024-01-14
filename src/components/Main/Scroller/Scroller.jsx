import { useEffect } from "react";
import "./Scroller.css";

const Scroller = () => {
  useEffect(() => {
    function handleScroll() {
      if (document.documentElement.scrollTop > 400) {
        document.querySelector("#scroller").style.right = "1em";
      } else {
        document.querySelector("#scroller").style.right = "-2em";
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div id="scroller-container">
      <div id="scroller" onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-arrow-up-circle"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Scroller;
