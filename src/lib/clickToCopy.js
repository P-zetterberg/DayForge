export function clickToCopy(node, target) {
  async function copyText() {
    let text = target
      ? document.querySelector(target).innerText
      : node.innerText;
    const trueTarget = document.querySelector(target);
    try {
      const clipboardItem = new ClipboardItem({
        "text/plain": new Blob([trueTarget.innerText], { type: "text/plain" }),
        "text/html": new Blob([trueTarget.outerHTML], { type: "text/html" }),
      });
      await navigator.clipboard.write([clipboardItem]);

      node.dispatchEvent(
        new CustomEvent("copysuccess", {
          bubbles: true,
        })
      );
    } catch (error) {
      node.dispatchEvent(
        new CustomEvent("copyerror", {
          bubbles: true,
          detail: error,
        })
      );
    }
  }

  node.addEventListener("click", copyText);

  return {
    destroy() {
      node.removeEventListener("click", copyText);
    },
  };
}
