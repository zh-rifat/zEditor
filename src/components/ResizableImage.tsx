import { Node } from "@tiptap/core";
import interact from "interactjs";

const ResizableImage = Node.create({
  name: "resizableImage",
  content: "inline*",
  inline: false,
  group: "block",
  draggable: false,
  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      width: { default: "80%" },
      height: { default: "auto" },
    };
  },
  parseHTML() {
    return [
      {
        tag: "img[src]",
        getAttrs: (dom) => ({
          src: dom.getAttribute("src"),
          alt: dom.getAttribute("alt"),
          width: dom.getAttribute("width") || "100%",
          height: dom.getAttribute("height") || "auto",
        }),
      },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      "img",
      { 
        ...HTMLAttributes, 
        style: `width: ${node.attrs.width}; height: ${node.attrs.height}; display: block; margin: 10px auto;` 
      },
    ];
  },
  addCommands() {
    return {
      setImage: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        });
      },
    };
  },
  addNodeView() {
    return ({ node, editor, getPos }) => {
      const img = document.createElement("img");
      img.src = node.attrs.src;
      img.alt = node.attrs.alt;
      img.style.cssText = `
        width: ${node.attrs.width};
        height: ${node.attrs.height};
        display: block;
        margin: 10px auto;
      `;

      let interactInstance: ReturnType<typeof interact> | null = null;

      // Initialize interact.js
      const initInteract = () => {
        // Cleanup previous instance
        if (interactInstance) {
          interactInstance.unset();
        }

        // Get fresh position reference
        const currentPos = typeof getPos === "function" ? getPos() : undefined;
        if (typeof currentPos !== "number") return;

        // Configure resizable
        interactInstance = interact(img).resizable({
          edges: { left: true, right: true, bottom: true, top: true },
          modifiers: [
            interact.modifiers.restrictSize({ min: { width: 50, height: 50 } }),
          ],
          listeners: {
            move: (event) => {
              const { width, height } = event.rect;
              img.style.width = `${width}px`;
              img.style.height = `${height}px`;
              
              editor
                .chain()
                .focus()
                .setNodeSelection(currentPos)
                .updateAttributes("resizableImage", {
                  width: `${width}px`,
                  height: `${height}px`,
                })
                .run();
            },
          },
        });
      };

      // Use MutationObserver to wait for DOM attachment
      const observer = new MutationObserver(() => {
        if (img.isConnected) {
          initInteract();
          observer.disconnect();
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return {
        dom: img,
        onUpdate: () => {
          // Reinitialize when node updates
          initInteract();
        },
        onDestroy: () => {
          if (interactInstance) {
            interactInstance.unset();
          }
          observer.disconnect();
        },
      };
    };
  },
});

export default ResizableImage;
