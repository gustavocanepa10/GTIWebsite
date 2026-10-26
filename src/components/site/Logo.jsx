import logo from "@/assets/Logo_GTI-04.jpg";

export function Logo({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="1180 1440 2140 1620"
      width="2140"
      height="1620"
      role="img"
      aria-label="GTI Networks Tecnologia"
      className={className}
    >
      <image href={logo} width="4501" height="4501" />
    </svg>
  );
}
