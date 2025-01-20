export const createPara = () => {
  const para = document.createElement("p");
  para.textContent = "Hello World";
  para.classList.add(
    "text-red-600",
    "font-bold",
    "text-4xl",
    "dark:text-amber-400"
  );
  document.body.appendChild(para);
};
