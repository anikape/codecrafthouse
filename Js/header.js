const form = document.querySelector('form');
  const searchInput = document.querySelector('input[type="search"]');

  form.addEventListener('submit', performSearch);
  searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      performSearch(event);
    }
  });

  function performSearch(event) {
    event.preventDefault();

    const searchTerm = searchInput.value.toLowerCase();
    const textNodes = getTextNodes(document.body);

    textNodes.forEach(node => {
      const text = node.textContent.toLowerCase();
      const replacedText = text.replace(new RegExp(searchTerm, 'gi'), match => `<span class="highlight">${match}</span>`);
      node.parentNode.replaceChild(createFragment(replacedText), node);
    });

    document.addEventListener('click', function() {
      removeHighlights();
      document.removeEventListener('click', arguments.callee);
    });
  }

  function getTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);

    let node;
    while (node = walker.nextNode()) {
      textNodes.push(node);
    }

    return textNodes;
  }

  function createFragment(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
  }

  function removeHighlights() {
    const highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(element => {
      element.outerHTML = element.innerHTML;
    });
  }


