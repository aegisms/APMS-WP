export default function StatusPill({ status }) {
  const className =
    status === "Approved"
      ? "status-pill status-approved"
      : status === "Rejected"
      ? "status-pill status-rejected"
      : "status-pill status-pending";

  return <span className={className}>{status}</span>;
}
