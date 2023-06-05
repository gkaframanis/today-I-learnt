const CATEGORIES = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
];

const supabaseApiKey = config.MY_SUPABASE_API_KEY;
const supabaseUrl = config.MY_SUPABASE_URL;

// Selecting DOM Elements
const btn = document.querySelector('.btn-open');
const form = document.querySelector('.fact-form');
const factsList = document.querySelector('.facts-list');

// Create DOM elements: Render facts in list.
// To clear the list immediately when we load the page.
factsList.innerHTML = '';

loadFacts();

// Load data from Supabase
async function loadFacts() {
  const res = await fetch(supabaseUrl, {
    headers: {
      apikey: supabaseApiKey,
      authorization: `Bearer ${supabaseApiKey}`,
    },
  });
  // Convert the response to JSON.
  const data = await res.json();
  //   const filteredData = data.filter(fact => fact.category === 'society');
  createFactsList(data);
}

function createFactsList(dataArray) {
  const htmlArr = dataArray.map(
    fact => `<li class='fact'> 
                <p>
                  ${fact.text}
                    <a
                      class="source"
                      href=${fact.source}
                      target="_blank"
                      >(Source)
                    </a>
                </p>
                <span class="tag" style="background-color: ${
                  CATEGORIES.find(category => category.name === fact.category)
                    .color
                }"
                    >${fact.category}
                </span>
            </li>`
  );

  const html = htmlArr.join('');
  factsList.insertAdjacentHTML('afterbegin', html);
}

// Toggle form visibility
// Attach an event handler
btn.addEventListener('click', () => {
  if (form.classList.contains('hidden')) {
    form.classList.remove('hidden');
    btn.textContent = 'Close';
  } else {
    form.classList.add('hidden');
    btn.textContent = 'Share a fact';
  }
});
