const examples = document.getElementById('examples');
const [dataEx, timeEx, numberEx, moneyEx] = examples.querySelectorAll('[id]');

const defaultLocale = Intl.DateTimeFormat().resolvedOptions().locale;
document.getElementById('browserLocale').textContent = defaultLocale;

const localeSel = document.getElementById('localeSel');
const currencySel = document.getElementById('currencySel');

localeSel.value = defaultLocale;
currencySel.value = 'EUR';

const html = (strings, ...values) =>
  strings
    .reduce((acc, str, i) => acc + str + (i < values.length ? values[i] : '').trim(), '')
    // .replaceAll('\n', '<br>')
    .replace(/^<br>/, '');

// Append the value of each option to the option text.
for (const opt of localeSel.options) {
  opt.text += ` - ${opt.value}`;
}

function updateLocaleExamples() {
  const selectedLoc = localeSel.value;
  const selectedCur = currencySel.value;

  const d = ['short', 'medium', 'long', 'full'];
  const date = new Date();
  // prettier-ignore
  dateEx.innerHTML = html`
  <table>
    <tr>
      <th>${d[0]}</th><td>${formatDate(selectedLoc, date, d[0])}</td>
    </tr>
    <tr>
      <th>${d[1]}</th><td>${formatDate(selectedLoc, date, d[1])}</td>
    </tr>
    <tr>
      <th>${d[2]}</th><td>${formatDate(selectedLoc, date, d[2])}</td>
    </tr>
    <tr>
      <th>${d[3]}</th><td>${formatDate(selectedLoc, date, d[3])}</td>
    </tr>
  </table>
`;

  const t = ['short', 'medium', 'long', 'full'];
  // prettier-ignore
  timeEx.innerHTML = html`
  <table>
    <tr>
      <th>${t[0]}</th><td>${formatTime(selectedLoc, date, t[0])}</td>
    </tr>
    <tr>
      <th>${t[1]}</th><td>${formatTime(selectedLoc, date, t[1])}</td>
    </tr>
    <tr>
      <th>${t[2]}</th><td>${formatTime(selectedLoc, date, t[2])}</td>
    </tr>
    <tr>
      <th>${t[3]}</th><td>${formatTime(selectedLoc, date, t[3])}</td>
    </tr>
  </table>
`;

  const n = ['1234567.89', '0.3', '-5'];
  // prettier-ignore
  numberEx.innerHTML = html`
  <table>
    <tr>
      <th>${n[0]}</th><td>${formatNumber(selectedLoc, n[0])}</td>
    </tr>
    <tr>
      <th>${n[1]}</th><td>${formatNumber(selectedLoc, n[1])}</td>
    </tr>
    <tr>
      <th>${n[2]}</th><td>${formatNumber(selectedLoc, n[2])}</td>
    </tr>
  </table>
`;

  const m = ['1234.47', '-0.32'];
  moneyEx.innerHTML = html`
    <table>
      <tr>
        <th>${m[0]}</th>
        <td>${formatCurrency(selectedLoc, selectedCur, m[0])}</td>
      </tr>
      <tr>
        <th>${m[1]}</th>
        <td>${formatCurrency(selectedLoc, selectedCur, m[1])}</td>
      </tr>
      <table></table>
    </table>
  `;

  examples.classList.add('flash');
  setTimeout(() => examples.classList.remove('flash'), 1000);
}

function resetLocaleExamples() {
  localeSel.value = defaultLocale;
  currencySel.value = 'EUR';
  updateLocaleExamples();
}

function formatDate(locale, date, style) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: style,
  }).format(date);
}

function formatTime(locale, date, style) {
  return new Intl.DateTimeFormat(locale, {
    timeStyle: style,
  }).format(date);
}

function formatNumber(locale, number) {
  return new Intl.NumberFormat(locale).format(number);
}

function formatCurrency(locale, currency, amount) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// Initialize the examples with the first locale in the list on page load.
document.addEventListener('DOMContentLoaded', updateLocaleExamples);
