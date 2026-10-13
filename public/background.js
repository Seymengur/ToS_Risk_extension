chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "ANALYZE_PAGE") {
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      
      if (!activeTab || !activeTab.id) {
        sendResponse({ error: "Aktif sekme bulunamadı." });
        return;
      }

      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        func: extractPageText,
      })
      .then((results) => {
        const text = results[0].result;
        sendResponse({ status: "success", textLength: text.length, rawText: text });
      })
      .catch((err) => {
        sendResponse({ error: err.message });
      });
    });

    return true; 
  }
});

function extractPageText() {
  const clone = document.body.cloneNode(true);
  
  const elementsToRemove = clone.querySelectorAll('script, style, noscript, iframe, svg, nav, footer, header');
  elementsToRemove.forEach(el => el.remove());
  
  let text = clone.innerText || clone.textContent || "";
  text = text.replace(/\s+/g, ' ').trim();
  
  return text.substring(0, 30000);
}