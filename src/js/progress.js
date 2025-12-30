export function circularProgressSVG({
  percentage,
  size = 36,
  strokeWidth = 4,
  color = "#4ade80",
  bgColor = "#00000000",
  textColor = "#ffffff",
  text = ""
}) {
  const radius = (size - strokeWidth) / 2;
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return `
    <svg
      width="${size}"
      height="${size}"
      viewBox="0 0 ${size} ${size}"
    >
      <circle
        cx="${size / 2}"
        cy="${size / 2}"
        r="${radius}"
        fill="none"
        stroke="${bgColor}"
        stroke-width="${strokeWidth}"
      />
      <circle
        cx="${size / 2}"
        cy="${size / 2}"
        r="${radius}"
        fill="none"
        stroke="${color}"
        stroke-width="${strokeWidth}"
        stroke-linecap="round"
        transform="rotate(-90 ${size / 2} ${size / 2})"
        stroke-dasharray="${dashArray}"
        stroke-dashoffset="${dashOffset}"
      />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        text-anchor="middle"
        fill="${textColor}"
        font-size="${size * 0.3}"
        font-weight="600"
      >
        ${text}
      </text>
    </svg>
  `;
}