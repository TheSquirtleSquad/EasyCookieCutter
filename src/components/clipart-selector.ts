import { LitElement, html, css } from 'lit-element';
import { HTMLInputEvent } from "../types"

class ClipartSelector extends LitElement {
  static styles = css`
    #fileSelect {
      width: 100%;
      margin-bottom: 1vh;
    }
  `;

  handleImageChange(e?: HTMLInputEvent) {
    if (!e || !e.target || !e.target.files) {
      throw Error("image change target is null")
      return null;
    }


    var img = new Image();
    const withExt = e.target.files[0].name
    img.src = URL.createObjectURL(e.target.files[0]);
    const event = new CustomEvent("image-changed", {
      detail: {
        imageSrc: img.src,
        imageHeight: img.height,
        imageWidth: img.width,
        saveFileName: withExt.replace(/\.[^/.]+$/, "")
      }
    })

    img.onload = () => {
      /* we can only get the image dimensions after it's loaded */
      event.detail.imageHeight = img.height;
      event.detail.imageWidth = img.width;

      this.dispatchEvent(event);
      console.log(img, event.detail)
    };
  }

  handleBtnClick() {
    if (!this.shadowRoot) return;

    const inputElem: HTMLInputElement | null = this.shadowRoot.querySelector("#fileInput")
    if (inputElem) {
      inputElem.click();
    }
  }

  render() {
    return html`
    <container>
      <input @change="${this.handleImageChange}" type="file" id="fileInput" name="file" accept="image/*" style="display:none"/>
      <mwc-button
        @click=${this.handleBtnClick}
        outlined
        id="fileSelect">
        Select an image
      </mwc-button>

      <img slot="image" id="imageSrc" crossOrigin="" alt="No Image" style="display:none" hidden=true></img>
    </container>
    `;
  }
}

customElements.define('clipart-selector', ClipartSelector);
