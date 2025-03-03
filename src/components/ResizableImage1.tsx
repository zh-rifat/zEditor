import { Node } from "@tiptap/core";
import interact from "interactjs";

const ResizableImage = Node.create({
  name: "resizableImage",
  content: "inline*",
  group: "block",
  draggable: false, // Enable dragging within the editor
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      width: {
        default: "100%",
      },
      height: {
        default: "auto",
      },
      translateX: {
        default: 0, // Default horizontal translation
      },
      translateY: {
        default: 0, // Default vertical translation
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "img[src]",
        getAttrs: (dom: any) => ({
          src: dom.getAttribute("src"),
          alt: dom.getAttribute("alt"),
          width: dom.getAttribute("width") || "100%",
          height: dom.getAttribute("height") || "auto",
          translateX: parseFloat(dom.getAttribute("data-translate-x")) || 0,
          translateY: parseFloat(dom.getAttribute("data-translate-y")) || 0,
        }),
      },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      "img",
      {
        ...HTMLAttributes,
        style: `width: ${node.attrs.width}; height: ${node.attrs.height}; transform: translate(${node.attrs.translateX}px, ${node.attrs.translateY}px);`,
        "data-translate-x": node.attrs.translateX,
        "data-translate-y": node.attrs.translateY,
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
      img.style.width = node.attrs.width;
      img.style.height = node.attrs.height;
      img.style.display = "block";
      img.style.margin = "10px auto"; // Center the image
      img.style.transform = `translate(${node.attrs.translateX}px, ${node.attrs.translateY}px)`;
      img.setAttribute("data-translate-x", node.attrs.translateX);
      img.setAttribute("data-translate-y", node.attrs.translateY);

      // Prevent default drag-and-drop behavior
      img.addEventListener("dragstart", (e) => {
        e.preventDefault();
      });

      let interactInstance: Interact.Interactable | null = null;

      // Function to make the image resizable and draggable
      const applyInteract = (element: HTMLElement) => {
        // Destroy previous interact instance if it exists
        if (interactInstance) {
          interactInstance.unset();
        }

        // Apply resizable functionality
        interactInstance = interact(element)
          .resizable({
            edges: { left: true, right: true, bottom: true, top: true },
            listeners: {
              move(event) {
                const { width, height } = event.rect;
                element.style.width = `${width}px`;
                element.style.height = `${height}px`;

                // Update the node attributes with the new dimensions
                if (typeof getPos === "function") {
                  editor
                    .chain()
                    .focus()
                    .setNodeSelection(getPos())
                    .updateAttributes("resizableImage", {
                      width: `${width}px`,
                      height: `${height}px`,
                    })
                    .run();
                }
              },
            },
            modifiers: [
              interact.modifiers.restrictSize({
                min: { width: 50, height: 50 }, // Minimum size
              }),
            ],
          })
          .draggable({
            listeners: {
              move(event) {
                const { dx, dy } = event;
                const translateX = node.attrs.translateX + dx;
                const translateY = node.attrs.translateY + dy;
                element.style.transform = `translate(${translateX}px, ${translateY}px)`;
              },
              end(event) {
                const { dx, dy } = event;
                const translateX = node.attrs.translateX + dx;
                const translateY = node.attrs.translateY + dy;

                // Update the node attributes with the new translation
                if (typeof getPos === "function") {
                  editor
                    .chain()
                    .focus()
                    .setNodeSelection(getPos())
                    .updateAttributes("resizableImage", {
                      translateX,
                      translateY,
                    })
                    .run();
                }
              },
            },
          });
      };

      // Use MutationObserver to detect when the image is added to the DOM
      const observer = new MutationObserver((mutations, obs) => {
        // if (img.parentElement) {
          applyInteract(img);
          obs.disconnect(); // Stop observing once the image is in the DOM
        // }
      });

      // Start observing the document for changes
      observer.observe(document.body, { childList: true, subtree: true });

      return {
        dom: img,
        onUpdate: () => {
          // Reapply interact functionality on update
          applyInteract(img);
        },
        onDestroy: () => {
          // Clean up interact instance when the node is destroyed
          if (interactInstance) {
            interactInstance.unset();
          }
        },
      };
    };
  },
});

export default ResizableImage;
