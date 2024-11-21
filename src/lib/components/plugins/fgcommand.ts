/**
 * Build styles
 */
import { default as fgcCommandsMap } from "./fgcCommandMap";
import "./index.css";

/**
 * FGC Command Converter Tool for the Editor.js allows to include command examples in your articles.
 */
export default class FGCTool {
  api: any;
  readOnly: boolean;
  placeholder: string;
  CSS: { baseClass: any; input: any; wrapper: string; textarea: string };
  nodes: {
    holder: HTMLElement | null;
    textarea: HTMLDivElement | null;
    svgContainer: HTMLDivElement | null;
  };
  _data: any;
  savedRange: Range | null = null;

  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * Allow to press Enter inside the CodeTool textarea
   *
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * @typedef {object} CodeData ��� plugin saved data
   * @property {string} code - previously saved plugin code
   */

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {object} options - tool constricting options
   * @param {FGCData} options.data — previously saved plugin commands
   * @param {object} options.config - user config for Tool
   * @param {object} options.api - Editor.js API
   * @param {boolean} options.readOnly - read only mode flag
   */
  constructor({
    data,
    config,
    api,
    readOnly,
  }: {
    data: any;
    config: any;
    api: any;
    readOnly: boolean;
  }) {
    this.api = api;
    this.readOnly = readOnly;

    this.placeholder = "Enter a command";

    this.CSS = {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      wrapper: "ce-fgc",
      textarea: "ce-fgc__textarea",
    };

    this.nodes = {
      holder: null,
      textarea: null,
      svgContainer: null,
    };

    this.data = {
      fgc: data.fgc || "",
    };

    this.nodes.holder = this.drawView();
  }

  /**
   * Create Tool's view
   *
   * @returns {HTMLElement}
   * @private
   */
  drawView() {
    const wrapper = document.createElement("div"),
      // textarea 대신 div 사용
      editor = document.createElement("div"),
      svgContainer = document.createElement("div"); // SVG 컨테이너 추가

    // 기존 textarea 클래스 유지
    editor.classList.add(this.CSS.textarea, this.CSS.input);
    editor.contentEditable = "true";
    editor.setAttribute("placeholder", this.placeholder);

    if (this.readOnly) {
      editor.hidden = true;
      editor.setAttribute("contenteditable", "false");
    }

    // SVG 컨테이너 클래스 설정
    svgContainer.classList.add("ce-fgc__svg-container");
    this.updateSvgContainer(editor.innerText); // SVG 업데이트 메서드 호출

    wrapper.appendChild(editor);
    wrapper.appendChild(svgContainer); // SVG 컨테이너 추가

    /**
     * Enable keydown handlers
     */
    editor.addEventListener("keydown", (event) => {
      switch (event.code) {
        case "Tab":
          this.tabHandler(event);
          break;
        default:
          this.updateSvgContainer(editor.innerText); // SVG 업데이트 메서드 호출
          break;
      }
    });

    this.nodes.textarea = editor;
    this.nodes.svgContainer = svgContainer; // svgContainer 할당

    return wrapper;
  }
  tabHandler(event: KeyboardEvent) {
    throw new Error("Method not implemented.");
  }

  /**
   * Return Tool's view
   *
   * @returns {HTMLDivElement} this.nodes.holder - Code's wrapper
   * @public
   */
  render() {
    return this.nodes.holder;
  }

  /**
   * Extract Tool's data from the view
   *
   * @param {HTMLDivElement} fgcWrapper - CodeTool's wrapper, containing textarea with code
   * @returns {CodeData} - saved plugin code
   * @public
   */
  save(fgcWrapper: any) {
    return {
      fgc: fgcWrapper.querySelector("div").innerHTML,
    };
  }

  /**
   * onPaste callback fired from Editor`s core
   *
   * @param {PasteEvent} event - event with pasted content
   */
  onPaste(event: { detail: { data: any } }) {
    const content = event.detail.data;

    this.data = {
      fgc: content.textContent,
    };
  }

  /**
   * Returns Tool`s data from private property
   *
   * @returns {CodeData}
   */
  get data() {
    return this._data;
  }

  /**
   * Set Tool`s data to private property and update view
   *
   * @param {CodeData} data - saved tool data
   */
  set data(data) {
    this._data = data;

    if (this.nodes.textarea) {
      this.nodes.textarea.textContent = data.fgc;
    }
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0666 1.5936C10.0282 1.10668 10.3478 0.661287 10.8238 0.551971C14.0289 -0.18399 15.9711 -0.18399 19.1762 0.551971C19.6522 0.661286 19.9718 1.10668 19.9334 1.5936L18.5727 18.8287C18.5317 19.3488 18.0976 19.75 17.5758 19.75H16.5V28.75C16.5 29.3023 16.0523 29.75 15.5 29.75H14.5C13.9477 29.75 13.5 29.3023 13.5 28.75V19.75H12.4242C11.9024 19.75 11.4683 19.3488 11.4273 18.8287L10.0666 1.5936Z" fill="black"/>
        </svg>
        `,
      title: "커맨드 변환기",
    };
  }

  /**
   *  Used by Editor.js paste handling API.
   *  Provides configuration to handle CODE tag.
   *
   * @static
   * @returns {{tags: string[]}}
   */
  static get pasteConfig() {
    return {
      tags: ["pre"],
    };
  }

  /**
   * Automatic sanitize config
   *
   * @returns {{code: boolean}}
   */
  static get sanitize() {
    return {
      fgc: true, // Allow HTML tags
    };
  }

  // 커서 위치 저장 메서드 추가
  saveSelection() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      this.savedRange = selection.getRangeAt(0);
    }
  }

  // 커서 위치 복원 메서드 추가
  restoreSelection() {
    if (this.savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(this.savedRange);
    }
  }

  /**
   * 입력된 명령어를 파싱하여 SVG 컨테이너에 렌더링하는 메서드 추가
   */
  updateSvgContainer(commands: string) {
    if (this.nodes.svgContainer) {
      const svgHTML = commands
        .split(/\s+/) // 공백 기준으로 명령어 분리
        .map((cmd: string) => fgcCommandsMap[cmd.toUpperCase()] ?? cmd + " ")
        .filter(Boolean)
        .join("");
      this.nodes.svgContainer.innerHTML = svgHTML;
    }
  }
}
