class CustomEmojiBlock {
  constructor({ data }: any) {
    console.log(data);
    this.data = data;
  }
  static get toolbox() {
    return {
      title: "emoji",
      icon: `<svg width="23" height="21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.715 1.918C10.176 1.263 8.325.786 4 0c.18.18.656.509 1.224.901C7.8 2.68 12.287 5.777 0 2.5c.33.248.674.495 1.002.732C2.662 4.427 3.922 5.335 1 4.5c9.234 6.393 6.36 5.218 3.381 4-1.215-.496-2.446-1-2.881-1C8 14 8 16 2.5 19c0 0 10.5-.5 0 2H19l1-1 .5.5c.5-1 5-12.5-1-18.5l1 2.5c-3-2-4-2.5-8-4l2.5 2c-.855-.214-1.595-.405-2.285-.582ZM11.8 7.25a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 0 0-3.5 0ZM11.185 10a.297.297 0 0 0-.267.167C10 12.057 10 13.07 10 15.5c0 .366.804.665 1.823 1.044 1.67.622 3.918 1.458 4.156 3.156.023.165.155.3.321.3h1.4a.286.286 0 0 0 .29-.3c-.142-2.172-1.815-3.537-3.208-4.096a.319.319 0 0 1-.19-.39c.377-1.189.406-1.73.408-2.914 0-.165.134-.301.3-.31.488-.028 1.475-.128 2.2-.49a5.455 5.455 0 0 0 1.915-2.288.275.275 0 0 0-.106-.34l-1.026-.683a.31.31 0 0 0-.442.112c-.417.752-.835 1.192-1.253 1.611a.3.3 0 0 1-.212.088h-5.19Zm-1.006 7.346c.072-.176.277-.263.444-.174l.852.454c.168.09.21.312.09.458l-.028.034c-.768.932-1.143 1.387-2.361 1.821a.295.295 0 0 1-.307-.07l-.526-.526c-.157-.157-.093-.426.114-.508.992-.388 1.445-.81 1.722-1.49Z" fill="#000"/>
      </svg>
      `,
    };
  }
  render() {
    const img = document.createElement("lottie-player");
    // img.setAttribute("src", this.data.imageUrl);
    img.setAttribute(
      "src",
      "https://assets-v2.lottiefiles.com/a/a7af5892-1167-11ee-a6b4-f3089814d75b/E5agDqVtox.lottie"
    );
    img.setAttribute("width", "200px");
    img.setAttribute("height", "200px");
    img.setAttribute("background", "transparent");
    img.setAttribute("speed", "1");
    img.setAttribute("loop", "true");
    img.setAttribute("autoplay", "true");
    img.setAttribute("style", "margin-top:0.5rem;margin-bottom:0.5rem;");

    return img;
  }
  save(blockContent: any) {
    return {
      imageUrl: blockContent.getAttribute("src"),
    };
  }
}

export default CustomEmojiBlock;
