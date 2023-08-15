const select = document.querySelectorAll("select");
const translateBtn = document.querySelector("#translateBtn");
const inputText = document.querySelector("#inputText");
const outputText = document.querySelector("#outputText");
const resetInput = document.querySelector("#resetInput");
const exchange = document.querySelector("#exchange");
const copyTo = document.querySelector("#copyTo");
const copied = document.querySelector("#copied");

select.forEach((selectTag, id) => {
  for (const countryCode in countries) {
    let selected;

    if (id == 0 && countryCode === "en-GB") {
      selected = "selected";
    } else if (id == 1 && countryCode === "mr-IN") {
      selected = "selected";
    }

    let option = `<option value="${countryCode}" ${selected}>${countries[countryCode]}</option>`;
    selectTag.insertAdjacentHTML("beforeend", option);
  }
});

translateBtn.addEventListener("click", (e) => {
  const input = inputText.value;

  if (!input) {
    alert("Please enter some text");
    e.preventDefault();
  } else {
    const fromLang = select[0].value;
    const toLang = select[1].value;

    const url = `https://api.mymemory.translated.net/get?q=${input}&langpair=${fromLang}|${toLang}&de=eevil1202@gmail.com`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        outputText.value = data.responseData.translatedText;
      });
  }
});

exchange.addEventListener("click", () => {
  let exhangeText = inputText.value;
  let exhangeLang = select[0].value;
  inputText.value = outputText.value;
  select[0].value = select[1].value;
  outputText.value = exhangeText;
  select[1].value = exhangeLang;
});

resetInput.addEventListener("click", () => {
  inputText.value = "";
  outputText.value = "";
});

copyTo.addEventListener("click", () => {
  navigator.clipboard.writeText(outputText.value);
});
