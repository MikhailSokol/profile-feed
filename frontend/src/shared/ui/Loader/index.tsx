import styles from "./styles.module.css";

interface Props {
  isVisible?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xlg";
}

export const Loader = ({ isVisible = true }: Props) => {
  return (
    <svg
      id="spinner"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      style={{
        shapeRendering: "auto",
        display: isVisible ? "block" : "none",
        background: "transparent",
      }}
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={styles.wrapper}
    >
      <g>
        <g transform="rotate(0 50 50)">
          <rect height="30" width="14" ry="8.700000000000001" rx="7" y="3" x="43">
            <animate
              repeatCount="indefinite"
              begin="-0.875s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(45 50 50)">
          <rect height="30" width="14" ry="8.700000000000001" rx="7" y="3" x="43">
            <animate
              repeatCount="indefinite"
              begin="-0.75s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(90 50 50)">
          <rect height="30" width="14" ry="8.700000000000001" rx="7" y="3" x="43">
            <animate
              repeatCount="indefinite"
              begin="-0.625s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(135 50 50)">
          <rect height="30" width="14" ry="8.700000000000001" rx="7" y="3" x="43">
            <animate
              repeatCount="indefinite"
              begin="-0.5s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(180 50 50)">
          <rect height="30" width="14" ry="8.700000000000001" rx="7" y="3" x="43">
            <animate
              repeatCount="indefinite"
              begin="-0.375s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(225 50 50)">
          <rect height="30" width="14" ry="8.700000000000001" rx="7" y="3" x="43">
            <animate
              repeatCount="indefinite"
              begin="-0.25s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(270 50 50)">
          <rect height="30" width="14" ry="8.700000000000001" rx="7" y="3" x="43">
            <animate
              repeatCount="indefinite"
              begin="-0.125s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g transform="rotate(315 50 50)">
          <rect height="30" width="14" ry="8.700000000000001" rx="7" y="3" x="43">
            <animate
              repeatCount="indefinite"
              begin="0s"
              dur="1s"
              keyTimes="0;1"
              values="1;0"
              attributeName="opacity"
            ></animate>
          </rect>
        </g>
        <g></g>
      </g>
    </svg>
  );
};
