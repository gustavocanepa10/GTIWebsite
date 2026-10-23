import logo from "@/assets/Logo_GTI-04.jpg";

export function Logo({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="1160 1400 2200 1700"
      role="img"
      aria-label="GTI Networks Tecnologia"
      className={className}
    >
      <image href={logo} width="4501" height="4501" />
    </svg>
  );
}
