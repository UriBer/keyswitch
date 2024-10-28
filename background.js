// Function to get user's selected keyboard layouts
async function getUserKeyboardLayouts() {
    // Get user settings from storage
    const result = await browser.storage.local.get(['sourceLayout', 'targetLayout']);
    const sourceLayout = result.sourceLayout || 'en'; // Default to English
    const targetLayout = result.targetLayout || 'he'; // Default to Hebrew
    console.log('Source Layout:', sourceLayout);
    console.log('Target Layout:', targetLayout);
    return { sourceLayout, targetLayout };
  }
  
  // Function to load the mapping file for the given layout
  async function loadMapping(layout) {
    try {
      const response = await fetch(browser.runtime.getURL(`mappings/${layout}.json`));
      const mapping = await response.json();
      return mapping;
    } catch (error) {
      console.error('Error loading mapping:', error);
      return null;
    }
  }
  
  // Function to create a mapping from source to target layout
  function createMapping(sourceMapping, targetMapping) {
    const mapping = {};
    for (const key in sourceMapping) {
      const sourceChar = sourceMapping[key];
      const targetChar = targetMapping[key];
      if (sourceChar && targetChar) {
        mapping[sourceChar] = targetChar;
      }
    }
    return mapping;
  }
  
  // Function to map text using the provided mapping
  function mapText(text, mapping) {
    return text.split('').map(char => mapping[char] || char).join('');
  }
  
  // Function to handle the mapping
  async function handleMapping(tab) {
    console.log(`Mapping keys on tab: ${tab.id}`);
  
    // Get the current URL of the active tab
    const urlStr = tab.url;
    console.log(`Current URL: ${urlStr}`);
  
    // Skip invalid or internal URLs
    if (urlStr.startsWith('about:') || urlStr.startsWith('chrome:')) {
      console.log('Cannot map internal browser URLs.');
      return;
    }
  
    // Get user's selected keyboard layouts
    const { sourceLayout, targetLayout } = await getUserKeyboardLayouts();
  
    // Load the mappings
    const sourceMapping = await loadMapping(sourceLayout);
    const targetMapping = await loadMapping(targetLayout);
  
    if (!sourceMapping || !targetMapping) {
      console.error('Mapping files not available.');
      // Optionally, notify the user
      chrome.notifications.create({
        "type": "basic",
        "iconUrl": chrome.runtime.getURL("icons/icon48.png"),
        "title": "Key Mapper",
        "message": "Mapping files not available for the selected keyboard layouts."
      });
      return;
    }
  
    // Create the mapping from source to target
    const mapping = createMapping(sourceMapping, targetMapping);
  
    // Parse the URL
    let url;
    try {
      url = new URL(urlStr);
    } catch (e) {
      console.error('Invalid URL:', e);
      return;
    }
  
    // Map the pathname
    const pathname = decodeURIComponent(url.pathname);
    const mappedPathname = encodeURI(mapText(pathname, mapping));
  
    // Map the query parameters
    const params = new URLSearchParams(url.search);
    for (let [key, value] of params.entries()) {
      // Decode the value to handle any encoded characters
      let decodedValue = decodeURIComponent(value);
  
      // Replace '+' with space before mapping (as '+' represents space in URLs)
      decodedValue = decodedValue.replace(/\+/g, ' ');
  
      // Map the value
      let mappedValue = mapText(decodedValue, mapping);
  
      // Replace spaces back to '+' after mapping
      mappedValue = mappedValue.replace(/ /g, '+');
  
      // Set the mapped value back to the parameter without encoding
      params.set(key, mappedValue);
    }
  
    // Reconstruct the search string
    const mappedSearch = '?' + params.toString();
  
    // Map the hash
    const hash = decodeURIComponent(url.hash);
    const mappedHash = encodeURI(mapText(hash, mapping));
  
    // Reconstruct the URL
    url.pathname = mappedPathname;
    url.search = mappedSearch;
    url.hash = mappedHash;
  
    const mappedUrl = url.href;
    console.log('Mapped URL:', mappedUrl);
  
    // Update the tab's URL
    browser.tabs.update(tab.id, { url: mappedUrl });
  }
  
  // Handle browser action (button) clicks
  browser.browserAction.onClicked.addListener((tab) => {
    handleMapping(tab);
  });
  
  // Handle keyboard shortcut
  browser.commands.onCommand.addListener((command) => {
    if (command === 'map-keys') {
      console.log('Keyboard shortcut activated.');
      browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        if (tabs.length > 0) {
          handleMapping(tabs[0]);
        }
      });
    }
  });