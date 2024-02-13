export function tooltip(element) {
  let div;
  let title;

  function mouseOver(event) {
    // NOTE: remove the `title` attribute, to prevent showing the default browser tooltip
    // remember to set it back on `mouseleave`

    title = element.getAttribute("title");
    element.removeAttribute("title");

    div = document.createElement("div");
    div.textContent = title;
    div.style = `
			border: 1px solid #333;
			box-shadow: 1px 1px 1px #333;
			background: white;
			border-radius: 4px;
			padding: 0.5em;
			position: absolute;
			top: ${event.pageX + 20}px;
			left: ${event.pageY + 12}px;
            font-size:0.8750em;
            max-width:250px;
            text-wrap:pretty;
            z-index:50;
		`;

    document.querySelector("label").appendChild(div);
  }
  function mouseMove(event) {
    div.style.left = `${event.pageX + 12}px`;
    div.style.top = `${event.pageY + -20}px`;
  }
  function mouseLeave() {
    document.querySelector("label").removeChild(div);
    // NOTE: restore the `title` attribute
    element.setAttribute("title", title);
  }

  element.addEventListener("mouseover", mouseOver);
  element.addEventListener("mouseleave", mouseLeave);
  element.addEventListener("mousemove", mouseMove);

  return {
    destroy() {
      element.removeEventListener("mouseover", mouseOver);
      element.removeEventListener("mouseleave", mouseLeave);
      element.removeEventListener("mousemove", mouseMove);
    },
  };
}
