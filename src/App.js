import { useState } from "react";
import "./App.css";
var size = [500, 500];

function Set_Image_Size(e) {
  var s = e.target.value;
  var num = "";
  size = s.split("X");

  function calculateRatio(num_1, num_2) {
    for (num = num_2; num > 1; num--) {
      if (num_1 % num === 0 && num_2 % num === 0) {
        num_1 = num_1 / num;
        num_2 = num_2 / num;
      }
    }
    var ratio = num_1 + ":" + num_2;
    return ratio;
  }
  var ratio = calculateRatio(size[0], size[1]);
  var r = ratio.split(":");
  var width = "";
  var height = "";
  var svg_element = document.getElementById("svg_element");
  var svg_ = document.getElementById("svg_");

  if (size[0] > 500 || size[1] > 500) {
    width = 500 / r[1];
    height = 500 / r[0];

    svg_element.setAttribute("width", width);
    svg_element.setAttribute("height", height);
    svg_.setAttribute("width", width);
    svg_.setAttribute("height", height);
  } else if (s === "") {
    svg_element.setAttribute("width", 500);
    svg_element.setAttribute("height", 500);
    svg_.setAttribute("width", 500);
    svg_.setAttribute("height", 500);
  } else {
    width = size[0];
    height = size[1];

    svg_element.setAttribute("width", width);
    svg_element.setAttribute("height", height);
    svg_.setAttribute("width", width);
    svg_.setAttribute("height", height);
  }
}

function Set_Font_Orientation_x(e) {
  var X_val = e.target.value;
  var font = document.getElementById("Image_Txt");
  font.setAttribute("x", X_val);
}

function Set_Font_Orientation_y(e) {
  var Y_val = e.target.value;
  var font = document.getElementById("Image_Txt");
  font.setAttribute("y", Y_val);
}

function Set_Forground_Color(e) {
  var font = document.getElementById("Image_Txt");
  font.style.fill = e.target.value;
}

function download() {
  var svgElement = document.getElementById("svg_");
  //let { width, height } = svgElement.getBBox();
  var serializer = new XMLSerializer();
  var source = serializer.serializeToString(svgElement);

  if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  if (!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
    source = source.replace(
      /^<svg/,
      '<svg xmlns:xlink="http://www.w3.org/1999/xlink"',
    );
  }

  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

  var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

  let image = new Image();
  image.onload = () => {
    let canvas = document.createElement("canvas");

    canvas.width = size[0];
    canvas.height = size[1];

    let context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, size[0], size[1]);

    var link = document.createElement("a");

    link.style.opacity = "0";
    canvas.appendChild(link);

    var format = document.getElementById("list").value;
    if (format === "png") {
      link.href = canvas.toDataURL();
      link.download = "Generated.png";
      link.click();
      link.remove();
    } else if (format === "jpg") {
      link.href = canvas.toDataURL("image/jpeg");
      link.download = "Generated.jpg";
      link.click();
      link.remove();
    }
  };
  image.src = url;
}

function App() {
  const [txt, setTxt] = useState("Hello World");
  const [bgclr, SetBgClr] = useState("#FF0000");
  const [fontSize, setFontSize] = useState("15");

  return (
    <fragment>
      <div class="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <svg
              style={{ marginLeft: "0.1%", marginTop: "0.1%" }}
              width="500"
              height="500"
              id="svg_">
              <rect
                width="500"
                height="500"
                id="svg_element"
                style={{ fill: bgclr }}
              />
              <text x="0" y="30" id="Image_Txt" fontSize={fontSize}>
                {txt}
              </text>
            </svg>
            <div
              style={{
                position: "fixed",
                top: "570px",
                left: "10px",
              }}>
              <h1 style={{ marginLeft: "10px" }}>
                Create Your Own Dynamic Image <i class="fas fa-image"></i>
              </h1>
              <ul>
                <li>
                  Input Image size in desired <b>Width X Height</b> format.
                </li>
                <li>Input text in image with desired size and orientation.</li>
                <li>Choose Image/Text Colors of your desire.</li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <br />
            <br />

            <h5>Image size</h5>
            <input
              type="text"
              className="form-control"
              id="size"
              placeholder="width X height"
              onBlur={(e) => Set_Image_Size(e)}
            />
            <br />
            <h5 for="txt">Text</h5>
            <input
              type="text"
              className="form-control"
              id="txt"
              value={txt}
              onChange={(e) => setTxt(e.target.value)}
            />
            <br />
            <h5 for="font_size">Font-Size</h5>
            <input
              type="number"
              className="form-control"
              id="font_size"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            />
            <br />
            <h5 for="orientation">Set Font orientation (x,y)</h5>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="">
                  Coordinates
                </span>
              </div>
              <input
                type="number"
                class="form-control"
                placeholder="x-val"
                min="0"
                onChange={Set_Font_Orientation_x}
              />
              <input
                type="number"
                class="form-control"
                placeholder="y-val"
                min="30"
                onChange={Set_Font_Orientation_y}
              />
            </div>
            <br />
            <div className="row">
              <div className="col">
                <h5 for="bgcolor">
                  BackGround Color :{" "}
                  <input
                    type="color"
                    id="bgcolor"
                    value={bgclr}
                    style={{ borderStyle: "none", cursor: "pointer" }}
                    onChange={(e) => SetBgClr(e.target.value)}
                  />{" "}
                </h5>
              </div>
              <div className="col">
                <h5 for="fgcolor">
                  Foreground Color :{" "}
                  <input
                    type="color"
                    id="fgcolor"
                    style={{ borderStyle: "none", cursor: "pointer" }}
                    onChange={(e) => Set_Forground_Color(e)}
                  />
                </h5>
              </div>
            </div>
            <br />

            <h5>Select Image Format</h5>
            <select class="form-select" id="list">
              <option value="png">.png</option>
              <option value="jpg">.jpg</option>
            </select>
            <br />
            <br />

            <div style={{ textAlign: "center" }}>
              <button className="btn btn-danger btn-lg" onClick={download}>
                Download <i class="fa fa-download" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </fragment>
  );
}

export default App;
