/**
* @param  {string} e - selector
*/
const $ = (e) => document.querySelector(e);
/**
* @param {string} typeevent - 
blur Cuando el elemento pierde el foco.
click El usuario hace clic sobre el elemento.
dblclick El usuario hace doble clic sobre el elemento.
focus El elemento gana el foco.
keydown El usuario presiona una tecla.
keypress El usuario presiona una tecla y la mantiene pulsada.
keyup El usuario libera la tecla.
load El documento termina su carga.
mousedown El usuario presiona el botón del ratón en un elemento.
mousemove El usuario mueve el puntero del ratón sobre un elemento.
mouseout El usuario mueve el puntero fuera de un elemento.
mouseover El usuario mantiene el puntero sobre un elemento.
mouseup El usuario libera el botón pulsado del ratón sobre un elemento.
unload El documento se descarga, bien porque se cierra la ventana, bien porque se navega a otra página.
* @param {String} el - elemento
* @param {void} callback - callback function
*/
const on = (typeevent, el, callback) => {
  el.addEventListener(typeevent, (e) => callback(e));
};
const normalize = (function () {
  var from =
      "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç!¡¿?#$%&|´´`ªº^Ç*+/¨¨=(){}[].,;:_°>\\<\"'",
    to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
    mapping = {};

  for (var i = 0, j = from.length; i < j; i++)
    mapping[from.charAt(i)] = to.charAt(i);

  return function (str, urls = true) {
    var ret = [];
    for (var i = 0, j = str.length; i < j; i++) {
      var c = str.charAt(i);
      if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
      else ret.push(c);
    }
    return urls
      ? ret.join("")
      : ret
          .join("")
          .replace(/[^-A-Za-z0-9]+/g, "-")
          .toLowerCase();
  };
})();
const copyTextToClipboard = (text) => {
  if (!navigator.clipboard) {
    console.error("Async: No se pudo copiar texto: ", err);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: ¡Copiar Al Portapapeles Fue Exitoso!", text);
    },
    function (err) {
      console.error("Async: No se pudo copiar texto: ", err);
    }
  );
};
const ExpReg = (exp, op) => new RegExp(exp, op);
const listChart = [
  { from: "a", to: "ai" },
  { from: "e", to: "enter" },
  { from: "i", to: "imes" },
  { from: "o", to: "ober" },
  { from: "u", to: "ufat" },
];
const fromTo = (x) => {
  listChart.forEach(({ from, to }) => {
    x = x === from ? x.replace(ExpReg(`[${from}]`, "g"), to) : x;
  });
  return x;
};
const encrypt = (text) => {
  text = text
    .split("")
    .map((letra) => fromTo(letra))
    .join("");
  return [text];
};
const decrypt = (text) => {
  listChart.forEach(({ from, to }) => {
    text = text.replace(ExpReg(`(${to})`, "g"), from);
  });
  return [text];
};
const render = () => {
  const $result = $('[data-one="result"]'),
    $header = $('[data-one="header"]'),
    $footer = $('[data-one="footer"]'),
    $text = $('[data-one="text"]'),
    $text_hidden = $('[data-one="text-hidden"]'),
    $btn_encrypt = $('[data-one="encrypt"]'),
    $btn_decrypt = $('[data-one="decrypt"]'),
    $result_copy = $('[data-one="copy-result"]'),
    $result_copy_error = $('[data-one="copy-result-error"]'),
    $btn_copy = $('[data-one="copy"]');
  const textEncrypt = () => {
    const { value } = $text;
    const [newTextEncrypt] = encrypt(normalize(value.toLowerCase()));
    $text_hidden.value = newTextEncrypt;
    return newTextEncrypt;
  };
  const textDecrypt = () => {
    const { value } = $text;
    const [newTextDecrypt] = decrypt(value.toLowerCase());
    $text_hidden.value = newTextDecrypt;
    return newTextDecrypt;
  };
  const textResult = (type) => {
    const { value } = $text;
    $header.style.display = value ? "none" : "block";
    $footer.style.display = !value ? "none" : "block";
    $result.innerHTML = value
      ? `${type === "encrypt" ? textEncrypt() : textDecrypt()}`
      : "Ingresa el texto que desees encriptar o desencriptar.";
  };
  on("click", $btn_encrypt, () => {
    textResult("encrypt");
  });
  on("click", $btn_decrypt, () => {
    textResult("decrypt");
  });
  on("click", $btn_copy, () => {
    $result_copy.style.display = "block";
    setTimeout(() => {
      $result_copy.style.display = "none";
    }, 3000);
    copyTextToClipboard($text_hidden.value);
  });
};

window.addEventListener("DOMContentLoaded", () => render());
// @by Kreisler
