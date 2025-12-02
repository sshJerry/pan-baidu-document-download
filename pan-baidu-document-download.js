const items = document.querySelectorAll('li.gr-body__content--item[data-index]');

async function downloadImage(src, filename) {
  try {
    const response = await fetch(src);
    if (!response.ok) throw new Error('Fetch failed');
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(`Download failed for ${filename}:`, error);
  }
}

items.forEach((item, i) => {
  setTimeout(async () => {
    const index = item.getAttribute('data-index');
    const img = item.querySelector('img.gr-body__item--img');
    if (img && img.src) {
      await downloadImage(img.src, `page-${index}.png`);
    }
  }, i * 2000);
});
