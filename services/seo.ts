export const updateMeta = (title: string, description: string) => {
  document.title = title;
  
  // Update Meta Description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', description);

  // Update OG:Title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute('content', title);

  // Update OG:Description
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.setAttribute('content', description);
};

export const generateJsonLd = (data: object) => {
  let script = document.getElementById('json-ld');
  if (!script) {
    script = document.createElement('script');
    script.id = 'json-ld';
    script.setAttribute('type', 'application/ld+json');
    document.head.appendChild(script);
  }
  script.innerHTML = JSON.stringify(data);
};