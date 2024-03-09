type StarProps = {
  id: string;
  percentageFilled: string;
};

export const RatingStar = ({ id, percentageFilled }: StarProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
  >
    <defs>
      <linearGradient id={`fill-${id}`}>
        <stop offset="0%" stopColor="#f4b840" />
        <stop offset={percentageFilled} stopColor="#f4b540" />
        <stop offset={percentageFilled} stopColor="#fff" />
        <stop offset="100%" stopColor="#fff" />
      </linearGradient>
    </defs>
    <g
      fill={`url(#fill-${id})`}
      stroke="#f4b840"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </g>
  </svg>
);
