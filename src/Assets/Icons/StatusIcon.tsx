type Status = "Alive" | "Dead" | "unknown";

export const StatusIcon = ({ status }: { status: Status }) => {
  if (status === "Dead") {
    return (
      <div className="mr-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="12"
          height="12"
          className="main-grid-item-icon"
          fill="red"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>
    );
  }

  if (status === "unknown") {
    return (
      <div className="mr-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="12"
          height="12"
          className="main-grid-item-icon"
          fill="gray"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>
    );
  }

  return (
    <div className="mr-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="12"
        height="12"
        className="main-grid-item-icon"
        fill="green"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    </div>
  );
};
