---
title: WeST Homepage
year: Today
tech: ['Jekyll', 'JavaScript', 'Docker', 'Python']
github:
web: https://west.uni-koblenz.de
video:
slides: /assets/slides/west.pdf
award:
images: ['west_desktop.jpg', 'west_mobile.jpg']
people: Philipp Töws, Adrian Skubella, Danienne Wete, and Daniel Janke
---
Homepage of the Institute for Web Science and Technologies at the University of Koblenz. The entire content is organized in a Git repository as markdown and HTML code. A push to the master branch triggers a continuous integration pipeline, which executes the Jekyll Page Generator within a Docker container and deploys the generated HTML pages to the Web server.