const circles = document.querySelectorAll(".circle");
const style = document.createElement("style");
let styleInner = style.innerHTML;

circles.forEach((circle, idx) => {
  circle.style.zIndex = -idx;
  circle.style.borderWidth = (idx + 1) * 10 + "px";
  circle.style.animationName = `rotate-${idx}`;

  const deg = (idx + 1) * 360;

  styleInner += `
    @keyframes rotate-${idx} {
      to {
        transform: translate(-50%, -50%) rotate(${deg}deg);
      }
    }
  `;
});
console.log(styleInner);
style.innerHTML = styleInner;
document.body.appendChild(style);
