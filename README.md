# pan-baidu-document-download


Document was uploaded on https://pan.baidu.com/. Pan Baidu is a cloud storage service provider. People can upload documents and share links with others to access the information
The file I was interested in was locked behind a password which I had. Site uses an embedded document viewer. User friendly download required a Baidu account, 
the viewer itself was loading the document page-by-page as individual images from a Baidu CDN. Because the viewer was already displaying all 59 pages to me, 
I could see the network requests and even inspect each <img> element directly in DevTools.

Basically, the website wasn't giving me the PDF, but it was giving me each page as an image file. So in the HTML (<li\> elements with data-index), each page had an <img> tag with a src pointing to the CDN.

My initial script was able to download the images one at a time, but I quickly noticed how the document viewer actually works. 
The viewer only loads each page’s CDN URL when you scroll to that page, so if I hadn’t scrolled through the entire document, some of the <img> elements didn’t have a valid src yet. 
After scrolling through all the pages and ensuring every image was in the DOM, the script could correctly pick them up.

Once that part was sorted out, I ran into a different issue. 
When the first download fired using the link.click() method, 
the browser treated it like a navigation event and redirected to the download, 
which stopped the rest of the downloads from running. Needed to prevent the browser from interrupting the process as soon as the first <a download> executed.

Below is the structure of the DOM:

\<li data-index="1" class="gr-body__content--item" style="min-height: auto; padding-top: 0px; box-sizing: border-box;">\<div class="gr-body__packet">\<div class="gr-body__packet--img" data-width="1582" data-height="2048" style="display: inline-block; width: 793px; height: 1026.59px;">\<img crossorigin="Anonymous" src="SOME BAIDU CDN" class="gr-body__item--img"></div></div></li>

\<li data-index="2" class="gr-body__content--item" style="min-height: auto; padding-top: 0px; box-sizing: border-box;">\<div class="gr-body__packet">\<div class="gr-body__packet--img" data-width="1582" data-height="2048" style="display: inline-block; width: 793px; height: 1026.59px;">\<img crossorigin="Anonymous" src="SOME BAIDU CDN" class="gr-body__item--img"></div></div></li>

Noticed as well that organically, if you navigate the page, alongside every "page" load in the embedded viewer, 3 other telemetry urls were being triggered. In the concern of being rate limited, due to my request to the CDN not being paired with telemetry, I set the download to 2000ms.
