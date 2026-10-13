/// <reference types="chrome" />

const promptInjectionPatterns = [
  /\b(?:ignore|disregard|forget|override)\b.{0,80}\b(?:all\s+)?(?:previous|prior|earlier|above)\b.{0,40}\b(?:instructions?|prompts?|rules?|directions?)\b/i,
  /\b(?:reveal|print|show|expose)\b.{0,60}\b(?:the\s+)?(?:system|hidden)\s+prompt\b/i,
  /\b(?:do\s+not|don['’]t|never)\b.{0,60}\b(?:analy[sz]e|review|check|assess)\b.{0,50}\b(?:contract|document|text|page)\b/i,
  /\b(?:state|declare|say|report)\b.{0,40}\b(?:this\s+)?(?:contract|document|page)\b.{0,30}\b(?:safe|harmless|no\s+risk)\b/i,
  /\b(?:önceki|tüm|bütün)\s+(?:talimatları|kuralları)\s+(?:yoksay|unut|görmezden\s+gel)\b/i,
  /\b(?:sözleşmeyi|belgeyi|bu\s+metni)\b.{0,50}\b(?:güvenli|risksiz)\b.{0,40}\b(?:ilan\s+et|bildir|söyle)\b/i,
];

function isHidden(element: Element): boolean {
  for (
    let current: Element | null = element;
    current && current !== document.body;
    current = current.parentElement
  ) {
    if (
      current.hasAttribute("hidden") ||
      current.getAttribute("aria-hidden")?.toLowerCase() === "true" ||
      (current instanceof HTMLInputElement && current.type === "hidden")
    ) {
      return true;
    }

    const style = window.getComputedStyle(current);
    if (
      style.display === "none" ||
      style.visibility === "hidden" ||
      style.visibility === "collapse" ||
      style.opacity === "0" ||
      style.contentVisibility === "hidden"
    ) {
      return true;
    }
  }

  return false;
}

function containsPromptInjection(text: string): boolean {
  const normalized = text.replace(/\s+/g, " ").trim();
  return promptInjectionPatterns.some((pattern) => pattern.test(normalized));
}

chrome.runtime.onMessage.addListener(
  (
    request: any,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void,
  ) => {
    if (request.action === "ANALYZE_PAGE") {
      try {
        const pageElements = Array.from(document.body.querySelectorAll("*"));
        const hiddenElements = pageElements.filter(isHidden);
        const hiddenElementSet = new Set(hiddenElements);
        const hiddenInstruction = hiddenElements.find((element) =>
          containsPromptInjection(element.textContent ?? ""),
        );

        if (hiddenInstruction) {
          sendResponse({
            status: "uncertain",
            reason:
              "Gizli bir sayfa talimatı tespit edildi. Sayfa içeriği güvenlik için Gemini'ye gönderilmedi.",
          });
          return true;
        }

        const clone = document.body.cloneNode(true) as HTMLElement;
        const clonedElements = Array.from(clone.querySelectorAll("*"));
        pageElements.forEach((element, index) => {
          if (hiddenElementSet.has(element)) clonedElements[index]?.remove();
        });

        const elementsToRemove = clone.querySelectorAll(
          "script, style, noscript, iframe, svg, nav, footer, header, button",
        );
        elementsToRemove.forEach((element) => element.remove());

        let cleanText = clone.innerText || clone.textContent || "";
        cleanText = cleanText.replace(/\s+/g, " ").trim();

        console.log("Page Agent DOM Dehydration Başarılı.");
        sendResponse({
          status: "success",
          rawText: cleanText.substring(0, 30000),
        });
      } catch (err: any) {
        console.error("Agent Okuma Hatası:", err);
        sendResponse({ error: err.message });
      }
    }

    return true;
  },
);
